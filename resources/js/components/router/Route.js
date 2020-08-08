import React from "react";
import {
    Route as OriginalRoute,
    Redirect,
    useLocation
} from "react-router-dom";
import { useSelector } from "react-redux";

function Route(props) {
    const { token } = useSelector(state => state.adminAuth);
    const location = useLocation();

    const intendedRoute = (
        <OriginalRoute
            exact={props.exact}
            path={props.path}
            component={props.component}
        />
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
