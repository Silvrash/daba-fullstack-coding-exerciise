import { DefaultSerializer, Maybe } from '../_shared';

export interface UserSerializer extends DefaultSerializer {
	makeToken: (userId: string) => string;
	uploadImage: (base64: Maybe<string>, path: string) => Promise<string>;
	hashValue: (value: string) => string;
	verifyHash: (value: string, hashed?: Maybe<string>) => void;
}
