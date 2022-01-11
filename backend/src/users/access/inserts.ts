import { insertOrUpdate, Maybe } from '@shared';
import { Knex } from 'knex';
import { UserEntity } from 'knex/types/tables';
import { DB } from 'src/_shared/constants';

export const insert = (data: UserEntity, updatePassword: Maybe<boolean>, knex: Knex) => {
	const fieldsToUpdate = ['name', 'photo', 'bio', 'phone', 'email'];
	if (updatePassword) fieldsToUpdate.push('password');

	return insertOrUpdate(knex, DB.users, data, fieldsToUpdate, ['email']);
};

export const updateLastSignedIn = (userId: string, date: string, knex: Knex) => {
	return knex<UserEntity>(DB.users).update({ lastSignInDate: date }).where({ id: userId });
};
