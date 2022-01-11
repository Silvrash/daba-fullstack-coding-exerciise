import { DefaultFilters, notIn, User } from '@shared';
import { Knex } from 'knex';
import { UserEntity } from 'knex/types/tables';
import R from 'ramda';
import { DB } from 'src/_shared/constants';

export const findByFilter = (filters: DefaultFilters<User & { orId?: string }>, knex: Knex) => {
	const { ids, query, page, pageSize, ...params } = filters;

	let builder = knex<UserEntity>(DB.users).where(params);

	if (ids)
		builder.andWhere(function () {
			this.whereIn('users.id', ids);
		});

	if (query)
		builder.andWhere(function () {
			this.where('users.name', 'like', `${query}%`)
				.orWhere('users.email', 'like', `${query}%`)
				.orWhere('users.phone', 'like', `${query}%`);
		});

	if (page && pageSize) builder.limit(pageSize).offset((page - 1) * pageSize);

	return builder;
};

export const getCountQuery = (filters: DefaultFilters<User>, knex: Knex) => {
	const builder = findByFilter(R.pickBy(notIn(['page']), filters), knex)
		.clearSelect()
		.clearGroup()
		.clearOrder()
		.select(knex.raw('count(distinct users.id) as count'));

	return builder;
};
