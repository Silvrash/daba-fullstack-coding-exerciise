import { UserEntity } from 'knex/types/tables';
import { getMockDb } from 'src/__mocks__/testUtilities';
import { insert, updateLastSignedIn } from '../inserts';

describe('User insert queries', () => {
	const db = getMockDb();

	const userEntity: UserEntity = {
		id: 'id',
		email: 'email',
		password: 'password',
		name: 'name',
		photo: 'photo',
		bio: 'bio',
		phone: 'phone',
		lastSignInDate: 'lastSignInDate',
	};

	it('should insert user', () => {
		const query = insert(userEntity, false, db).toQuery();
		expect(query).toMatchSnapshot();
		expect(query).toContain('id');
		expect(query).toContain('email');
		expect(query).toContain('password');
		expect(query).toContain('name');
		expect(query).toContain('photo');
		expect(query).toContain('bio');
		expect(query).toContain('phone');
		expect(query).toContain('lastSignInDate');
	});

	it('should insert user update password', () => {
		const query = insert(userEntity, true, db).toQuery();
		expect(query).toMatchSnapshot();
		expect(query).toContain('password');
		expect(query).toContain('`password` = values(`password`)');
	});

	it('should update last signed in', () => {
		const query = updateLastSignedIn('userId', 'timestamp', db).toQuery();
		expect(query).toMatchSnapshot();
		expect(query).toContain("`lastSignInDate` = 'timestamp'");
		expect(query).toContain("where `id` = 'userId'");
	});
});
