import { DefaultFilters, User } from '@shared';
import { Knex } from 'knex';
import R from 'ramda';
import { getCountQuery } from './selects';

export const count = async (filters: DefaultFilters<User>, knex: Knex) => {
	const counts: any = R.head(await getCountQuery(filters, knex));
	return parseInt(counts?.count || '0');
};
