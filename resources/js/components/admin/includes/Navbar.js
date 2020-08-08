import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/admin/authActions";

function Navbar() {
    const dispatch = useDispatch();

    const handleLogoutClick = async e => {
        e.preventDefault();
        await dispatch(logout());
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu />
                </IconButton>
                <Typography variant="h6">Dashboard</Typography>
                <Button color="inherit" onClick={handleLogoutClick}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
