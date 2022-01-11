import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users', (table) => {
		table.string('id', 36).primary();
		table.string('email').unique().notNullable();
		table.string('password').notNullable();
		table.string('name');
		table.string('photo');
		table.string('bio');
		table.string('phone');
		table.datetime('lastSignInDate');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('users');
}
