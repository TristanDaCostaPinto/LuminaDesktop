import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    Container,
    Avatar,
    Typography,
    TextField,
    Grid,
    Button,
    makeStyles,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { register } from '../actions/auth';

const validationSchema = yup.object({
    userLastname: yup
        .string('Entrez votre Nom')
        .matches(/^[a-zA-Z]+$/ , 'Merci de saisir que des lettres')
        .required('Le nom est requis'),
    userFirstname: yup
        .string('Entrez votre Prénom')
        .matches(/^[a-zA-Z]+$/ , 'Merci de saisir que des lettres')
        .required('Le prénom est requis'),
    userEmail: yup
        .string('Entrez votre email')
        .email('Entrez une email valide')
        .required('L\'email est requis'),
    userDob: yup
        .string('Entrez votre Date de Naissance')
        .required('La date de naissance est requise'),
    userPhone: yup
        .string('Entrez votre Numéro de Téléphone')
        .matches(/^[0-9]+$/ , 'Merci de saisir que des chiffres')
        .min(10, 'Minimum 10 chiffres pour le numéro de téléphone')
        .max(10, 'Maximum 10 chiffres pour le numéro de téléphone')
        .required('Le numéro de téléphone est requis'),
    userAdr: yup
        .string('Entrez votre Adresse Postale')
        .required('L\'adresse postale est requise'),
    userPassword: yup
        .string('Entrez votre mot de passe')
        .min(6, 'Le mot de passe ne correspond pas au format')
        .required('Le mot de passe est requis'),
});

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        marginTop: theme.spacing(2),
        padding: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.75)',
    },
    rowSubmit: {
        textAlign: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#47A8BD',
        color: '#F5F5F5',
        border: 'none',
        padding: theme.spacing(2),
        '&:hover': {
            cursor: 'pointer',
        }
    },
    buttonCustom: {
        color: '#F5F5F5',
        '&:hover': {
            backgroundColor: 'transparent',
        }
    }
}));

export default function Register() {
    const form = useRef();
    const classes = useStyles();

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const [isSuccessful, setSuccessful] = useState(false);

    const formik = useFormik({
        initialValues: {
            userLastname: '',
            userFirstname: '',
            userEmail: '',
            userDob: '',
            userPhone: '',
            userAdr: '',
            userPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setSuccessful(false);
            dispatch(register(
                values.userLastname,
                values.userFirstname,
                values.userEmail,
                values.userDob,
                values.userPhone,
                values.userAdr,
                values.userPassword))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                })
        },
    });

    return (
        <Container maxWidth="md">
            <div className={classes.paper}>
                <Avatar>R</Avatar>
                <Typography>
                    Nouveau Membre
                </Typography>
                <form onSubmit={formik.handleSubmit} ref={form} className={classes.form}>
                    {!isSuccessful && (
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    variant="outlined"
                                    id="userLastname"
                                    name="userLastname"
                                    type="text"
                                    label="Nom"
                                    value={formik.values.userLastname}
                                    onChange={formik.handleChange}
                                    error={formik.touched.userLastname && Boolean(formik.errors.userLastname)}
                                    helperText={formik.touched.userLastname && formik.errors.userLastname}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    variant="outlined"
                                    id="userFirstname"
                                    name="userFirstname"
                                    type="text"
                                    label="Prénom"
                                    value={formik.values.userFirstname}
                                    onChange={formik.handleChange}
                                    error={formik.touched.userFirstname && Boolean(formik.errors.userFirstname)}
                                    helperText={formik.touched.userFirstname && formik.errors.userFirstname}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    variant="outlined"
                                    id="userEmail"
                                    name="userEmail"
                                    label="Email"
                                    type="email"
                                    value={formik.values.userEmail}
                                    onChange={formik.handleChange}
                                    error={formik.touched.userEmail && Boolean(formik.errors.userEmail)}
                                    helperText={formik.touched.userEmail && formik.errors.userEmail}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    variant="outlined"
                                    id="userDob"
                                    name="userDob"
                                    label="Date de Naissance"
                                    type="date"
                                    value={formik.values.userDob}
                                    onChange={formik.handleChange}
                                    error={formik.touched.userDob && Boolean(formik.errors.userDob)}
                                    helperText={formik.touched.userDob && formik.errors.userDob}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    variant="outlined"
                                    id="userPhone"
                                    name="userPhone"
                                    label="Numéro de Téléphone"
                                    type="phone"
                                    value={formik.values.userPhone}
                                    onChange={formik.handleChange}
                                    error={formik.touched.userPhone && Boolean(formik.errors.userPhone)}
                                    helperText={formik.touched.userPhone && formik.errors.userPhone}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    variant="outlined"
                                    id="userAdr"
                                    name="userAdr"
                                    label="Adresse"
                                    type="text"
                                    value={formik.values.userAdr}
                                    onChange={formik.handleChange}
                                    error={formik.touched.userAdr && Boolean(formik.errors.userAdr)}
                                    helperText={formik.touched.userAdr && formik.errors.userAdr}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    variant="outlined"
                                    id="userPassword"
                                    name="userPassword"
                                    label="Mot de Passe"
                                    type="password"
                                    value={formik.values.userPassword}
                                    onChange={formik.handleChange}
                                    error={formik.touched.userPassword && Boolean(formik.errors.userPassword)}
                                    helperText={formik.touched.userPassword && formik.errors.userPassword}
                                />
                            </Grid>
                            <Grid container className={classes.rowSubmit}>
                                <Grid item xs={12}>
                                    <Button type="submit" className={classes.submit}>
                                        S'INSCRIRE
                                    </Button>
                                </Grid>
                            </Grid>
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
            </div>
        </Container>
    );
};