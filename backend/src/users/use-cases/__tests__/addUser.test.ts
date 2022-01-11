import { AddNewUserInput, baseError, K } from '@shared';
import { userAccess, userEntity } from 'src/users';
import addUser from '../addUser';

jest.mock('../../entity', () => ({
	userEntity: jest.fn(),
}));

describe('addUser', () => {
	let findUserByFilterSpy: jest.SpyInstance;
	let insertSpy: jest.SpyInstance;
	const factoryUpdateLastSignedIn = jest.fn();
	const hashPassword = jest.fn();
	const getToken = jest.fn().mockReturnValue('token');
	const getId = jest.fn().mockReturnValue('someId');
	const input: AddNewUserInput = { email: 'someEmail@gmaiil.com', password: 'somePassword' };

	beforeEach(() => {
		findUserByFilterSpy = jest.spyOn(userAccess, 'findByFilter');
		insertSpy = jest.spyOn(userAccess, 'insert').mockImplementation();
		(userEntity as jest.Mock).mockResolvedValue({
			updateLastSignedIn: factoryUpdateLastSignedIn,
			hashPassword,
			getId,
			getToken,
			getUser: jest.fn().mockReturnValue({ id: 'someId', email: input.email }),
		});
	});

	it('should add user', async () => {
		findUserByFilterSpy.mockReturnValue({ first: () => undefined });
		const result = await addUser(input);

		expect(hashPassword).toBeCalledTimes(1);
		expect(factoryUpdateLastSignedIn).toBeCalledTimes(1);
		expect(findUserByFilterSpy).toBeCalledWith({ email: input.email });
		expect(insertSpy).toBeCalledWith({ id: 'someId', email: input.email }, false);
		expect(getToken).toBeCalledTimes(1);
		expect(result.authToken).toBe('token');
		expect(result.user).toBeTruthy();
		expect(result.user?.email).toBe(input.email);
	});

	it('should throw error if user exists', async () => {
		findUserByFilterSpy.mockReturnValue({ first: () => ({ id: 'existingUser' }) });
		const input: AddNewUserInput = { email: 'someEmail@gmaiil.com', password: 'somePassword' };
		expect(addUser(input)).rejects.toThrow(baseError(K.ERRORS.USER_ALREADY_EXISTS));
	});
});
