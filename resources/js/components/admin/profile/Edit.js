import {
    Card,
    CardContent,
    Container,
    FormControl,
    Grid,
    makeStyles,
    TextField,
    Typography,
    Button
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoader } from "../../../actions/admin/loaderActions";
import { updateProfile } from "../../../actions/admin/profileActions";
import { getFirstValidationError, hasValidationError } from "../../../helpers";

const useStyles = makeStyles(theme => ({
    heading: {
        textAlign: "center",
        marginTop: "0.5rem",
        marginBottom: "1rem",
        color: "#424242"
    },
    chips: {
        display: "flex",
        flexWrap: "wrap"
    },
    chip: {
        margin: 2
    },
    previewImage: {
        width: "100%"
    }
}));

function Edit() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const { user, errors } = useSelector(state => state.adminProfile);

    useEffect(() => {
        (() => {
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setEmail(user.email);
            setCurrentPassword("");
            setNewPassword("");
        })();
    }, [user]);

    const handleSubmit = async e => {
        e.preventDefault();

        const user = {
            first_name: firstName,
            last_name: lastName,
            current_password: currentPassword,
            new_password: newPassword
        };

        dispatch(async dispatch => {
            dispatch(toggleLoader());
            await dispatch(updateProfile(user));
            dispatch(toggleLoader());
        });
    };

    return (
        <Container>
            <Typography variant="h3" component="h3" className={classes.heading}>
                Profile Details
            </Typography>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item lg={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        error={hasValidationError(
                                            errors,
                                            "first_name"
                                        )}
                                        label="First Name"
                                        id="first_name"
                                        name="first_name"
                                        onChange={e =>
                                            setFirstName(e.target.value)
                                        }
                                        value={firstName}
                                        helperText={getFirstValidationError(
                                            errors,
                                            "first_name"
                                        )}
                                    ></TextField>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        error={hasValidationError(
                                            errors,
                                            "last_name"
                                        )}
                                        label="Last Name"
                                        id="last_name"
                                        name="last_name"
                                        onChange={e =>
                                            setLastName(e.target.value)
                                        }
                                        value={lastName}
                                        helperText={getFirstValidationError(
                                            errors,
                                            "last_name"
                                        )}
                                    ></TextField>
                                </FormControl>
                            </Grid>
                            <Grid item lg={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        type="email"
                                        label="Email"
                                        id="email"
                                        name="email"
                                        disabled
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                        helperText="Email cannot be updated."
                                    ></TextField>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        error={hasValidationError(
                                            errors,
                                            "current_password"
                                        )}
                                        type="password"
                                        label="Current Password"
                                        id="current_password"
                                        name="current_password"
                                        onChange={e =>
                                            setCurrentPassword(e.target.value)
                                        }
                                        value={currentPassword}
                                        helperText={getFirstValidationError(
                                            errors,
                                            "current_password"
                                        )}
                                    ></TextField>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        error={hasValidationError(
                                            errors,
                                            "new_password"
                                        )}
                                        type="password"
                                        label="New Password"
                                        id="new_password"
                                        name="new_password"
                                        onChange={e =>
                                            setNewPassword(e.target.value)
                                        }
                                        value={newPassword}
                                        helperText={getFirstValidationError(
                                            errors,
                                            "new_password"
                                        )}
                                    ></TextField>
                                </FormControl>
                            </Grid>
                            <Grid item lg={3}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}

export default Edit;
