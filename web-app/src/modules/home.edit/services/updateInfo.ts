import { gql } from "@apollo/client";
import { mutate } from "../../_shared/apolloConfig";
import { UpdateUserInput, User } from "../../_shared/schema";

const UPDATE_USER_MUTATION = gql`
    mutation updateUserInfo($data: UpdateUserInput!) {
        data: updateUserInfo(data: $data) {
            id
            name
            email
            phone
            photo
            bio
            lastSignInDate
        }
    }
`;
export function updateInfo(data: UpdateUserInput) {
    return mutate<User>(UPDATE_USER_MUTATION, { data });
}
