import React from "react";
import AppRouter from "./AppRouter";
import AdminRouter from "./AdminRouter";
import { Switch, Route } from "react-router-dom";

function Router() {
    return (
        <Switch>
            <Route path="/admin" component={AdminRouter} />
            <Route path="/" component={AppRouter} />
        </Switch>
    );
}

export default Router;
