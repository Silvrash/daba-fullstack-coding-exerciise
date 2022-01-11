import R from 'ramda';
import { getMockDb } from 'src/__mocks__/testUtilities';
import { findByFilter, getCountQuery } from '../selects';

describe('User select queries', () => {
	describe('findByFilter', () => {
		const queryFunc = R.partialRight(findByFilter, [getMockDb()]);

		it('should get all users', () => {
			const query = queryFunc({}).toQuery();
			expect(query).toMatchSnapshot();
			expect(query).toContain('select * from `users`');
		});

		it('should get users with ids', () => {
			const ids = ['userId1', 'userId2'];
			const query = queryFunc({ ids }).toQuery();

			expect(query).toMatchSnapshot();
			expect(query).toContain("('userId1', 'userId2')");
		});

		it('should get by email', () => {
			const email = 'someone@gmail.com';
			const query = queryFunc({ email }).toQuery();

			expect(query).toMatchSnapshot();
			expect(query).toContain("`email` = 'someone@gmail.com'");
		});

		it('should search for user', () => {
			const searchQuery = 'searchQuery';

			const query = queryFunc({ query: searchQuery }).toQuery();

			expect(query).toMatchSnapshot();
			expect(query).toContain("(`users`.`name` like 'searchQuery%'");
			expect(query).toContain("or `users`.`email` like 'searchQuery%'");
			expect(query).toContain("or `users`.`phone` like 'searchQuery%'");
		});

		it('should limit page data', () => {
			const query = queryFunc({ page: 2, pageSize: 300 }).toQuery();

			expect(query).toMatchSnapshot();
			expect(query).toContain('limit 300 offset 300');
		});
	});

	it('should get count query', () => {
		const query = getCountQuery({}, getMockDb()).toQuery();
		expect(query).toMatchSnapshot();
		expect(query).toContain('count(distinct users.id) as count');
		expect(query).not.toContain('group by `users`.`id`');
		expect(query).not.toContain('`users`.*');
	});
});
