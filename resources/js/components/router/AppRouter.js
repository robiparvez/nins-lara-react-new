import React from "react";
import { Switch } from "react-router-dom";
import Home from "../pages/Home";
import Posts from "../pages/Posts";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Route from "./Route";
import AppLayout from "../layouts/App";

/**
 * Router component for defining all the front routes.
 *
 * @param {string} { match } math url
 * @returns {import("react").FunctionComponent}
 */
function AppRouter({ match }) {
    return (
        <Switch>
            <Route exact path="/" component={Home} layout={AppLayout} />
            <Route exact path="/posts" component={Posts} layout={AppLayout} />
            <Route exact path="/about" component={About} layout={AppLayout} />
            <Route
                exact
                path="/contact"
                component={Contact}
                layout={AppLayout}
            />
        </Switch>
    );
}

export default AppRouter;
