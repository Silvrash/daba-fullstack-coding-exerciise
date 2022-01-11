import K from './constants';
import { baseError } from './error';
import { GraphqlContext } from './types';

export function isAuthenticated({ currentUser, ..._ }: GraphqlContext) {
	if (!currentUser) throw baseError(K.ERRORS.AUTHENTICATION_ERROR);

	return { currentUser, ..._ };
}
