import React, { useEffect, useState } from "react";
import {
    Typography,
    makeStyles,
    Container,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    IconButton,
    TablePagination,
    Fab,
    Chip
} from "@material-ui/core";
import { Edit as EditIcon, Add as AddIcon } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getDefaultPerPage, limitString } from "../../../helpers";
import { Link } from "react-router-dom";
import { getPosts } from "../../../actions/admin/postActions";

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
    table: {},
    fab: {
        position: "fixed",
        bottom: theme.spacing(4),
        right: theme.spacing(4)
    },
    chips: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap"
    },
    chip: {
        margin: 2
    }
}));

function Index() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { prevPageUrl, nextPageUrl, perPage, posts, total } = useSelector(
        state => state.adminPosts
    );

    useEffect(() => {
        (async () => await dispatch(getPosts(perPage)))();
    }, []);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(perPage);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = async e => {
        await dispatch(getPosts(parseInt(e.target.value, 10)));
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handlePrevButtonClick = async e => {
        e.preventDefault();
        await dispatch(getPosts(rowsPerPage, prevPageUrl));
        setPage(page - 1);
    };

    const handleNextButtonClick = async e => {
        e.preventDefault();
        await dispatch(getPosts(rowsPerPage, nextPageUrl));
        setPage(page + 1);
    };

    let rows = null;

    if (posts.length) {
        rows = posts.map(post => (
            <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{limitString(post.title, 50)}</TableCell>
                <TableCell>
                    <div className={classes.chips}>
                        {post.categories?.map(category => (
                            <Chip
                                className={classes.chip}
                                key={category.id}
                                label={category.name}
                            />
                        ))}
                    </div>
                </TableCell>
                <TableCell>
                    {post.author.first_name} {post.author.last_name}
                </TableCell>
                <TableCell>
                    <IconButton
                        color="primary"
                        component={Link}
                        to={`/admin/posts/${post.id}/edit`}
                    >
                        <EditIcon />
                    </IconButton>
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
                    Manage Posts
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
                                    <TableCell>Title</TableCell>
                                    <TableCell>Category(s)</TableCell>
                                    <TableCell>Author Name</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{rows}</TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={getDefaultPerPage(total)}
                        component="div"
                        count={total}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        backIconButtonProps={{
                            onClick: handlePrevButtonClick
                        }}
                        nextIconButtonProps={{
                            onClick: handleNextButtonClick
                        }}
                    />
                </Paper>
            </Container>
            <Fab
                color="primary"
                aria-label="add"
                className={classes.fab}
                component={Link}
                to={"/admin/posts/create"}
            >
                <AddIcon />
            </Fab>
        </div>
    );
}

export default Index;
