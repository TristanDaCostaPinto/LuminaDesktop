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

import { listAgencies } from '../actions/agency';
import DeleteAgency from './deleteAgency';

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

export default function Agencies() {

    const { user: currentUser } = useSelector((state) => state.auth);
    const { agency: agenciesList } = useSelector((state) => state.ListAgencies);

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listAgencies());
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
                                {!agenciesList.length ?
                                    <Typography>Aucune Agence Trouvées</Typography> :
                                    <TableContainer>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Nom de l'agence</TableCell>
                                                    <TableCell align="right">Adresse de l'agence</TableCell>
                                                    <TableCell align="right">Numéro de Téléphone de l'agence</TableCell>
                                                    <TableCell align="right">Adresse Email</TableCell>
                                                    <TableCell align="right">Modifier l'agence</TableCell>
                                                    <TableCell align="right">Supprimer l'agence</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    agenciesList.map(item =>
                                                        <TableRow key={item.idAgency}>
                                                            <TableCell component="th" scope="row">{item.agencyName}</TableCell>
                                                            <TableCell align="right">{item.agencyAdr}</TableCell>
                                                            <TableCell align="right">{item.agencyPhone}</TableCell>
                                                            <TableCell align="right">{item.agencyContact}</TableCell>
                                                            <TableCell align="right">
                                                                <Link to={`/modifyAgency/${item.idAgency}`} className={classes.linkButton} target="_blank">
                                                                    <Button
                                                                        variant="outlined"
                                                                    >
                                                                        Modifier l'agence
                                                                    </Button>
                                                                </Link>
                                                            </TableCell>
                                                            <TableCell>
                                                                <DeleteAgency sendIdAgency={item.idAgency} />
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                }
                                <Link to="/addAgency" target="_blank" className={classes.linkButton}>
                                    <Button
                                        variant="outlined"
                                    >
                                        Ajouter une Agence
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