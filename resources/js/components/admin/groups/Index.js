import { Container, Fab, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
// import { Add as AddIcon, Edit as EditIcon, Group as GroupIcon } from '@material-ui/icons';
import { Add as AddIcon, Edit as EditIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroup, getGroups } from '../../../actions/admin/groupActions';
import { getDefaultPerPage } from '../../../helpers';
import CreateModal from './components/CreateModal';
import EditModal from './components/EditModal';

const useStyles = makeStyles(theme => ({
    heading: {
        textAlign: 'center',
        marginTop: '0.5rem',
        marginBottom: '1rem',
        color: '#424242'
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    table: {},
    fab: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(4)
    }
}));

function Index() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const { prevPageUrl, nextPageUrl, perPage, groups, group, total, errors } = useSelector(state => state.adminGroups);

    useEffect(() => {
        (async () => await dispatch(getGroups(perPage)))();
    }, []);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(perPage);
    const [toggleCreateModal, setToggleCreateModal] = useState(false);
    const [toggleEditModal, setToggleEditModal] = useState(false);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = async e => {
        await dispatch(getGroups(parseInt(e.target.value, 10)));
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handlePrevButtonClick = async e => {
        e.preventDefault();
        await dispatch(getGroups(rowsPerPage, prevPageUrl));
        setPage(page - 1);
    };

    const handleNextButtonClick = async e => {
        e.preventDefault();
        await dispatch(getGroups(rowsPerPage, nextPageUrl));
        setPage(page + 1);
    };

    const openEditGroupModal = async (e, id) => {
        e.preventDefault();

        if (await dispatch(getGroup(id))) {
            setToggleEditModal(true);
        }
    };

    let rows = null;

    if (groups.length) {
        rows = groups.map(group => (
            <TableRow key={group.id}>
                <TableCell>{group.id}</TableCell>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.description?.substr(0, 30).trim().concat('...')}</TableCell>
                <TableCell>
                    <IconButton color='primary' onClick={e => openEditGroupModal(e, group.id)}>
                        <EditIcon />
                    </IconButton>
                    {/* <IconButton color='primary' component={Link} to={`/admin/groups/${group.id}/permissions`}>
                        <GroupIcon />
                    </IconButton> */}
                </TableCell>
            </TableRow>
        ));
    } else {
        rows = (
            <TableRow>
                <TableCell colSpan={3} align='center'>
                    No Records!
                </TableCell>
            </TableRow>
        );
    }

    return (
        <div>
            <Container>
                <Typography variant='h3' component='h3' className={classes.heading}>
                    Manage Groups
                </Typography>
                <Paper className={classes.paper}>
                    <TableContainer>
                        <Table className={classes.table} aria-label='simple table'>
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
                        component='div'
                        count={total}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        backIconButtonProps={{
                            onClick: handlePrevButtonClick
                        }}
                        nextIconButtonProps={{
                            onClick: handleNextButtonClick
                        }}
                    />
                </Paper>
            </Container>
            <Fab color='primary' aria-label='add' className={classes.fab} onClick={() => setToggleCreateModal(true)}>
                <AddIcon />
            </Fab>
            <CreateModal open={toggleCreateModal} setOpen={setToggleCreateModal} errors={errors} />
            <EditModal open={toggleEditModal} setOpen={setToggleEditModal} errors={errors} group={group} />
        </div>
    );
}

export default Index;
