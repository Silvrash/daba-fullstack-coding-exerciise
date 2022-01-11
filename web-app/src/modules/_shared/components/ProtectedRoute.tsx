import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import Constants from "../constants";
import { isAuthenticated } from "../services";

export interface ProtectedRouteProps {
    path: string;
    exact?: boolean;
    component?: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component, path, exact }) => {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const auth = async () => {
            const isAuth = await isAuthenticated();
            setAuthenticated(isAuth);
        };
        auth();
    }, []);

    if (authenticated === true || authenticated === false) {
        return authenticated ? (
            <Route exact={exact} path={path} component={component} />
        ) : (
            <Redirect to={{ pathname: Constants.ROUTES.login }} />
        );
    }
    return null;
};

export default ProtectedRoute;
