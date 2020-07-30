import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Posts from "../pages/Posts";
import Contact from "../pages/Contact";
import About from "../pages/About";

function AppRouter() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
        </Switch>
    );
}

export default AppRouter;
