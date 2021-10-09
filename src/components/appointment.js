import React, { useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import clsx from 'clsx';
import {
    makeStyles,
    CssBaseline,
    Typography,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
} from '@material-ui/core';

import ProfileNavbar from '../addons/profileNavbar';

import { listAppointment } from '../actions/appointment';
import DeleteAppointment from './deleteAppointment';
import { AppointmentType } from '../helpers/appointmentHelp';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
    },
    fixedHeight: {
        height: 'auto',
    },
    linkButton: {
        textDecoration: 'none',
    }
}));

export default function Appointment() {

    const { user: currentUser } = useSelector((state) => state.auth);
    const { appointment: listAppointments } = useSelector((state) => state.ListAppointment);

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listAppointment());
    }, [dispatch]);

    if (!currentUser) {
        return <Redirect to='/' />;
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <ProfileNavbar />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="xl" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={fixedHeightPaper}>
                                Liste des Rendez-vous
                                {!listAppointments.length ?
                                    <Typography>Aucun rendez-vous</Typography> :
                                    <TableContainer>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Date du Rendez-vous</TableCell>
                                                    <TableCell align="right">Motif</TableCell>
                                                    <TableCell align="right">Type de Rendez-Vous</TableCell>
                                                    <TableCell align="right">Agent Mobilisé</TableCell>
                                                    <TableCell align="right">Modifier le RDV</TableCell>
                                                    <TableCell align="right">Supprimer le RDV</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {currentUser.user.idRole === 4 || currentUser.user.idRole === 3 ?
                                                    listAppointments.map(item =>
                                                        <TableRow key={item.idAppointment}>
                                                            <TableCell component="th" scope="row">{item.appointmentDate}</TableCell>
                                                            <TableCell align="right">{item.appointmentMotif}</TableCell>
                                                            <TableCell align="right">{AppointmentType(item.appointmentType)}</TableCell>
                                                            <TableCell align="right">{item.appointmentAgent}</TableCell>
                                                            <TableCell align="right">
                                                                <Link to={`/modifyAppointment/${item.idAppointment}`} className={classes.linkButton} target="_blank">
                                                                    <Button
                                                                        variant="outlined"
                                                                    >
                                                                        Modifier le RDV
                                                                    </Button>
                                                                </Link>
                                                            </TableCell>
                                                            <TableCell>
                                                                <DeleteAppointment sendIdAppointment={item.idAppointment} />
                                                            </TableCell>
                                                        </TableRow>
                                                    ) : listAppointments.filter(result => result.appointmentAgent === currentUser.user.idUser.toString()).map(item =>
                                                        <TableRow key={item.idAppointment}>
                                                            <TableCell component="th" scope="row">{item.appointmentDate}</TableCell>
                                                            <TableCell align="right">{item.appointmentMotif}</TableCell>
                                                            <TableCell align="right">{AppointmentType(item.appointmentType)}</TableCell>
                                                            <TableCell align="right">{item.appointmentAgent}</TableCell>
                                                            <TableCell align="right">
                                                                <Link to={`/modifyAppointment/${item.idAppointment}`} className={classes.linkButton} target="_blank">
                                                                    <Button
                                                                        variant="outlined"
                                                                    // onClick={() => modifyAppointment(item.idAppointment)}
                                                                    >
                                                                        Modifier le RDV
                                                                    </Button>
                                                                </Link>
                                                            </TableCell>
                                                            <TableCell>
                                                                <DeleteAppointment sendIdAppointment={item.idAppointment} />
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                }
                                <Link to="/addAppointment" className={classes.linkButton} target="_blank">
                                    <Button
                                        variant="outlined"
                                    >
                                        Ajouter un Rendez-Vous
                                    </Button>
                                </Link>
                                <Button
                                    onClick={() => {
                                        window.location.reload();
                                    }}
                                    variant="outlined"
                                >
                                    Rafraîchir la Liste
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}