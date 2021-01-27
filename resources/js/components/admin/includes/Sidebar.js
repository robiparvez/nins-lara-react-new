import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Toolbar
} from "@material-ui/core";
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Category as CategoryIcon,
    ListAltOutlined as ListAltOutlinedIcon
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles({
    list: {
        width: drawerWidth
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerContainer: {
        overflow: "auto"
    }
});

function Sidebar() {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List className={classes.list}>
                    <ListItem button component={Link} to={"/admin/dashboard"}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Dashboard"} />
                    </ListItem>
                    <ListItem button component={Link} to={"/admin/groups"}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Manage Groups"} />
                    </ListItem>
                    <ListItem button component={Link} to={"/admin/categories"}>
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Manage Categories"} />
                    </ListItem>
                    <ListItem button component={Link} to={"/admin/posts"}>
                        <ListItemIcon>
                            <ListAltOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Manage Posts"} />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
}

export default Sidebar;
