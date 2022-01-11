import { Mutation, MutationUpdateUserInfoArgs, UpdateUserInput } from '@shared';
import { gql } from 'apollo-server-express';
import { UserFragment } from 'e2e/__mocks__/fragments';
import { setupUser } from 'e2e/__mocks__/helpers';
import faker from 'faker';
import { userAccess } from 'src/users';

describe('UpdateUserInfo', () => {
	const { server, currentUser, ...others } = setupUser();

	beforeEach(others.beforeEach);
	afterEach(others.afterEach);

	it('should update user info', async () => {
		const UPDATE_USER_INFO_MUTATION = gql`
			mutation updateUserInfo($data: UpdateUserInput!) {
				updateUserInfo(data: $data) {
					${UserFragment}
                }
			}
		`;

		const input: UpdateUserInput = {
			bio: faker.lorem.sentences(2),
			name: faker.name.findName(),
			password: faker.internet.password(),
			photo: faker.image.avatar(),
            phone: faker.phone.phoneNumber(),
			email: currentUser.email,
		};
		const result = await server.mutate<Pick<Mutation, 'updateUserInfo'>, MutationUpdateUserInfoArgs>(
			UPDATE_USER_INFO_MUTATION,
			{
				variables: { data: input },
			},
		);
		const user = result.data?.updateUserInfo!;

		expect(result.errors).toBeUndefined();
		expect(user.name).toBe(input.name);
		expect(user.email).toBe(currentUser.email);
		expect(user.photo).toBe(input.photo);
		expect(user.bio).toBe(input.bio);
		expect(user.phone).toBe(input.phone);
		expect(user.lastSignInDate).toBeTruthy();
		expect(user.id).toBeTruthy()

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
});
