import { mutate } from "../../_shared/apolloConfig";
import { LoginFormInput } from "../types";
import { gql } from "@apollo/client";
import { AuthUser } from "../../_shared/schema";

const VALIDATE_USER_MUTATION = gql`
    mutation verifyEmail($data: VerifyEmailInput!) {
        data: verifyEmail(data: $data) {
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
export function validateUser(data: LoginFormInput) {
    return mutate<AuthUser>(VALIDATE_USER_MUTATION, { data });
}
