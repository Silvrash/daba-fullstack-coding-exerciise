import { RouteProps } from "react-router";
import AuthWrapper from "../AuthWrapper";
import { LogIn } from "./auth.logIn";
import { SignUp } from "./auth.signUp";
import { Home } from "./home";
import { Edit } from "./home.edit";
import { ProtectedRouteProps } from "./_shared/components";
import Constants from "./_shared/constants";

const routePaths = Constants.ROUTES;

export const protectedRoutes: ProtectedRouteProps[] = [
    {
        path: routePaths.home,
        component: Home,
    },
    {
        path: routePaths.edit,
        component: Edit,
    },
];

export const defaultRoutes: RouteProps[] = [
    { path: "/", component: AuthWrapper, exact: true },
    { path: routePaths.login, component: LogIn, exact: true },
    { path: routePaths.signUp, component: SignUp },
];
