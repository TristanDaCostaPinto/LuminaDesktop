import React, { useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import {
    makeStyles,
    CssBaseline,
    Container,
    Grid,
    Paper,
    Button,
    TextField,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import ProfileNavbar from '../addons/profileNavbar';

import { updateUserInfo } from '../actions/user';

const validationSchema = yup.object({
    userLastname: yup
        .string('Entrez votre Nom')
        .min(2, 'Votre nom ne correspond pas au format demandé')
        .matches(/^[a-zA-Z]+$/, 'Merci de saisir que des lettres'),
    userFirstname: yup
        .string('Entrez votre prénom')
        .min(2, 'Votre nom ne correspond pas au format demandé')
        .matches(/^[a-zA-Z]+$/, 'Merci de saisir que des lettres'),
    userEmail: yup
        .string('Entrez votre email')
        .email('L\'email n\'est pas valide'),
    userPassword: yup
        .string('Entrez votre mot de passe')
        .min(6, 'Le mot de passe ne correspond pas au format'),
});

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
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#47A8BD',
        color: '#F5F5F5',
    },
}));

export default function Settings() {

    const { user: currentUser } = useSelector((state) => state.auth);
    const { message } = useSelector(state => state.message);
    const [isSuccessful, setSuccessful] = useState(false);

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const form = useRef();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            userLastname: '',
            userFirstname: '',
            userEmail: '',
            userPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setSuccessful(false);

            for (const key of Object.keys(values)) {
                if (values[key] === "") {
                    delete values[key];
                }
            }

            if (Object.keys(values).length === 0) {
                setSuccessful(false);
            } else {
                dispatch(updateUserInfo(currentUser.user.idUser, values))
                    .then(() => {
                        setSuccessful(true);
                    })
                    .catch(() => {
                        setSuccessful(false);
                    })
            }
        },
    });

    if (!currentUser) {
        return <Redirect to='/login' />;
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <ProfileNavbar />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxwidth="xl" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={fixedHeightPaper}>
                                Changer ses Informations
                                <form onSubmit={formik.handleSubmit} className={classes.form} ref={form}>
                                    {!isSuccessful && (
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    id="Nom"
                                                    name="userLastname"
                                                    label="Nom"
                                                    type="text"
                                                    value={formik.values.userLastname}
                                                    onChange={formik.handleChange}
                                                    error={formik.touched.userLastname && Boolean(formik.errors.userLastname)}
                                                    helperText={formik.touched.userLastname && formik.errors.userLastname}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    id="Prénom"
                                                    name="userFirstname"
                                                    label="Prénom"
                                                    type="text"
                                                    value={formik.values.userFirstname}
                                                    onChange={formik.handleChange}
                                                    error={formik.touched.userFirstname && Boolean(formik.errors.userFirstname)}
                                                    helperText={formik.touched.userFirstname && formik.errors.userFirstname}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    id="Email"
                                                    name="userEmail"
                                                    label="Email"
                                                    type="text"
                                                    value={formik.values.userEmail}
                                                    onChange={formik.handleChange}
                                                    error={formik.touched.userEmail && Boolean(formik.errors.userEmail)}
                                                    helperText={formik.touched.userEmail && formik.errors.userEmail}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    id="MotdePasse"
                                                    name="userPassword"
                                                    label="Mot de Passe"
                                                    type="password"
                                                    value={formik.values.userPassword}
                                                    onChange={formik.handleChange}
                                                    error={formik.touched.userPassword && Boolean(formik.errors.userPassword)}
                                                    helperText={formik.touched.userPassword && formik.errors.userPassword}
                                                />
                                            </Grid>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                type="submit"
                                                className={classes.submit}
                                            >
                                                Changer les informations renseignées
                                            </Button>
                                        </Grid>
                                    )}
                                    <Grid container>
                                        <Grid item xs={12}>
                                            {message && (
                                                <Alert severity={isSuccessful ? 'success' : 'error'}>{message}</Alert>
                                            )}
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
};