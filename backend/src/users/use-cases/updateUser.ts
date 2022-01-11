import { baseError, K, mergeObj, UpdateUserInput, User } from '@shared';
import { userAccess } from '../access';
import { userEntity } from '../entity';

async function updateUser(data: UpdateUserInput, userId: string): Promise<User> {
	const existingUser = await userAccess.findByFilter({ id: userId }).first();

	// validate if user exists
	if (!existingUser) throw baseError(K.ERRORS.USER_NOT_FOUND);

	const updatedUser: User = mergeObj({ id: userId, ...data }, existingUser);

	const factory = await userEntity(updatedUser);
	if (data.password) factory.hashPassword();
	await userAccess.insert(factory.getUser(), true);

	return factory.getUser();
}

export default updateUser;
