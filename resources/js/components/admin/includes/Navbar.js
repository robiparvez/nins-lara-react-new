import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    makeStyles
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/admin/authActions";
import Loader from "./Loader";

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    title: {
        flexGrow: 1,
        textAlign: "center"
    }
}));

function Navbar() {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        return () => handleClose(); //cleanup on unmount
    }, []);

    const handleLogoutClick = async e => {
        e.preventDefault();
        await dispatch(logout());
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" className={classes.title} noWrap>
                    Welcome to Dashboard
                </Typography>
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={"primary-search-account-menu"}
                    aria-haspopup="true"
                    onClick={handleClick}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
            </Toolbar>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id={"primary-search-account-menu"}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
            <Loader />
        </AppBar>
    );
}

export default Navbar;
