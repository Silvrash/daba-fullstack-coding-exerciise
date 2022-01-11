import R from 'ramda';
import { userAccess } from './users';
import { ContextFunction, decodeToken, GraphqlContext, logger } from './_shared';

/**
 * configure graphql context
 *
 * @see {@link https://www.apollographql.com/docs/apollo-server/data/resolvers/#the-context-argument}
 * @param param0 express app context
 * @returns {Promise<GraphqlContext>} graphql context
 */
const appContext: ContextFunction = async ({ req, connection }): Promise<GraphqlContext> => {
	/**
	 * get authorization header
	 * @see connection?.context?.Authorization is used to get authorization header in websocket connection
	 * @see req?.headers?.authorization is used to get authorization header in http(s) requests
	 */
	const authorization = connection?.context?.Authorization || req?.headers?.authorization;

	const currentUser = await getAuthenticatedUser(authorization);

	logger.debug(`authorized as ${currentUser?.name}`);

	const graphqlContext = Object.freeze<GraphqlContext>({
		authorization,
		currentUser,
	});

	return graphqlContext;
};

/**
 * get user in bearer token
 * @param authorizationHeader Bearer token in request header
 * @returns {User} user in bearer token
 */
async function getAuthenticatedUser(authorizationHeader: string | undefined) {
	if (!authorizationHeader) return;

	/**
	 * get authToken embedded in Bearer token
	 * @see {@link https://oauth.net/2/bearer-tokens/}
	 */
	const token = R.last(R.split(' ', authorizationHeader));

	const { id: userId } = decodeToken(token!);

	return userAccess.findByFilter({ id: userId }).first();
}

export default appContext;
