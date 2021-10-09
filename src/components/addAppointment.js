import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import {
    Container,
    Avatar,
    Typography,
    TextField,
    Grid,
    Button,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormHelperText,
    FormControl,
    makeStyles,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';

import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';

import DateFnsUtils from '@date-io/date-fns';

import { addAppointment } from '../actions/appointment';


const validationSchema = yup.object({
    appointmentDate: yup
        .string('Sélectionner une date')
        .required('Champ Obligatoire'),
    appointmentType: yup
        .string('Sélectionner un type de rendez-vous')
        .required('Champ Obligatoire'),
    appointmentMotif: yup
        .string('Veuillez remplir ce champ')
        .required('Champ Obligatoire'),
    appointmentAgent: yup
        .string('Veuillez remplir ce champ')
        .required('Champ Obligatoire'),
    idUser: yup
        .string('Veuillez remplir ce champ')
        .required('Champ Obligatoire'),
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
            border: '1px solid #47A8BD',
            backgroundColor: 'whitesmoke',
            color: '#47A8BD',
        }
    },
}));

export default function AddAppointment() {
    const { user: currentUser } = useSelector((state) => state.auth);

    const ref = useRef();
    const classes = useStyles();

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const [isSuccessful, setSuccessful] = useState(false);

    const [listAgents, setListAgents] = useState([]);
    const [listUsers, setListUsers] = useState([]);

    const formik = useFormik({
        initialValues: {
            appointmentDate: '',
            appointmentType: '',
            appointmentMotif: '',
            appointmentAgent: '',
            idUser: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setSuccessful(false);
            dispatch(addAppointment(
                values.appointmentDate,
                values.appointmentMotif,
                values.appointmentType,
                values.appointmentAgent,
                values.idUser
            ))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                })
        },
    });

    useEffect(() => {
        axios.get("http://www.share-your-universe.com/public/api/v1/users", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${currentUser.token}`,
            }
        }).then(response => {
            setListUsers(response.data.users.filter(resultUser => resultUser.idRole === 1));
            setListAgents(response.data.users.filter(resultAgent => resultAgent.idRole === 2));
        })
    }, [currentUser.token])

    if (!currentUser) {
        return <Redirect to='/' />;
    }

    return (
        <Container maxWidth="md">
            <div className={classes.paper}>
                <Avatar>R</Avatar>
                <Typography>
                    Ajouter un Rendez-vous
                </Typography>
                <form onSubmit={formik.handleSubmit} ref={ref} className={classes.form}>
                    {!isSuccessful && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Autocomplete
                                    id="researchUser"
                                    freeSolo
                                    disableClearable
                                    value={formik.values.idUser}
                                    onChange={(selected, value) => formik.setFieldValue("idUser", value.idUser.toString())}
                                    options={listUsers}
                                    getOptionLabel={option => option.userLastname ? option.userLastname : ""}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            name="idUser"
                                            label="Rechercher un utilisateur"
                                            variant="outlined"
                                            error={formik.touched.idUser && Boolean(formik.errors.idUser)}
                                            helperText={formik.touched.idUser && formik.errors.idUser}
                                        />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    id="researchAgent"
                                    freeSolo
                                    disableClearable
                                    value={formik.values.appointmentAgent}
                                    onChange={(selected, value) => formik.setFieldValue("appointmentAgent", value.idUser.toString())}
                                    options={listAgents}
                                    getOptionLabel={option => option.userLastname ? option.userLastname : ""}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            name="appointmentAgent"
                                            label="Rechercher un agent"
                                            variant="outlined"
                                            error={formik.touched.appointmentAgent && Boolean(formik.errors.appointmentAgent)}
                                            helperText={formik.touched.appointmentAgent && formik.errors.appointmentAgent}
                                        />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDateTimePicker
                                            ref={ref}
                                            inputVariant="outlined"
                                            ampm={false}
                                            value={formik.values.appointmentDate}
                                            onChange={(selected, value) => formik.setFieldValue("appointmentDate", value.slice(0, -3))}
                                            error={formik.touched.appointmentDate && Boolean(formik.errors.appointmentDate)}
                                            helperText={formik.touched.appointmentDate && formik.errors.appointmentDate}
                                            label="Date du Rendez-vous"
                                            minDate={new Date("2018-01-01T00:00")}
                                            format="yyyy/MM/dd hh:mm:ss"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl error={formik.touched.appointmentType && Boolean(formik.errors.appointmentType)}>
                                    <FormLabel component="legend">Type de Rendez-vous :</FormLabel>
                                    <RadioGroup row aria-label="appointmentMotif" name="appointmentType" value={formik.values.appointmentType} onChange={formik.handleChange}>
                                        <FormControlLabel value="1" control={<Radio />} label="Visite" />
                                        <FormControlLabel value="2" control={<Radio />} label="Renseignement" />
                                        <FormControlLabel value="3" control={<Radio />} label="Estimation" />
                                        <FormControlLabel value="4" control={<Radio />} label="Location" />
                                        <FormControlLabel value="5" control={<Radio />} label="Achat" />
                                        <FormControlLabel value="6" control={<Radio />} label="Vente" />
                                    </RadioGroup>
                                    <FormHelperText>{formik.touched.appointmentType && formik.errors.appointmentType}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="message"
                                    label="Message Additionnel"
                                    type="text"
                                    name="appointmentMotif"
                                    variant="outlined"
                                    multiline
                                    fullWidth
                                    value={formik.values.appointmentMotif}
                                    onChange={formik.handleChange}
                                    error={formik.touched.appointmentMotif && Boolean(formik.errors.appointmentMotif)}
                                    helperText={formik.touched.appointmentMotif && formik.errors.appointmentMotif}
                                />
                            </Grid>
                            <Grid container className={classes.rowSubmit}>
                                <Grid item xs={12}>
                                    <Button type="submit" className={classes.submit}>
                                        Ajouter le Rendez-vous
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