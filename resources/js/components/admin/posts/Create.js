import {
    Card,
    CardContent,
    Container,
    FormControl,
    Grid,
    makeStyles,
    TextField,
    Typography,
    Button,
    MenuItem,
    Input,
    Select,
    InputLabel,
    Chip,
    FormHelperText
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CKEditor from "ckeditor4-react";
import { getCategoriesWithoutPagination } from "../../../actions/admin/categoryActions";
import { addPost, clearErrors } from "../../../actions/admin/postActions";
import { useHistory } from "react-router-dom";
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

function Create() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [postCategories, setPostCategories] = useState([]);
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [chipCategories, setChipCategories] = useState([]);
    const [postImage, setPostImage] = useState(null);
    const [preview, setPreview] = useState("");

    const { errors } = useSelector(state => state.adminPosts);
    const { categories } = useSelector(state => state.adminCategories);

    useEffect(() => {
        (async () => {
            dispatch(clearErrors()); //forget previous validation errors
            await dispatch(getCategoriesWithoutPagination());
        })();
    }, []);

    const handlePostCategoriesChange = e => {
        const ids = e.target.value;

        setPostCategories(ids);
        setChipCategories(
            categories.filter(category => ids.includes(category.id))
        );
    };

    const handleFileChange = e => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);

        setPostImage(file);

        reader.onloadend = () => {
            setPreview(reader.result);
        };
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("title", title);
        formData.set("content", content);
        formData.set("meta_title", metaTitle);
        formData.set("meta_description", metaDescription);
        postCategories.forEach(category =>
            formData.append("categories[]", category)
        );
        formData.set("image", postImage);

        const response = await dispatch(addPost(formData));

        if (response) {
            history.push("/admin/posts");
        }
    };

    return (
        <div>
            <Container>
                <Typography
                    variant="h3"
                    component="h3"
                    className={classes.heading}
                >
                    Create Post
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
                                                "title"
                                            )}
                                            label="Title"
                                            id="title"
                                            name="title"
                                            onChange={e =>
                                                setTitle(e.target.value)
                                            }
                                            value={title}
                                            helperText={getFirstValidationError(
                                                errors,
                                                "title"
                                            )}
                                        ></TextField>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={6}>
                                    <FormControl
                                        className={classes.formControl}
                                        fullWidth
                                        error={hasValidationError(
                                            errors,
                                            "categories"
                                        )}
                                    >
                                        <InputLabel id="demo-mutiple-chip-label">
                                            Category(s)
                                        </InputLabel>
                                        <Select
                                            labelId="demo-mutiple-chip-label"
                                            id="demo-mutiple-chip"
                                            multiple
                                            value={postCategories}
                                            onChange={
                                                handlePostCategoriesChange
                                            }
                                            input={
                                                <Input id="select-multiple-chip" />
                                            }
                                            renderValue={() => (
                                                <div className={classes.chips}>
                                                    {chipCategories.map(
                                                        category => (
                                                            <Chip
                                                                key={
                                                                    category.id
                                                                }
                                                                label={
                                                                    category.name
                                                                }
                                                                className={
                                                                    classes.chip
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        >
                                            {categories.map(category => (
                                                <MenuItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>
                                            {getFirstValidationError(
                                                errors,
                                                "categories"
                                            )}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={12}>
                                    <FormControl
                                        fullWidth
                                        error={hasValidationError(
                                            errors,
                                            "content"
                                        )}
                                    >
                                        <CKEditor
                                            data={content}
                                            onChange={e =>
                                                setContent(e.editor.getData())
                                            }
                                        />
                                        <FormHelperText>
                                            {getFirstValidationError(
                                                errors,
                                                "content"
                                            )}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            error={hasValidationError(
                                                errors,
                                                "meta_title"
                                            )}
                                            label="Meta Title"
                                            id="meta_title"
                                            name="meta_title"
                                            onChange={e =>
                                                setMetaTitle(e.target.value)
                                            }
                                            value={metaTitle}
                                            helperText={getFirstValidationError(
                                                errors,
                                                "meta_title"
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item lg={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            error={hasValidationError(
                                                errors,
                                                "meta_description"
                                            )}
                                            label="Meta Description"
                                            id="meta_description"
                                            name="meta_description"
                                            onChange={e =>
                                                setMetaDescription(
                                                    e.target.value
                                                )
                                            }
                                            helperText={getFirstValidationError(
                                                errors,
                                                "meta_description"
                                            )}
                                            value={metaDescription}
                                        />
                                    </FormControl>
                                </Grid>
                                {preview ? (
                                    <Grid item lg={12}>
                                        <img
                                            src={preview}
                                            className={classes.previewImage}
                                        />
                                    </Grid>
                                ) : null}
                                <Grid item lg={12}>
                                    <FormControl
                                        fullWidth
                                        error={hasValidationError(
                                            errors,
                                            "image"
                                        )}
                                    >
                                        <input
                                            accept="image/*"
                                            className={classes.input}
                                            style={{ display: "none" }}
                                            id="raised-button-file"
                                            multiple
                                            type="file"
                                            onChange={handleFileChange}
                                        />
                                        <label htmlFor="raised-button-file">
                                            <Button
                                                variant="contained"
                                                component="span"
                                                className={classes.button}
                                                fullWidth
                                            >
                                                Choose Image
                                            </Button>
                                        </label>
                                        <FormHelperText>
                                            {getFirstValidationError(
                                                errors,
                                                "image"
                                            )}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={3}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        Create
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}

export default Create;
