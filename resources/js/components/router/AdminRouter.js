import React from "react";
import { Switch } from "react-router-dom";
import AdminLogin from "../admin/auth/Login";
import Dashboard from "../admin/Dashboard";
import Route from "./Route";
import Layout from "../admin/layouts/App";
import AuthLayout from "../admin/layouts/Auth";

/**
 * Router component for defining all the admin routes.
 *
 * @param {string} { match } math url 
 * @returns {import("react").FunctionComponent}
 */
function AdminRouter({ match }) {
    return (
        <Switch>
            <Route
                exact
                guest
                path={`${match.url}/login`}
                redirectTo={`${match.url}/dashboard`}
                component={AdminLogin}
                layout={AuthLayout}
            />
            <Route
                exact
                authenticated
                path={`${match.url}/dashboard`}
                redirectTo={`${match.url}/login`}
                component={Dashboard}
                layout={Layout}
            />
        </Switch>
    );
}

export default AdminRouter;
