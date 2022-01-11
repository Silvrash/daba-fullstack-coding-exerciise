import 'apollo-cache-control';
import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import express, { Express } from 'express';
import fs from 'fs';
import path from 'path';
import R from 'ramda';
import appContext from './context';
import { resolvers } from './resolvers';
import { formatError, getDb, initFirebaseClient, logger, releaseConnection } from './_shared';

/**
 * create application server
 *
 * @param app Express app instance
 * @returns Apollo server instance
 */
export function createServer(app: Express): ApolloServer {
	const schema = makeExecutableSchema({
		typeDefs: getSchema(),
		resolvers,
	});

	initFirebaseClient();

	const apolloServer = new ApolloServer({
		schema,
		resolvers,
		introspection: process.env.MODE != 'production',
		playground: process.env.MODE != 'production',

		// application context
		context: appContext,

		// custom error formatter
		formatError,
	});

	// setup cors
	app.use(cors());

	// data compression
	app.use(compression());

	// set response data limit to 15MB
	app.use(express.json({ limit: '15mb' })); // support json encoded bodies

	// set url limit to 15MB
	app.use(express.urlencoded({ limit: '15mb', extended: true })); // support encoded bodies

	// configure static url path
	app.use('/static', express.static(path.join(__dirname, 'static')));

	/**
	 * Clean up function to release database and redis connection
	 */
	async function cleanup() {
		logger.debug('Closed out remaining connections.');
		// Close db connections, other chores, etc.
		await releaseConnection();
		process.exit();
	}

	process.on('SIGINT', cleanup);
	process.on('SIGTERM', cleanup);
	return apolloServer;
}

/**
 * gets graphql schema definition files
 *
 * @returns .graphql sdl files
 */
function getSchema() {
	const schemaPath = path.join(__dirname, 'schemas');
	const files = fs.readdirSync(schemaPath);
	return R.map((file) => gql(fs.readFileSync(path.join(schemaPath, file), 'utf8')), files);
}

export async function createAsyncServer(app: Express, isLatest = true) {
	if (isLatest) await getDb().migrate.latest().catch();
	return createServer(app);
}
