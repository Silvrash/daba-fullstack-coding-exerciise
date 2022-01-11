import { K, Mutation, MutationVerifyEmailArgs, VerifyEmailInput } from '@shared';
import { gql } from 'apollo-server-express';
import { UserFragment } from 'e2e/__mocks__/fragments';
import { setupUser } from 'e2e/__mocks__/helpers';
import { userAccess } from 'src/users';

describe('Verify Email', () => {
	const { server, currentUser, ...others } = setupUser();

	beforeEach(others.beforeEach);
	afterEach(others.afterEach);

	it('should verify existing user', async () => {
		const VERIFY_USER_MUTATION = gql`
			mutation verifyEmail($data: VerifyEmailInput!) {
				verifyEmail(data: $data) {
					authToken
                    user {${UserFragment}}
                }
			}
		`;

		const input: VerifyEmailInput = { email: currentUser.email, password: currentUser.password };
		const result = await server.mutate<Pick<Mutation, 'verifyEmail'>, MutationVerifyEmailArgs>(
			VERIFY_USER_MUTATION,
			{
				variables: { data: input },
			},
		);
		const user = result.data?.verifyEmail.user!;

		expect(result.errors).toBeUndefined();
		expect(result.data?.verifyEmail.authToken).toBeTruthy();
		expect(user.name).toBeNull();
		expect(user.email).toBe(currentUser.email);
		expect(user.photo).toBe('');
		expect(user.bio).toBeNull();
		expect(user.phone).toBeNull();
		expect(user.lastSignInDate).toBeTruthy();
		expect(user.id).toBeTruthy();

		const insertedUser = await userAccess.findByFilter({ id: user.id }).first();

		expect(insertedUser).not.toBeFalsy();

		expect(user.name).toBe(insertedUser!.name);
		expect(user.email).toBe(insertedUser!.email);
		expect(user.photo).toBe(insertedUser!.photo);
		expect(user.bio).toBe(insertedUser!.bio);
		expect(user.phone).toBe(insertedUser!.phone);
		expect(user.lastSignInDate).toBe(insertedUser!.lastSignInDate);
		expect(user.id).toBe(insertedUser!.id);
	});

	it('should fail for incorrect email or password', async () => {
		const VERIFY_USER_MUTATION = gql`
			mutation verifyEmail($data: VerifyEmailInput!) {
				verifyEmail(data: $data) {
					authToken
                    user {${UserFragment}}
                }
			}
		`;

		const input: VerifyEmailInput = { email: currentUser.email, password: 'invalid password' };
		const result = await server.mutate<Pick<Mutation, 'verifyEmail'>, MutationVerifyEmailArgs>(
			VERIFY_USER_MUTATION,
			{
				variables: { data: input },
			},
		);
		expect(result.errors![0].message).toBe(K.ERRORS.AUTHENTICATION_FAILED);
	});
});
