import { AddNewUserInput, GraphqlContext, UpdateUserInput, VerifyEmailInput } from '@shared';
import { userResolvers } from '../resolvers';
import { userCases } from '../use-cases';

describe('user resolvers', () => {
	beforeEach(() => {});

	it('should verify email', async () => {
		jest.spyOn(userCases, 'verifyEmail').mockImplementation();
		const handler = userResolvers.Mutation?.verifyEmail!;
		const data: VerifyEmailInput = { email: 'someEmail@gmail.com', password: 'passkey' };
		await handler({}, { data }, {}, <any>null);
		expect(userCases.verifyEmail).toBeCalledTimes(1);
	});

	it('should add new user', async () => {
		jest.spyOn(userCases, 'addUser').mockImplementation();;
		const handler = userResolvers.Mutation?.addNewUser!;
		const data: AddNewUserInput = { email: 'someEmail@gmail.com', password: 'passkey' };
		await handler({}, { data }, {}, <any>null);
		expect(userCases.addUser).toBeCalledTimes(1);
	});

	it('should update user', async () => {
		const appContext: GraphqlContext = {
			currentUser: { id: 'currentUserId', email: 'someEmail@gmail.com', password: 'passkey' },
		};
		jest.spyOn(userCases, 'updateUser').mockImplementation();;
		const handler = userResolvers.Mutation?.updateUserInfo!;
		const data: UpdateUserInput = { email: 'someEmail@gmail.com', password: 'passkey' };
		await handler({}, { data }, appContext, <any>null);
		expect(userCases.updateUser).toBeCalledTimes(1);
	});

	it('should get current user', async () => {
		const appContext: GraphqlContext = {
			currentUser: { id: 'currentUserId', email: 'someEmail@gmail.com', password: 'passkey' },
		};
		const handler = userResolvers.Query?.getCurrentUser!;
		const result = await handler({}, {}, appContext, <any>null);
		expect(result).toBe(appContext.currentUser);
	});
});
