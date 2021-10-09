import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { Redirect } from 'react-router';
import * as yup from 'yup';
import {
    Container,
    Avatar,
    Typography,
    TextField,
    Grid,
    Button,
    FormHelperText,
    Tooltip,
    makeStyles,
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

import { updateAgency } from '../actions/agency';

const validationSchema = yup.object({
    agencyName: yup
        .string('Veuillez saisir une nom d\'agence'),
    agencyAdr: yup
        .string('Veuillez saisir une adresse d\'agence'),
    agencyPhone: yup
        .string('Veuillez saisir un numéro de téléphone pour l\'agence')
        .matches(/^[0-9]+$/, 'Merci de saisir que des chiffres')
        .min(10, 'Format non valide')
        .max(10, 'Format non valide'),
    agencyContact: yup
        .string('Veuillez saisir une adresse de contact pour l\'agence'),
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
    helpText: {
        fontSize: '15px',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#47A8BD',
        color: '#F5F5F5',
        border: 'none',
        padding: theme.spacing(2),
        '&:hover': {
            cursor: 'pointer',
            border: '1px solid #47A8BD',
            backgroundColor: 'whitesmoke',
            color: '#47A8BD',
        }
    },
}));

export default function ModifyAgency() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { message } = useSelector(state => state.message);
    const [isSuccessful, setSuccessful] = useState(false);

    const { infoAgency } = useParams();
    const [infosAgency, setInfosAgency] = useState([]);

    const ref = useRef();
    const classes = useStyles();

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            agencyName: '',
            agencyAdr: '',
            agencyPhone: '',
            agencyContact: '',
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
                dispatch(updateAgency(
                    infoAgency,
                    values
                ))
                    .then(() => {
                        setSuccessful(true);
                        setTimeout(() => {
                            window.close();
                        }, 6000)
                    })
                    .catch(() => {
                        setSuccessful(false);
                    })
            }
        },
    });

    useEffect(() => {
        axios.get(`http://www.share-your-universe.com/public/api/v1/agency/${infoAgency}`)
        .then(response => {
            setInfosAgency(response.data.agency);
        })
    }, [dispatch, infoAgency])

    if (!currentUser) {
        return <Redirect to='/' />;
    }

    return (
        <Container maxWidth="md">
            <div className={classes.paper}>
                <Avatar>R</Avatar>
                <Typography>
                    Modifier une Agence
                </Typography>
                <Tooltip title={
                    <span className={classes.helpText}>
                        Des textes d'indications sont présents sous les champs du formulaire avec les informations de l'agence sélectionnée,
                        laissez le champs vide pour ne pas modifier la valeur.
                    </span>}
                >
                    <Button className={classes.button}>Aide</Button>
                </Tooltip>
                <form onSubmit={formik.handleSubmit} ref={ref} className={classes.form}>
                    {!isSuccessful && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="message"
                                    label="Nom de l'agence"
                                    type="text"
                                    name="agencyName"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.agencyName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.agencyName && Boolean(formik.errors.agencyName)}
                                    helperText={formik.touched.agencyName && formik.errors.agencyName}
                                />
                                <FormHelperText>Nom Précédent de l'agence : {infosAgency.agencyName}</FormHelperText>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="message"
                                    label="Adresse de l'agence"
                                    type="text"
                                    name="agencyAdr"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.agencyAdr}
                                    onChange={formik.handleChange}
                                    error={formik.touched.agencyAdr && Boolean(formik.errors.agencyAdr)}
                                    helperText={formik.touched.agencyAdr && formik.errors.agencyAdr}
                                />
                                <FormHelperText>Adresse Précédente de l'agence : {infosAgency.agencyAdr}</FormHelperText>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="message"
                                    label="Numéro de téléphone de l'agence"
                                    type="text"
                                    name="agencyPhone"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.agencyPhone}
                                    onChange={formik.handleChange}
                                    error={formik.touched.agencyPhone && Boolean(formik.errors.agencyPhone)}
                                    helperText={formik.touched.agencyPhone && formik.errors.agencyPhone}
                                />
                                <FormHelperText>Téléphone Précédent de l'agence : {infosAgency.agencyPhone}</FormHelperText>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="message"
                                    label="Adresse email de l'agence"
                                    type="text"
                                    name="agencyContact"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.agencyContact}
                                    onChange={formik.handleChange}
                                    error={formik.touched.agencyContact && Boolean(formik.errors.agencyContact)}
                                    helperText={formik.touched.agencyContact && formik.errors.agencyContact}
                                />
                                <FormHelperText>Contact Précédent de l'agence : {infosAgency.agencyContact}</FormHelperText>
                            </Grid>
                            <Grid container className={classes.rowSubmit}>
                                <Grid item xs={12}>
                                    <Button type="submit" className={classes.submit}>
                                        Modifier l'agence
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