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
import { addGroup, clearErrors } from "../../../../actions/admin/groupActions";
import {
    getFirstValidationError,
    hasValidationError
} from "../../../../helpers";

function CreateModal({ errors, open, setOpen }) {
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");

    const dispatch = useDispatch();

    const handleModalCreateButtonClick = async e => {
        e.preventDefault();
        const response = await dispatch(addGroup(groupName, groupDescription));

        if (response) {
            setOpen(false);
            setGroupName("");
            setGroupDescription("");
        }
    };

    const handleModalClose = () => {
        dispatch(clearErrors());
        setOpen(false);
        setGroupName("");
        setGroupDescription("");
    };

    return (
        <div>
            <Dialog aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle
                    id="simple-dialog-title"
                    style={{ textAlign: "center" }}
                >
                    Create a Group
                </DialogTitle>
                <DialogContent style={{ marginBottom: "1rem" }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Group Name"
                        type="text"
                        fullWidth
                        value={groupName}
                        onChange={e => setGroupName(e.target.value)}
                        error={hasValidationError(errors, "name")}
                        helperText={getFirstValidationError(errors, "name")}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Group Description"
                        type="text"
                        fullWidth
                        value={groupDescription}
                        onChange={e => setGroupDescription(e.target.value)}
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
