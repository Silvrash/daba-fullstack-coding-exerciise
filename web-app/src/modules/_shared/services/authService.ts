import K from "../constants";

export async function isAuthenticated() {
    const jwt = localStorage.getItem(K.STORAGE_KEYS.JWT_TOKEN);
    const currentUser = localStorage.getItem(K.STORAGE_KEYS.CURRENT_USER);

    // an authenticated user would have the jwt and current user in local storage
    if (jwt && currentUser) return true;
    return false;
}
