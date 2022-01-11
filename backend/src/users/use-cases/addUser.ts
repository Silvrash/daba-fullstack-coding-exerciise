import { AddNewUserInput, AuthUser, baseError, K } from '@shared';
import { userAccess } from '../access';
import { userEntity } from '../entity';

async function addUser(data: AddNewUserInput): Promise<AuthUser> {
	const { email, password } = data;
	let existingUser = await userAccess.findByFilter({ email }).first();

	if (existingUser) throw baseError(K.ERRORS.USER_ALREADY_EXISTS);

	const factory = await userEntity({ email, password });
	factory.hashPassword();
	factory.updateLastSignedIn();

	await userAccess.insert(factory.getUser(), false);

	return {
		authToken: factory.getToken(),
		user: factory.getUser(),
	};
}

export default addUser;
