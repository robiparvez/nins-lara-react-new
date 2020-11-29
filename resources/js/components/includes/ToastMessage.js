import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Close as CloseIcon } from "@material-ui/icons";
import { hideToastMessage } from "../../actions/toastMessageActions";

function ToastMessage() {
    const dispatch = useDispatch();

    const {
        message,
        type,
        visible,
        vertical,
        horizontal,
        autoHide
    } = useSelector(state => state.toastMessage);

    const handleClose = () => dispatch(hideToastMessage());

    const toastAction = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const toastAlert = (
        <Snackbar
            open={visible}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: vertical,
                horizontal: horizontal
            }}
        >
            <Alert
                open={visible}
                severity={type}
                variant="filled"
                action={toastAction}
            >
                {message}
            </Alert>
        </Snackbar>
    );

    const toastSnackbar = (
        <Snackbar
            open={visible}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: vertical,
                horizontal: horizontal
            }}
            message={message}
            action={toastAction}
        ></Snackbar>
    );

    if (visible) {
        return type == "default" ? toastSnackbar : toastAlert;
    } else {
        return null;
    }
}

export default ToastMessage;
