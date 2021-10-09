import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    Container,
    Avatar,
    Typography,
    LinearProgress,
    TextField,
    Grid,
    CssBaseline,
    makeStyles,
    Button,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { login } from '../actions/auth';

const validationSchema = yup.object({
    userEmail: yup
        .string('Entrez votre Email')
        .email('Entrez un email valide')
        .required('L\'email est requis'),
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
        marginTop: theme.spacing(8),
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

export default function Login(props) {
    const form = useRef();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const formik = useFormik({
        initialValues: {
            userEmail: '',
            userPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true);
            dispatch(login(values.userEmail, values.userPassword))
                .then(() => {
                    props.history.push('/profile');
                })
                .catch(() => {
                    setLoading(false);
                });
            if (isLoggedIn) {
                return <Redirect to='/profile' />;
            }
        },
    });

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar>L</Avatar>
                <Typography>
                    Se Connecter
                </Typography>
                <form onSubmit={formik.handleSubmit} ref={form} className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
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
                    </Grid>
                    <Grid container className={classes.rowSubmit}>
                        <Grid item xs={12}>
                            <Button type="submit" className={classes.submit}>
                                SE CONNECTER
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            {isLoading && (
                                <LinearProgress />
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            {message && (
                                <Alert severity="error">{message}</Alert>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};