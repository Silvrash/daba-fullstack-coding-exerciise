import { baseError, dbErrors } from '../error';

test('baseError', () => {
	const message = 'some error message';
	const error = baseError(message);
	expect(error.name).toBe('baseError');
	expect(error.message).toBe(message);
	expect(error).toBeInstanceOf(Error);
});

describe('dbErrors', () => {
	it('should throw duplicate error', () => {
		const sqlMessage = "#1062 - Duplicate entry 'someone@gmail.com'";
		const message = dbErrors({ errno: 1062, sqlMessage });
		expect(message).toBe("Duplicate entry 'someone@gmail.com'");
	});

	it('should return default error', () => {
		const sqlMessage = 'Some message';
		const message = dbErrors({ errno: 1064, sqlMessage });
		expect(message).toBe(sqlMessage);
	});
});
