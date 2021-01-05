import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    addCategory,
    clearErrors
} from "../../../../actions/admin/categoryActions";
import {
    getFirstValidationError,
    hasValidationError
} from "../../../../helpers";

function CreateModal({ errors, open, setOpen }) {
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");

    const dispatch = useDispatch();

    const handleModalCreateButtonClick = async e => {
        e.preventDefault();
        const response = await dispatch(
            addCategory(categoryName, categoryDescription)
        );

        if (response) {
            setOpen(false);
            setCategoryName("");
            setCategoryDescription("");
        }
    };

    const handleModalClose = () => {
        dispatch(clearErrors());
        setOpen(false);
        setCategoryName("");
        setCategoryDescription("");
    };

    return (
        <div>
            <Dialog
                onClose={handleModalClose}
                aria-labelledby="simple-dialog-title"
                open={open}
            >
                <DialogTitle
                    id="simple-dialog-title"
                    style={{ textAlign: "center" }}
                >
                    Create a Category
                </DialogTitle>
                <DialogContent style={{ marginBottom: "1rem" }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Category Name"
                        type="text"
                        fullWidth
                        value={categoryName}
                        onChange={e => setCategoryName(e.target.value)}
                        error={hasValidationError(errors, "name")}
                        helperText={getFirstValidationError(errors, "name")}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Category Description"
                        type="text"
                        fullWidth
                        value={categoryDescription}
                        onChange={e => setCategoryDescription(e.target.value)}
                        error={hasValidationError(errors, "description")}
                        helperText={getFirstValidationError(
                            errors,
                            "description"
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} color="primary">
                        Close
                    </Button>
                    <Button
                        onClick={e => handleModalCreateButtonClick(e)}
                        color="primary"
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateModal;
