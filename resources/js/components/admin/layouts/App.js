import React from "react";
import Navbar from "../includes/Navbar";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../includes/Sidebar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "../../../actions/admin/profileActions";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: "64px"
    }
}));

/**
 * Layout component for admin routes.
 *
 * @param {import("react").FunctionComponent} { component } current route component
 * @returns {import("react").FunctionComponent}
 */
function App({ component: Component }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(getProfile());
        })();
    }, []);

    return (
        <div className={classes.root}>
            <Navbar />
            <Sidebar />
            <main className={classes.content}>
                <Component />
            </main>
        </div>
    );
}

export default App;
