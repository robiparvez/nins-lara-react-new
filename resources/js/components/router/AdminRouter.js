import React from "react";
import { Switch } from "react-router-dom";
import AdminLogin from "../admin/auth/Login";
import Dashboard from "../admin/Dashboard";
import Route from "./Route";
import Layout from "../admin/layouts/App";
import AuthLayout from "../admin/layouts/Auth";
import GroupIndex from "../admin/groups/Index";
import PermissionIndex from "../admin/permissions/Index";
import CategoryIndex from "../admin/categories/Index";
import PostIndex from "../admin/posts/Index";
import PostCreate from "../admin/posts/Create";
import PostEdit from "../admin/posts/Edit";
import ProfileEdit from "../admin/profile/Edit";

/**
 * Router component for defining all the admin routes.
 *
 * @param {string} { match } match url
 * @returns {import("react").FunctionComponent}
 */
function AdminRouter({ match }) {
    return (
        <Switch>
            <Route
                exact={true}
                guest={true}
                path={`${match.url}/login`}
                redirectTo={`${match.url}/dashboard`}
                component={AdminLogin}
                layout={AuthLayout}
            />
            <Route
                exact={true}
                authenticated={true}
                path={`${match.url}/dashboard`}
                redirectTo={`${match.url}/login`}
                component={Dashboard}
                layout={Layout}
            />
            <Route
                exact={true}
                authenticated={true}
                path={`${match.url}/groups`}
                redirectTo={`${match.url}/login`}
                component={GroupIndex}
                layout={Layout}
            />
            <Route
                exact={true}
                authenticated={true}
                path={`${match.url}/groups/:id/permissions`}
                redirectTo={`${match.url}/login`}
                component={PermissionIndex}
                layout={Layout}
            />
            <Route
                exact={true}
                authenticated={true}
                path={`${match.url}/categories`}
                redirectTo={`${match.url}/login`}
                component={CategoryIndex}
                layout={Layout}
            />
            <Route
                exact={true}
                authenticated={true}
                path={`${match.url}/posts`}
                redirectTo={`${match.url}/login`}
                component={PostIndex}
                layout={Layout}
            />
            <Route
                exact={true}
                authenticated={true}
                path={`${match.url}/posts/create`}
                redirectTo={`${match.url}/login`}
                component={PostCreate}
                layout={Layout}
            />
            <Route
                exact={true}
                authenticated={true}
                path={`${match.url}/posts/:id/edit`}
                redirectTo={`${match.url}/login`}
                component={PostEdit}
                layout={Layout}
            />
            <Route
                exact={true}
                authenticated={true}
                path={`${match.url}/profile/edit`}
                redirectTo={`${match.url}/login`}
                component={ProfileEdit}
                layout={Layout}
            />
        </Switch>
    );
}

export default AdminRouter;
