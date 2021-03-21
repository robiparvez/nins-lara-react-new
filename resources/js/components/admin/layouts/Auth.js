import React from "react";

/**
 * Layout component for admin login/register routes.
 *
 * @param {import("react").FunctionComponent} { component } current route component
 * @returns {import("react").FunctionComponent}
 */
function Auth({ component: Component }) {
    return (
        <div>
            <Component />
        </div>
    );
}

export default Auth;
