import { getDb, Mutation, MutationAddNewUserArgs } from '@shared';
import { gql } from 'apollo-server-express';
import { UserFragment } from 'e2e/__mocks__/fragments';
import { getAddUserInput } from 'e2e/__mocks__/inputs';
import { testAppServer } from 'e2e/__mocks__/__testUtils___';
import { userAccess } from 'src/users';
import K, { DB } from 'src/_shared/constants';

describe('AddUser', () => {
	const server = testAppServer();
	const addUserInput = getAddUserInput();

	afterEach(async () => {
		const conn = getDb();
		await conn(DB.users).delete();
	});

	it('should add new user', async () => {
		const ADD_USER_MUTATION = gql`
			mutation addNewUser($data: AddNewUserInput!) {
				addNewUser(data: $data) {
					authToken
                    user {${UserFragment}}
                }
			}
		`;

		const result = await server.mutate<Pick<Mutation, 'addNewUser'>, MutationAddNewUserArgs>(ADD_USER_MUTATION, {
			variables: { data: addUserInput },
		});
		const newUser = result.data?.addNewUser.user!;

		expect(result.data?.addNewUser.authToken).toBeTruthy();
		expect(result.errors).toBeUndefined();
		expect(newUser.name).toBeNull();
		expect(newUser.email).toBe(addUserInput.email);
		expect(newUser.photo).toBe('');
		expect(newUser.bio).toBeNull();
		expect(newUser.phone).toBeNull();
		expect(newUser.lastSignInDate).toBeTruthy();
		expect(newUser.id).toBeTruthy();

		const insertedUser = await userAccess.findByFilter({ id: newUser.id }).first();

		expect(insertedUser).not.toBeFalsy();

		expect(newUser.name).toBe(insertedUser!.name);
		expect(newUser.email).toBe(insertedUser!.email);
		expect(newUser.photo).toBe(insertedUser!.photo);
		expect(newUser.bio).toBe(insertedUser!.bio);
		expect(newUser.phone).toBe(insertedUser!.phone);
		expect(newUser.lastSignInDate).toBe(insertedUser!.lastSignInDate);
		expect(newUser.id).toBe(insertedUser!.id);
	});

	it('should fail if user already exists', async () => {
		const ADD_USER_MUTATION = gql`
			mutation addNewUser($data: AddNewUserInput!) {
				addNewUser(data: $data) {
					authToken
                    user {${UserFragment}}
                }
			}
		`;

		const result = await server.mutate<Pick<Mutation, 'addNewUser'>, MutationAddNewUserArgs>(ADD_USER_MUTATION, {
			variables: { data: addUserInput },
		});
		expect(result.errors).toBeUndefined();

		// add user again
		const result2 = await server.mutate<Pick<Mutation, 'addNewUser'>, MutationAddNewUserArgs>(ADD_USER_MUTATION, {
			variables: { data: addUserInput },
		});

		expect(result2.errors![0].message).toBe(K.ERRORS.USER_ALREADY_EXISTS);
	});
});
