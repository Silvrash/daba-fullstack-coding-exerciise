import R from 'ramda';
import { getMockDb } from 'src/__mocks__/testUtilities';
import K from '../constants';
import { baseError } from '../error';
import {
	decodeToken,
	hashValue,
	insertOrUpdate,
	makeId,
	makeToken,
	mergeObj,
	notIn,
	parseJson,
	toDateString,
	validateRequired,
	verifyHash,
	withResolvers,
} from '../utilities';

describe('utilities', () => {
	describe('toDateString', () => {
		it('should have default date', () => {
			const date = toDateString();
			expect(date).toBeTruthy();
		});

		it('should replace T with " "', () => {
			const date = new Date('2020-10-11');
			const result = toDateString(date);
			expect(result).toBe('2020-10-11 00:00:00');
		});

		it('should normalize string date', () => {
			const date = '2020-10-11T00:00:00.000Z';
			expect(toDateString(date)).toBe('2020-10-11 00:00:00');
		});
	});

	it('makeId', () => {
		const size = 3;
		const id = makeId(size);
		expect(id.length).toBe(size);
	});

	describe('make/decode token', () => {
		const userId = 'jtwo';
		const SECRET_KEY = 'jwt-secret';

		it('makeToken', () => {
			const token = makeToken(userId, SECRET_KEY);
			expect(token).toBeTruthy();
		});

		it('makeToken with default secret', () => {
			const token = makeToken(userId);
			expect(token).toBeTruthy();
		});

		it('decodeToken', () => {
			const token = makeToken(userId, SECRET_KEY); // {id: userID}

			const decoded = decodeToken(token, SECRET_KEY);
			expect(decoded.id).toBe(userId);
		});

		it('decodeToken with default secret', () => {
			const token = makeToken(userId); // {id: userID}

			const decoded = decodeToken(token);
			expect(decoded.id).toBe(userId);
		});
	});

	describe('validateRequired', () => {
		const key = 'some key';

		it('should throw error', () => {
			expect(() => validateRequired([[key, null]])).toThrowError(baseError(`${key} required`));
		});

		it('should not throw error', () => {
			expect(() => validateRequired([[key, 'some value']])).not.toThrow();
		});
	});

	describe('mergeObject', () => {
		const data = { id: 5, name: 'John' };

		it('should change key value', () => {
			expect(mergeObj<Partial<typeof data>>({ name: 'Jones' }, data)).toStrictEqual({
				id: 5,
				name: 'Jones',
			});
		});

		it('should not change old structure', () => {
			const newKey = 'some value';
			expect(mergeObj<any>({ newKey }, data)).not.toStrictEqual({
				...data,
				newKey,
			});
		});
	});

	describe('hash/verify', () => {
		const password = 'some password';

		it('hashValue', () => {
			const hash = hashValue(password);
			expect(hash).toBeTruthy();
		});

		it('verifyHash', () => {
			const hash = hashValue(password);
			expect(() => verifyHash(password, hash)).not.toThrow();
		});

		it('should throw error if no hash', () => {
			expect(() => verifyHash(password)).toThrowError(baseError(K.ERRORS.AUTHENTICATION_FAILED));
		});

		it('should throw error if wrong hash', () => {
			expect(() => verifyHash(password, 'wrongHash')).toThrowError(baseError(K.ERRORS.AUTHENTICATION_FAILED));
		});
	});

	it('notIn', () => {
		const data = { key1: 1, key2: 4, key3: 2 };
		expect(R.pickBy(notIn(['key2']), data)).toStrictEqual({ key1: 1, key3: 2 });
	});

	describe('parseJson', () => {
		it('should parse json', () => {
			expect(parseJson('{"key":"val"}')).toStrictEqual({ key: 'val' });
		});

		it('should skip pass', () => {
			expect(parseJson({ key: 'val' })).toStrictEqual({ key: 'val' });
			expect(parseJson(null)).toBeFalsy();
		});
	});

	it('should return resolvers', () => {
		const idResolver = jest.fn();
		const resolvers = withResolvers({ User: { id: idResolver } });
		expect(resolvers.User?.id).toBe(idResolver);
	});

	it('should insert or update query', ()=>{
		const query = insertOrUpdate(getMockDb(),'table', {hi: 'hello'}, ['hi']).toQuery()
		expect(query).toContain("insert into `table` (`hi`) values ('hello') on duplicate key update `hi` = values(`hi`)")
	})

	it('should insert or update query with  no merge', ()=>{
		const query = insertOrUpdate(getMockDb(),'table', {hi: 'hello'}).toQuery()
		expect(query).toContain("insert into `table` (`hi`) values ('hello') on duplicate key update ")
	})
});
