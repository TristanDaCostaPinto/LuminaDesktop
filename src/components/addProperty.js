import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useFormik, FieldArray, FormikProvider } from 'formik';
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

import Alert from '@material-ui/lab/Alert';

import { postProperty } from '../services/property.services';
import axios from 'axios';
import authHeader from '../services/auth-header'

const validationSchema = yup.object({
    propertyStatus: yup
        .string('Sélectionner un status')
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
    titleFieldArray: {
        marginBottom: theme.spacing(1),
    },
    containerPieceProperty: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        border: '1px solid #47A8BD',
    },
    buttonPieceProperty: {
        backgroundColor: '#47A8BD',
        color: '#F5F5F5',
        border: 'none',
        width: '100%',
        '&:hover': {
            cursor: 'pointer',
            border: '1px solid #47A8BD',
            backgroundColor: 'whitesmoke',
            color: '#47A8BD',
        }
    }
}));

export default function AddProperty() {
    const { user: currentUser } = useSelector((state) => state.auth);

    const ref = useRef();
    const classes = useStyles();

    const { message } = useSelector(state => state.message);

    const [isSuccessful, setSuccessful] = useState(false);

    const formik = useFormik({
        initialValues: {
            propertyStatus: '',
            propertyParameters: [
                { 'Prix': '' },
                { 'Type de Bien': '' },
                { 'Superficie': '' },
                { 'Pièces': '' },
                { 'Ville': '' },
                { 'Code Postal': '' },
                { 'Orientation': '' },
                { 'Spécificités': '' }
            ],
            piecesProperty: [
                {
                    pieceName: '',
                    pieceSurface: '',
                    pieceExposure: '',
                    pictureURL: '',
                    idProperty: '',
                    idPiece: ''
                }
            ]
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            
            if (values.propertyParameters[1]["Type de Bien"] === "Appartement") {
                values.propertyParameters.push({ "ImageDefaut": "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" })
            } else if (values.propertyParameters[1]["Type de Bien"] === "Maison") {
                values.propertyParameters.push({ "ImageDefaut": "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" })
            }
            setSuccessful(false);
            postProperty(
                Number(values.propertyStatus),
                currentUser.user.idUser,
                JSON.stringify(values.propertyParameters),
            )
                .then((response) => {
                    let infos = response.data.property

                    values.piecesProperty.map(singlePiece => (
                        axios.post(`http://www.share-your-universe.com/public/api/v1/property/${infos.idProperty}`, {
                            pieceName: singlePiece.pieceName,
                            pieceSurface: singlePiece.pieceSurface,
                            pieceExposure: singlePiece.pieceExposure,
                            idProperty: infos.idProperty,
                        }, { headers: authHeader() })
                        .then((response) => {
                            let infosPiece = response.data.piece;

                            axios.post(`http://www.share-your-universe.com/public/api/v1/property/${infos.idProperty}/${infosPiece.idPiece}`, {
                                pictureURL: singlePiece.pictureURL,
                                idProperty: infos.idProperty,
                                idPiece: infosPiece.idPiece,
                            }, { headers: authHeader() }).then(() => {
                                alert('YEAH')
                            })
                        })
                    ))
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                })
        },
    });

    if (!currentUser) {
        return <Redirect to='/' />;
    }

    return (
        <Container maxWidth="md">
            <div className={classes.paper}>
                <Avatar>R</Avatar>
                <Typography>
                    Ajouter une Propriété
                </Typography>
                <form onSubmit={formik.handleSubmit} ref={ref} className={classes.form}>
                    {!isSuccessful && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl error={formik.touched.propertyStatus && Boolean(formik.errors.propertyStatus)}>
                                    <FormLabel component="legend">Status du Bien :</FormLabel>
                                    <RadioGroup row aria-label="propertyStatus" name="propertyStatus" value={formik.values.propertyStatus} onChange={formik.handleChange}>
                                        <FormControlLabel value="1" control={<Radio />} label="A Louer" />
                                        <FormControlLabel value="2" control={<Radio />} label="En Vente" />
                                    </RadioGroup>
                                    <FormHelperText>{formik.touched.propertyStatus && formik.errors.propertyStatus}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="message"
                                    label="Prix du Bien"
                                    type="text"
                                    name="propertyParameters[0]['Prix']"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.propertyParameters[0]["Prix"]}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel component="legend">Type de Bien :</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-label="Type de Bien"
                                        name="propertyParameters[1]['Type de Bien']"
                                        value={formik.values.propertyParameters[1]["Type de Bien"]}
                                        onChange={formik.handleChange}
                                    >
                                        <FormControlLabel value="Maison" control={<Radio />} label="Maison" />
                                        <FormControlLabel value="Appartement" control={<Radio />} label="Appartement" />
                                        <FormControlLabel value="Terrain" control={<Radio />} label="Terrain" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="message"
                                    label="Superficie"
                                    type="text"
                                    name="propertyParameters[2]['Superficie']"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.propertyParameters[2]["Superficie"]}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="message"
                                    label="Nombres de Pièces"
                                    type="number"
                                    name="propertyParameters[3]['Pièces']"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.propertyParameters[3]["Pièces"]}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormikProvider value={formik}>
                                    <FieldArray name="piecesProperty">
                                        {({ push, remove, }) => (
                                            <React.Fragment>
                                                <Grid item className={classes.titleFieldArray}>
                                                    <Typography>Gestion Pièces</Typography>
                                                </Grid>
                                                {formik.values.piecesProperty.map((_, index) => (
                                                    <Grid container spacing={2} key={`container${index}`} className={classes.containerPieceProperty}>
                                                        <Grid item md={4}>
                                                            <TextField
                                                                id="message"
                                                                label="Nom de la Pièce"
                                                                type="text"
                                                                name={`piecesProperty[${index}].pieceName`}
                                                                variant="outlined"
                                                                fullWidth
                                                                value={formik.values.piecesProperty[index].pieceName}
                                                                onChange={formik.handleChange}
                                                            />
                                                        </Grid>
                                                        <Grid item md={4}>
                                                            <TextField
                                                                id="message"
                                                                label="Surface de la Pièce (en m²)"
                                                                type="text"
                                                                name={`piecesProperty[${index}].pieceSurface`}
                                                                variant="outlined"
                                                                fullWidth
                                                                value={formik.values.piecesProperty[index].pieceSurface}
                                                                onChange={formik.handleChange}
                                                            />
                                                        </Grid>
                                                        <Grid item md={4}>
                                                            <TextField
                                                                id="message"
                                                                label="Lien de l'image de la Pièce"
                                                                type="text"
                                                                name={`piecesProperty[${index}].pictureURL`}
                                                                variant="outlined"
                                                                fullWidth
                                                                value={formik.values.piecesProperty[index].pictureURL}
                                                                onChange={formik.handleChange}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <FormControl>
                                                                <FormLabel component="legend">Orientation de la Pièce:</FormLabel>
                                                                <RadioGroup
                                                                    row
                                                                    aria-label="Orientation"
                                                                    name={`piecesProperty[${index}].pieceExposure`}
                                                                    value={formik.values.piecesProperty[index].pieceExposure}
                                                                    onChange={formik.handleChange}
                                                                >
                                                                    <FormControlLabel value="Nord" control={<Radio />} label="Nord" />
                                                                    <FormControlLabel value="Sud" control={<Radio />} label="Sud" />
                                                                    <FormControlLabel value="Est" control={<Radio />} label="Est" />
                                                                    <FormControlLabel value="Ouest" control={<Radio />} label="Ouest" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item md={12}>
                                                            <Button onClick={() => remove(index)} className={classes.buttonPieceProperty}>
                                                                Retirer la Pièce
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                ))}
                                                <Grid item>
                                                    <Button onClick={() => push({
                                                        pieceName: '',
                                                        pieceSurface: '',
                                                        pieceExposure: '',
                                                        pictureURL: '',
                                                        idProperty: '',
                                                        idPiece: ''
                                                    })} className={classes.buttonPieceProperty}>
                                                        Ajouter une pièce
                                                    </Button>
                                                </Grid>
                                            </React.Fragment>
                                        )}
                                    </FieldArray>
                                </FormikProvider>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="message"
                                    label="Ville"
                                    type="text"
                                    name="propertyParameters[4]['Ville']"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.propertyParameters[4]["Ville"]}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="message"
                                    label="Code Postal"
                                    type="text"
                                    name="propertyParameters[5]['Code Postal']"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.propertyParameters[5]["Code Postal"]}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel component="legend">Orientation :</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-label="Orientation"
                                        name="propertyParameters[6]['Orientation']"
                                        value={formik.values.propertyParameters[6]["Orientation"]}
                                        onChange={formik.handleChange}
                                    >
                                        <FormControlLabel value="Nord" control={<Radio />} label="Nord" />
                                        <FormControlLabel value="Sud" control={<Radio />} label="Sud" />
                                        <FormControlLabel value="Est" control={<Radio />} label="Est" />
                                        <FormControlLabel value="Ouest" control={<Radio />} label="Ouest" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="message"
                                    label="Spécificités"
                                    type="text"
                                    name="propertyParameters[7]['Spécificités']"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.propertyParameters[7]["Spécificités"]}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid container className={classes.rowSubmit}>
                                <Grid item xs={12}>
                                    <Button type="submit" className={classes.submit}>
                                        Ajouter la Propriété
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