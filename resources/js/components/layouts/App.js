import React from "react";

/**
 * Layout component for front routes.
 *
 * @param {import("react").FunctionComponent} { component } current route component
 * @returns {import("react").FunctionComponent}
 */
function App({ component: Component }) {
    return (
        <div>
            <Component />
        </div>
    );
}

export default App;
