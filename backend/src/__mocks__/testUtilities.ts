import knex from 'knex';

export function getMockDb() {
	return knex({ client: 'mysql' });
}
