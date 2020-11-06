import React, { FunctionComponent } from "react";
import { Route } from "react-router";
import { isAuthenticated } from "../../../services/auth/isAuthenticated";
import AuthenticateBeforeRender from "./AuthenticateBeforeRender";

interface AuthenticatedProps {
    Component: any,
    exact: boolean,
    path: string
}

export const AuthenticatedRoute: FunctionComponent<AuthenticatedProps> = ({
    Component,
    exact,
    path,
}) => (
        <Route
            exact={exact}
            path={path}
            render={props =>
                isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                        <AuthenticateBeforeRender render={() => <Component {...props} />} />
                    )
            }
        />
    )