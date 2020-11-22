import {
    Box,
    Button,
    Checkbox,
    Container,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getGroupPermissions,
    updateGroupPermissions
} from "../../../actions/admin/permissionActions";

const useStyles = makeStyles(theme => ({
    heading: {
        textAlign: "center",
        marginTop: "0.5rem",
        marginBottom: "1rem",
        color: "#424242"
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    updateBtn: {
        position: "fixed",
        bottom: "10px",
        zIndex: "99999",
        fontSize: "16px",
        textAlign: "center"
    }
}));

function Index() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { permissions } = useSelector(state => state.adminPermissions);
    const { id: groupId } = useParams();

    const [permissionCheckboxes, setPermissionCheckboxes] = useState({});

    useEffect(() => {
        (async () => {
            await dispatch(getGroupPermissions(groupId));
        })();
    }, []);

    if (permissions.length && !Object.keys(permissionCheckboxes).length) {
        //add default values from permissions array after we get all
        //the permissions.
        setPermissionCheckboxes(
            permissions.reduce((obj, permission) => {
                obj[permission.id] = permission.has_permission;
                return obj;
            }, {})
        );
    }

    const handleCheckboxOnChange = e => {
        setPermissionCheckboxes(prevState => ({
            ...prevState,
            [e.target.getAttribute("data-permission")]: e.target.checked
        }));
    };

    const handleUpdateButtonClick = async e => {
        e.preventDefault();

        await dispatch(
            updateGroupPermissions(
                groupId,
                Object.keys(permissionCheckboxes).filter(
                    permissionId => permissionCheckboxes[permissionId]
                )
            )
        );
    };

    let rows = null;

    if (permissions.length) {
        rows = permissions.map(permission => (
            <TableRow key={permission.id}>
                <TableCell>{permission.id}</TableCell>
                <TableCell>{permission.name}</TableCell>
                <TableCell>
                    <Checkbox
                        name={`permission_${permission.id}`}
                        id={`permission_${permission.id}`}
                        checked={permissionCheckboxes[permission.id] || false}
                        onChange={handleCheckboxOnChange}
                        inputProps={{
                            "aria-label": "primary checkbox",
                            "data-permission": permission.id
                        }}
                    />
                </TableCell>
            </TableRow>
        ));
    } else {
        rows = (
            <TableRow>
                <TableCell colSpan={3} align="center">
                    No Records!
                </TableCell>
            </TableRow>
        );
    }

    return (
        <div>
            <Container>
                <Typography
                    variant="h3"
                    component="h3"
                    className={classes.heading}
                >
                    Manage Group Permissions
                </Typography>
                <Paper className={classes.paper}>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Assign Permission</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{rows}</TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                <Box display="flex" justifyContent="center">
                    <Button
                        color="primary"
                        variant="contained"
                        className={classes.updateBtn}
                        onClick={handleUpdateButtonClick}
                    >
                        Update Permissions
                    </Button>
                </Box>
            </Container>
        </div>
    );
}

export default Index;
