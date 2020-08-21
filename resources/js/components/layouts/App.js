import React from "react";

/**
 * Layout component for front routes.
 *
 * @param {import("react").FunctionComponent} { child } current route component
 * @returns {import("react").FunctionComponent}
 */
function App({ child }) {
    const Child = child;

    return (
        <div>
            <Child />
        </div>
    );
}

export default App;
