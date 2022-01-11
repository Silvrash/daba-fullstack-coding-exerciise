import { isAuthenticated, withResolvers } from '@shared';
import { userCases } from './use-cases';

export const userResolvers = withResolvers({
	Query: {
		getCurrentUser: async (_, {}, appContext) => {
			const { currentUser } = isAuthenticated(appContext);
			return currentUser;
		},
	},
	Mutation: {
		verifyEmail: async (_, { data }) => {
			return userCases.verifyEmail(data);
		},
		addNewUser: async (_, { data }) => {
			return userCases.addUser(data);
		},
		updateUserInfo: async (_, { data }, appContext) => {
			const { currentUser } = isAuthenticated(appContext);
			return userCases.updateUser(data, currentUser.id);
		},
	},
});
