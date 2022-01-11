import K from "../constants";
import { AuthUser, User } from "../schema";
import { useHistory } from "react-router-dom";

export function useCurrentUser() {
    const currentUser = localStorage.getItem(K.STORAGE_KEYS.CURRENT_USER);
    const history = useHistory();

    function updateUser(authUser: Partial<AuthUser>) {
        if (authUser.user)
            localStorage.setItem(K.STORAGE_KEYS.CURRENT_USER, JSON.stringify(authUser.user));

        if (authUser.authToken) localStorage.setItem(K.STORAGE_KEYS.JWT_TOKEN, authUser.authToken!);
    }

    function logOut() {
        localStorage.clear();
        history.replace(K.ROUTES.login);
    }

    return {
        currentUser: !!currentUser ? (JSON.parse(currentUser) as User) : null,
        updateUser,
        logOut,
    };
}
