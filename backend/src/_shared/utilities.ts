import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Knex } from 'knex';
import { nanoid } from 'nanoid';
import R from 'ramda';
import K from './constants';
import { baseError } from './error';
import { Maybe, Resolvers } from './schema';
import { GraphqlContext, NullablePartial } from './types';

/**
 * create a jwt token
 * @see {@link https://oauth.net/2/bearer-tokens/}
 * @param userId user's id
 * @param secretKey
 * @returns an encoded token
 */
export function makeToken(userId: string, secretKey = K.SECRET_KEY) {
	return jwt.sign({ id: userId }, secretKey, { algorithm: 'HS256' });
}

/**
 * decodes a jwt token
 * @param token encoded token
 * @param secretKey
 * @returns decoded token
 */
export function decodeToken<T = any>(token: string, secretKey = K.SECRET_KEY) {
	return jwt.verify(token, secretKey) as T;
}

/**
 * returns an immutable resolvers object
 * @param resolvers resolvers object
 * @returns an immutable object
 */
export function withResolvers(resolvers: Resolvers<GraphqlContext>) {
	return Object.freeze(resolvers);
}

export function validateRequired(data: Array<[string, any]>) {
	data.forEach((item) => {
		if (!item[1]) throw baseError(`${item[0]} required`);
	});
}

/**
 * verify if raw value is equal to hashed value
 * @param value raw value
 * @param hashedValue hashed value
 * @returns raw value is equal to hashed value
 */
export function verifyHash(value: string, hashedValue?: Maybe<string>) {
	if (!hashedValue) throw baseError(K.ERRORS.AUTHENTICATION_FAILED);

	const salt = hashedValue.slice(0, 64);
	const hashedString = hashedValue.slice(64);
	const pwdHash = crypto.pbkdf2Sync(value, salt, 100000, 64, 'sha512').toString('hex');

	if (pwdHash === hashedString) return;

	throw baseError(K.ERRORS.AUTHENTICATION_FAILED);
}

export function hashValue(value: string) {
	const salt = crypto.randomBytes(80).toString('hex').slice(0, 64);
	const pwdHash = crypto.pbkdf2Sync(value, salt, 100000, 64, 'sha512').toString('hex');
	return salt + pwdHash;
}

/**
 * generates a unique id
 * @param size
 * @returns
 */
export function makeId(size?: number) {
	return nanoid(size);
}

/**
 * insert or update an entity
 * @param knex knex connection
 * @param table
 * @param data
 * @param merge
 * @returns
 */
export function insertOrUpdate(knex: Knex, table: string, data: any, merge: string[] = []) {
	return knex(table).insert(data).onConflict().merge(merge);
}

/**
 * remove keys from array
 * @param keys
 * @returns
 */
export function notIn(keys: string[]) {
	return R.pipe(R.nthArg(1), R.includes(R.__, keys), R.not);
}

/**
 * merge two objects together
 * @param newObj
 * @param old
 * @returns merged object
 */
export function mergeObj<T>(newObj: T, old?: NullablePartial<T>): T {
	const result = R.mapObjIndexed((val, key) => R.prop(key as any, newObj) || val, R.defaultTo(newObj, old));
	return result as T;
}

export function parseJson(data: any) {
	if (!data) return;
	if (R.is(String, data)) return JSON.parse(data);
	return data;
}

/**
 * normalizes date to a valid mysql date
 * @param date
 * @returns
 */
export function toDateString(date?: Maybe<Date | string>) {
	if (R.is(String, date)) date = new Date(date as string);
	const newDate = (date as Date) || new Date();
	return newDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}
