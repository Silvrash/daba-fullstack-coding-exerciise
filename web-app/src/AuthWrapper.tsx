import { useEffect } from "react";
import { useHistory } from "react-router";
import Constants from "./modules/_shared/constants";
import { isAuthenticated } from "./modules/_shared/services";

interface IProps {}

const AuthWrapper: React.FC<IProps> = () => {
    const history = useHistory();

    useEffect(() => {
        const auth = async () => {
            const isAuth = await isAuthenticated();
            /**
             * authenticated has to be true/false, else its not been set yet
             * since the function to check authentication is asynchronous
             */
            if (isAuth === true || isAuth === false) {
                if (isAuth) {
                    history.replace(Constants.ROUTES.home);
                } else {
                    history.replace(Constants.ROUTES.login);
                }
            }
        };
        auth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return null;
};

export default AuthWrapper;
