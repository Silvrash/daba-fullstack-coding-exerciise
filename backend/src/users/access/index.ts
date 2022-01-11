import { getDb } from '@shared';
import { Knex } from 'knex';
import R from 'ramda';
import { insert, updateLastSignedIn } from './inserts';
import { findByFilter } from './selects';

const buildUserAccess = (knex: Knex) => {
	return {
		insert: R.partialRight(insert, [knex]),
		findByFilter: R.partialRight(findByFilter, [knex]),
		updateLastSignedIn: R.partialRight(updateLastSignedIn, [knex]),
	};
};

export const userAccess = buildUserAccess(getDb());
export type UserAccessMethods = typeof userAccess;
export default buildUserAccess;
