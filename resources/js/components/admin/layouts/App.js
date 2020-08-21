import React from "react";
import Navbar from "../includes/Navbar";
import { makeStyles, Toolbar, CssBaseline } from "@material-ui/core";
import Sidebar from "../includes/Sidebar";

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

function App({ component }) {
    const classes = useStyles();
    const Component = component;

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
