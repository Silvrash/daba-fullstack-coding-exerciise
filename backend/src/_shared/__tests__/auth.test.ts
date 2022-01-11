import { UserEntity } from 'knex/types/tables';
import { isAuthenticated } from '../auth';
import K from '../constants';
import { baseError } from '../error';

describe('auth', () => {
	it('should throw authentication error if no current user', () => {
		expect(() => isAuthenticated({})).toThrowError(baseError(K.ERRORS.AUTHENTICATION_ERROR));
	});

	it('should not throw authentication error if current user exists', () => {
		const currentUser: UserEntity = {
			id: 'id',
			email: 'email',
			password: 'password',
			name: 'name',
			photo: 'photo',
			bio: 'bio',
			phone: 'phone',
			lastSignInDate: 'lastSignInDate',
		};
		expect(() => isAuthenticated({ currentUser })).not.toThrowError(baseError(K.ERRORS.AUTHENTICATION_ERROR));
	});
});
