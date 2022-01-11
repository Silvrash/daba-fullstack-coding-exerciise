import { DB } from "../src/_shared/constants";
import { AuthProvider, Maybe } from "../src/_shared/schema";

declare module "knex/types/tables" {
    export interface UserEntity {
        id: string;
		email: string;
        password: string;
        name?: Maybe<string>;
        photo?: Maybe<string>;
        bio?: Maybe<string>;
        phone?: Maybe<string>;
		lastSignInDate?: Maybe<string>
    }

    export interface Tables {
        [DB.users]: UserEntity;
    }
}
