import { AddNewUserInput } from '@shared';
import faker from 'faker';

export function getAddUserInput() {
	const addUserInput: AddNewUserInput = {
		email: faker.internet.email(),
		password: faker.internet.password(),
	};
	return addUserInput;
}
