import { AuthUser, baseError, K, VerifyEmailInput } from '@shared';
import { userAccess } from '../access';
import { userEntity } from '../entity';

async function verifyEmail(data: VerifyEmailInput): Promise<AuthUser> {
	const { email, password } = data;

	const existingUser = await userAccess.findByFilter({ email }).first();

	// validate if user exists
	if (!existingUser) throw baseError(K.ERRORS.AUTHENTICATION_FAILED);

	const factory = await userEntity(existingUser);
	factory.updateLastSignedIn();
	factory.verifyPassword(password);

	await userAccess.updateLastSignedIn(factory.getId(), factory.getLastSignedIn());

	return {
		authToken: factory.getToken(),
		user: factory.getUser(),
	};
}

export default verifyEmail;
