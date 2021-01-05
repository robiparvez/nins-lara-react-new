import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    clearErrors,
    updateCategory
} from "../../../../actions/admin/categoryActions";
import {
    getFirstValidationError,
    hasValidationError
} from "../../../../helpers";

function EditModal({ category, errors, open, setOpen }) {
    const dispatch = useDispatch();

    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");

    useEffect(() => {
        setCategoryName(category.name || "");
        setCategoryDescription(category.description || "");
    }, [category]);

    const handleModalCreateButtonClick = async e => {
        e.preventDefault();
        const response = await dispatch(
            updateCategory(category.id, categoryName, categoryDescription)
        );

        if (response) {
            setOpen(false);
        }
    };

    const handleModalClose = () => {
        dispatch(clearErrors());
        setOpen(false);
    };

    return (
        <div>
            <Dialog aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle
                    id="simple-dialog-title"
                    style={{ textAlign: "center" }}
                >
                    Edit Category
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
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditModal;
