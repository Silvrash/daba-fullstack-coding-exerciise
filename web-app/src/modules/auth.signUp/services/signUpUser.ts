import { mutate } from "../../_shared/apolloConfig";
import { SignUpFormInput } from "../types";
import { gql } from "@apollo/client";
import { AuthUser } from "../../_shared/schema";

const SIGN_UP_USER_MUTATION = gql`
    mutation addNewUser($data: AddNewUserInput!) {
        data: addNewUser(data: $data) {
            authToken
            user {
                id
                name
                email
                phone
                photo
                bio
                lastSignInDate
            }
        }
    }
`;
export function signUpUser(data: SignUpFormInput) {
    return mutate<AuthUser>(SIGN_UP_USER_MUTATION, { data });
}
