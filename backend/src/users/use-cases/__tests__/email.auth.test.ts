import { baseError, K, VerifyEmailInput } from '@shared';
import { userAccess, userEntity } from 'src/users';
import verifyEmail from '../email.auth';

jest.mock('../../entity', () => ({
	userEntity: jest.fn(),
}));

describe('verifyEmail', () => {
	let findUserByFilterSpy: jest.SpyInstance;
	let updateLastSignedInSpy: jest.SpyInstance;
	const factoryUpdateLastSignedIn = jest.fn();
	const getToken = jest.fn().mockReturnValue('token');
	const getLastSignedIn = jest.fn().mockReturnValue('now');
	const verifyPassword = jest.fn();
	const getId = jest.fn().mockReturnValue('someId');
	const input: VerifyEmailInput = { email: 'someEmail@gmaiil.com', password: 'somePassword' };

	beforeEach(() => {
		findUserByFilterSpy = jest.spyOn(userAccess, 'findByFilter');
		updateLastSignedInSpy = jest.spyOn(userAccess, 'updateLastSignedIn').mockImplementation();
		(userEntity as jest.Mock).mockResolvedValue({
			updateLastSignedIn: factoryUpdateLastSignedIn,
			verifyPassword,
			getId,
			getToken,
			getLastSignedIn,
			getUser: jest.fn().mockReturnValue({ id: 'someId', email: input.email }),
		});
	});

	it('should verify email', async () => {
		findUserByFilterSpy.mockReturnValue({ first: () => ({ id: 'someId', email: input.email }) });
		const result = await verifyEmail(input);

		expect(factoryUpdateLastSignedIn).toBeCalledTimes(1);
		expect(verifyPassword).toBeCalledWith(input.password);
		expect(findUserByFilterSpy).toBeCalledWith({ email: input.email });
		expect(updateLastSignedInSpy).toBeCalledWith('someId', 'now');
		expect(getId).toBeCalledTimes(1);
		expect(getToken).toBeCalledTimes(1);
		expect(result.authToken).toBe('token');
		expect(result.user).toBeTruthy();
		expect(result.user?.email).toBe(input.email);
	});

	it('should throw error if user exists', async () => {
		const input: VerifyEmailInput = { email: 'someEmail@gmaiil.com', password: 'somePassword' };
		findUserByFilterSpy.mockReturnValue({ first: () => undefined });
		expect(verifyEmail(input)).rejects.toThrow(baseError(K.ERRORS.AUTHENTICATION_FAILED));
	});
});
