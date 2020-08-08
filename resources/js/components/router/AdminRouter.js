import React from "react";
import { Switch } from "react-router-dom";
import AdminLogin from "../admin/auth/Login";
import Dashboard from "../admin/Dashboard";
import Route from "./Route";

function AdminRouter({ match }) {
    return (
        <Switch>
            <Route
                exact
                guest
                path={`${match.url}/login`}
                redirectTo={`${match.url}/dashboard`}
                component={AdminLogin}
            />

            <Route
                exact
                authenticated
                path={`${match.url}/dashboard`}
                redirectTo={`${match.url}/login`}
                component={Dashboard}
            />
        </Switch>
    );
}

export default AdminRouter;
