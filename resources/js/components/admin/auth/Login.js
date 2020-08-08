import React, { useState } from "react";
import {
    Container,
    Grid,
    Button,
    TextField,
    Typography,
    makeStyles,
    FormControl,
    Card,
    CardContent
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../actions/admin/authActions";

const useStyles = makeStyles({
    heading: {
        textAlign: "center",
        marginBottom: "1rem"
    },
    loginCard: {
        marginTop: "5rem",
        paddingTop: "1rem",
        paddingBottom: "1rem"
    }
});

function Login() {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { errors } = useSelector(state => state.adminAuth);

    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();

        await dispatch(login(email, password));
    };

    return (
        <Container>
            <Grid container justify="center" alignItems="center">
                <Grid item xs={12} sm={12} md={7} lg={4}>
                    <Card className={classes.loginCard}>
                        <CardContent>
                            <Typography
                                variant="h4"
                                component="h4"
                                className={classes.heading}
                            >
                                Login to Continue
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Grid
                                    container
                                    justify="center"
                                    alignItems="center"
                                    spacing={3}
                                >
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                type="email"
                                                label="Email"
                                                id="email"
                                                name="email"
                                                value={email}
                                                onChange={e =>
                                                    setEmail(e.target.value)
                                                }
                                                error={
                                                    errors.email.length
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    errors.email.length
                                                        ? errors.email[0]
                                                        : false
                                                }
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                type="password"
                                                label="Password"
                                                id="password"
                                                name="password"
                                                value={password}
                                                onChange={e =>
                                                    setPassword(e.target.value)
                                                }
                                                error={
                                                    errors.password.length
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    errors.password.length
                                                        ? errors.password[0]
                                                        : null
                                                }
                                            />
                                        </FormControl>
                                    </Grid>
                                    {/* <Grid item xs={12}></Grid> */}
                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormControl fullWidth>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                            >
                                                Login
                                            </Button>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Login;
