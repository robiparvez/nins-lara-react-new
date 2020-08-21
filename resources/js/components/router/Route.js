import React from "react";
import {
    Route as OriginalRoute,
    Redirect,
    useLocation
} from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Custom route component that can check for authentication
 * and allows us to define a layout component (wrapper component).
 *
 * @param {object} props
 * @param {boolean} exact
 * @param {string} path
 * @param {import("react").FunctionComponent} component
 * @param {boolean} guest is the current route only for unauthenticated users?
 * @param {boolean} authenticated is the current router only for authenticated users?
 * @param {import("react").FunctionComponent} layout wrapper component for the current route.
 * @returns {import("react").FunctionComponent}
 */
function Route(props) {
    const { token } = useSelector(state => state.adminAuth);
    const location = useLocation();
    const Layout = props.layout;

    const intendedRoute = (
        <OriginalRoute exact={props.exact ? true : false} path={props.path}>
            <Layout component={props.component} />
        </OriginalRoute>
    );

    const redirectRoute = (
        <Redirect
            to={{
                pathname: props.redirectTo,
                state: location
            }}
        />
    );

    if (props.authenticated && !token) {
        return redirectRoute;
    }

    if (props.guest && token) {
        return redirectRoute;
    }

    return intendedRoute;
}

export default Route;
