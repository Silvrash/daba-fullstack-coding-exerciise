import { default as Driver, Knex } from 'knex';
import path from 'path';
import K from './constants';

let db: Knex;

export function getDb() {
	if (!db) {
		let connection = {
			host: K.DB_CONNECTION.HOST,
			user: K.DB_CONNECTION.USER,
			password: K.DB_CONNECTION.PASSWORD,
			database: K.DB_CONNECTION.DATABASE,
			ssl: { rejectUnauthorized: false },
			dateStrings: true,
			multipleStatements: true,
			connectionString: process.env.DATABASE_URL,
		};

		if (K.IS_DEV) delete connection.connectionString;

		db = Driver({
			client: K.IS_DEV ? 'mysql2' : 'pg',
			connection,
			migrations: {
				directory: path.join(__dirname, '../_migrations'),
			},
			pool: { min: 2, max: 100 },
			debug: K.DB_CONNECTION.LOGGING,
		});
	}
	return db;
}

export async function releaseConnection() {
	if (!db) return;
	await db.destroy();
}

// db?.on('query', function ({ bindings, sql, __knexQueryUid }) {
// 	logger.debug(`start of ${__knexQueryUid}`);
// 	logger.debug(bindings || 'no bindings');
// 	logger.debug(sql);
// 	logger.debug(`end of ${__knexQueryUid}\n`);
// });
