import React, { Children } from "react";
import { Route, RouteProps, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { GlobalStyle } from "./global";
import { defaultRoutes, protectedRoutes } from "./modules/routing";
import { ProtectedRoute, ProtectedRouteProps } from "./modules/_shared/components";
import Notifications from "./modules/_shared/components/Notifications";
import { useTheme } from "./modules/_shared/hooks";

const App = () => {
    const { theme, isDark } = useTheme();
    console.log(isDark, theme);

    function renderRoute(item: ProtectedRouteProps) {
        return <ProtectedRoute {...item} />;
    }

    function renderDefaultRoute(item: RouteProps) {
        return <Route {...item} />;
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Switch>
                {Children.toArray(defaultRoutes.map(renderDefaultRoute))}
                {Children.toArray(protectedRoutes.map(renderRoute))}

                {/* <Route path="*" component={PageNotFound} /> */}
            </Switch>
            <Notifications />
        </ThemeProvider>
    );
};

export default App;
