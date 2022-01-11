import {
	Await,
	baseError,
	hashValue,
	makeId,
	makeToken,
	NullablePartial,
	toDateString,
	uploadImage,
	validateRequired,
	verifyHash,
} from '@shared';
import { UserEntity } from 'knex/types/tables';
import { UserSerializer } from './types';

const buildUserEntity = ({ makeId, makeToken, uploadImage, toDateString, hashValue, verifyHash }: UserSerializer) => {
	return async (user?: NullablePartial<UserEntity>) => {
		const id = user?.id ?? makeId();
		const data: UserEntity = {
			id: id,
			name: user?.name,
			photo: await uploadImage(user?.photo, `/users/${id}`),
			bio: user?.bio,
			phone: user?.phone,
			email: user?.email ?? '',
			password: user?.password ?? '',
			lastSignInDate: user?.lastSignInDate,
		};

		return {
			getId: () => id,
			getUser: () => {
				// validate required parameters
				validateRequired([
					['Email', data.email],
					['Password', data.password],
				]);
				return data;
			},
			getName: () => data.name,
			getPhone: () => data.phone,
			getEmail: () => data.email,
			getToken: () => makeToken(data.id),
			hashPassword: () => {
				data.password = hashValue(data.password);
			},
			verifyPassword: (value: string) => verifyHash(value, data.password),
			getPassword: () => data.password,
			updateLastSignedIn: () => {
				data.lastSignInDate = toDateString();
			},
			getLastSignedIn: () => data.lastSignInDate!,
		};
	};
};

export const userEntity = buildUserEntity({
	baseError,
	hashValue,
	makeId,
	makeToken,
	toDateString,
	uploadImage,
	verifyHash,
	validateRequired,
});

export type UserEntityMethods = Await<ReturnType<typeof userEntity>>;
export default buildUserEntity;
