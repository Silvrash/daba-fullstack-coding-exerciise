import { getMockDb } from 'src/__mocks__/testUtilities';
import { getCountQuery } from '../selects';
import { count } from '../utilities';

jest.mock('../selects', () => ({
	getCountQuery: jest.fn(),
}));

describe('utilities', () => {
	const db = getMockDb();

	describe('count', () => {
		afterEach(() => {
			jest.resetAllMocks();
		});

		it('should get db count', async () => {
			(<jest.Mock>getCountQuery).mockResolvedValue([{ count: 45 }]);
			const result = await count({}, db);
			expect(getCountQuery).toBeCalledWith({}, db);
			expect(result).toBe(45);
		});

		it('should provide default if no users are in db', async () => {
			(<jest.Mock>getCountQuery).mockResolvedValue([]);
			const result = await count({}, db);
			expect(getCountQuery).toBeCalledWith({}, db);
			expect(result).toBe(0);
		});
	});
});
