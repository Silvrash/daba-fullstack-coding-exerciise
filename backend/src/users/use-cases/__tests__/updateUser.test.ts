import { baseError, K, UpdateUserInput } from '@shared';
import { userAccess, userEntity } from 'src/users';
import updateUser from '../updateUser';

jest.mock('../../entity', () => ({
	userEntity: jest.fn(),
}));

describe('updateUser', () => {
	let findUserByFilterSpy: jest.SpyInstance;
	let insertSpy: jest.SpyInstance;
	const hashPassword = jest.fn();

	const input: UpdateUserInput = { name: 'UserName', email: 'someEmail@gmaiil.com', password: 'somePassword' };

	beforeEach(() => {
		findUserByFilterSpy = jest.spyOn(userAccess, 'findByFilter');
		insertSpy = jest.spyOn(userAccess, 'insert');
		(userEntity as jest.Mock).mockResolvedValue({
			getUser: jest.fn().mockReturnValue({ ...input, id: 'someId' }),
			hashPassword,
		});
	});

    afterEach(()=>{
        jest.resetAllMocks()
    })

	it('should update user with password', async () => {
		findUserByFilterSpy.mockReturnValue({ first: () => ({ id: 'someId', email: input.email }) });
		const result = await updateUser(input, 'someId');

		expect(findUserByFilterSpy).toBeCalledWith({ id: 'someId' });
		expect(insertSpy).toBeCalledWith({ ...input, id: 'someId' }, true);
		expect(hashPassword).toBeCalledTimes(1);
		expect(result.email).toBe(input.email);
	});

	it('should update user with no password', async () => {
		findUserByFilterSpy.mockReturnValue({ first: () => ({ id: 'someId', email: input.email }) });
		const newInput = { ...input, password: undefined };
		const result = await updateUser(newInput, 'someId');

		expect(findUserByFilterSpy).toBeCalledWith({ id: 'someId' });
		expect(hashPassword).not.toBeCalledTimes(1);
		expect(result.email).toBe(input.email);
	});

	it('should throw error if user exists', async () => {
		const input: UpdateUserInput = { email: 'someEmail@gmaiil.com', password: 'somePassword' };
		findUserByFilterSpy.mockReturnValue({ first: () => undefined });
		expect(updateUser(input, 'someId')).rejects.toThrow(baseError(K.ERRORS.USER_NOT_FOUND));
	});
});
