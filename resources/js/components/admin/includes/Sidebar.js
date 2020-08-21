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
    Category as CategoryIcon,
    ListSharp as ListSharpIcon
} from "@material-ui/icons";

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
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Dashboard"} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Manage Categories"} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ListSharpIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Manage Posts"} />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
}

export default Sidebar;
