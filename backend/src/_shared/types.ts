import { ExpressContext } from 'apollo-server-express';
import { UserEntity } from 'knex/types/tables';
import { Maybe } from './schema';

export interface GraphqlContext {
	authorization?: string;
	currentUser?: UserEntity;
}

export type ContextFunction = (args: ExpressContext) => Promise<GraphqlContext>;

export interface DefaultSerializer {
	makeId: (size?: number) => string;
	validateRequired: (data: Array<[string, any]>) => void;
	toDateString: (date?: Maybe<Date | string>) => string;
	baseError: (message: string) => Error;
}

export type Await<T> = T extends {
	then(onfulfilled?: (value: infer U) => unknown): unknown;
}
	? U
	: T;

export type NullablePartial<T> = { [K in keyof T]?: null | T[K] };

export type DefaultFilters<T = {}> = NullablePartial<T> &
	NullablePartial<{
		ids?: string[];
		query?: string;
		page?: number;
		pageSize?: number;
	}>;
