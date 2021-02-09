import React from "react";
import { LinearProgress, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
    loader: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2)
        }
    }
}));

function Loader() {
    const classes = useStyles();
    const { show } = useSelector(state => state.adminLoader);

    return show === true ? <LinearProgress className={classes.loader} /> : null;
}

export default Loader;
