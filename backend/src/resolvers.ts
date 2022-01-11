import { userResolvers } from "./users";
import { withResolvers } from "./_shared";

/**
 * combined graphql resolvers
 */
export const resolvers = withResolvers({
    ...userResolvers,
    Query: {
        ...userResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
    }
});
