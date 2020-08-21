import React from "react";
import AppRouter from "./AppRouter";
import AdminRouter from "./AdminRouter";
import { Switch, Route } from "react-router-dom";

/**
 * All the registered routes for the application.
 *
 * @returns {import("react").FunctionComponent}
 */
function Router() {
    return (
        <Switch>
            <Route path="/admin" component={AdminRouter} />
            <Route path="/" component={AppRouter} />
        </Switch>
    );
}

export default Router;
