import { getDb } from '@shared';
import { userCases } from 'src/users';
import { getAddUserInput } from './inputs';
import { testAppServer } from './__testUtils___';

export function setupUser() {
	const server = testAppServer();
	const addUserInput = getAddUserInput();
	let headers: any | undefined;

	async function beforeEach() {
		const authUser = await userCases.addUser(addUserInput);

		headers = {
			authorization: `Bearer ${authUser.authToken}`,
		};
		server.setOptions({ request: { headers } });
	}

	async function afterEach() {
		const conn = getDb();
		await conn('users').delete();
		jest.resetAllMocks();
	}

	return {
		server,
		currentUser: addUserInput,
		beforeEach,
		afterEach,
	};
}
