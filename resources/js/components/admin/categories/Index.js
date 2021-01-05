import {
    Container,
    Fab,
    IconButton,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@material-ui/core";
import { Edit as EditIcon, Add as AddIcon } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getCategories,
    getCategory
} from "../../../actions/admin/categoryActions";
import { getDefaultPerPage } from "../../../helpers";
import CreateModal from "./components/CreateModal";
import EditModal from "./components/EditModal";

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
    }
}));

function Index() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const {
        prevPageUrl,
        nextPageUrl,
        perPage,
        categories,
        category,
        total,
        errors
    } = useSelector(state => state.adminCategories);

    useEffect(() => {
        (async () => await dispatch(getCategories(perPage)))();
    }, []);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(perPage);
    const [toggleCreateModal, setToggleCreateModal] = useState(false);
    const [toggleEditModal, setToggleEditModal] = useState(false);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = async e => {
        await dispatch(getCategories(parseInt(e.target.value, 10)));
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handlePrevButtonClick = async e => {
        e.preventDefault();
        await dispatch(getCategories(rowsPerPage, prevPageUrl));
        setPage(page - 1);
    };

    const handleNextButtonClick = async e => {
        e.preventDefault();
        await dispatch(getCategories(rowsPerPage, nextPageUrl));
        setPage(page + 1);
    };

    const openEditCategoryModel = async (e, id) => {
        e.preventDefault();

        if (await dispatch(getCategory(id))) {
            setToggleEditModal(true);
        }
    };

    let rows = null;

    if (categories.length) {
        rows = categories.map(category => (
            <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                    {category.description
                        ?.substr(0, 30)
                        .trim()
                        .concat("...")}
                </TableCell>
                <TableCell>
                    <IconButton
                        color="primary"
                        onClick={e => openEditCategoryModel(e, category.id)}
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
                    Manage Categories
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
                                    <TableCell>Description</TableCell>
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
                    ></TablePagination>
                </Paper>
            </Container>
            <Fab
                color="primary"
                aria-label="add"
                className={classes.fab}
                onClick={() => setToggleCreateModal(true)}
            >
                <AddIcon />
            </Fab>
            <CreateModal
                open={toggleCreateModal}
                setOpen={setToggleCreateModal}
                errors={errors}
            />
            <EditModal
                open={toggleEditModal}
                setOpen={setToggleEditModal}
                errors={errors}
                category={category}
            />
        </div>
    );
}

export default Index;
