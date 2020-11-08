import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateGroup } from "../../../../actions/admin/groupActions";
import { getFirstValidationError, hasValidationError } from "../../../../helpers";

function EditModal({ group, errors, open, setOpen }) {
    const dispatch = useDispatch();

    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");

    useEffect(() => {
        setGroupName(group.name || "");
        setGroupDescription(group.description || "");
    }, [group]);

    const handleModalCreateButtonClick = async e => {
        e.preventDefault();
        const response = await dispatch(updateGroup(
            group.id,
            groupName,
            groupDescription
        ));

        if (response) {
            setOpen(false);
        }
    };

    return (
        <div>
            <Dialog
                onClose={() => setOpen(false)}
                aria-labelledby="simple-dialog-title"
                open={open}
            >
                <DialogTitle
                    id="simple-dialog-title"
                    style={{ textAlign: "center" }}
                >
                    Edit Group
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
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
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
