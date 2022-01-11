import { logger } from '@shared';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import R from 'ramda';
import K from './constants';

export function baseError(message: string) {
	const error = new Error(message);
	error.name = 'baseError';
	return error;
}

export function dbErrors(error: { errno: number; sqlMessage: string }) {
	if (error.errno === K.ERRORS.DUPLICATE) {
		const message = error.sqlMessage.match(/Duplicate entry '.*?'/g);
		return message![0];
	}
	return error.sqlMessage;
}

export const formatError = (err: GraphQLError): GraphQLFormattedError => {
	const message = R.cond([
		[R.equals(true), R.partial(dbErrors, [err.extensions?.exception])],
		[R.T, R.always(err.message)],
	])(!!err.extensions?.errno);

	const is500 = err.originalError?.name !== 'baseError';
	const defaultError = R.defaultTo(err, err.originalError);
	const consoleError = R.defaultTo(defaultError, err.originalError?.stack);
	logger.error(consoleError);

	if (K.MODE === 'production') {
		return {
			message: is500 ? K.ERRORS.SOMETHING_WENT_WRONG : message,
		};
	}

	return { message, path: err.path, extensions: err.extensions, locations: err.locations };
};
