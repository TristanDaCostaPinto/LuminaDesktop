import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
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
    Tooltip,
    CircularProgress,
    InputLabel,
    Select,
    MenuItem,
    makeStyles,
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

import { updateProperty } from '../actions/property';
import { updatePiece } from '../actions/pieces';

import axios from 'axios';
import PropertyStatus from '../helpers/propertyStatus';

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
    },
    infosPieceNone: {
        display: 'none',
    },
    infosPieceBlock: {
        display: 'block',
    }
}));

export default function ModifyProperty() {
    const { user: currentUser } = useSelector((state) => state.auth);

    const ref = useRef();
    const classes = useStyles();

    const { infoProperty } = useParams();
    const [infosProperty, setInfosProperty] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [getIdPiece, setIdPiece] = useState('');
    const [infosPiece, setInfosPiece] = useState([]);

    const { message } = useSelector(state => state.message);

    const [isSuccessful, setSuccessful] = useState(false);
    const [isSuccessfulPiece, setSuccessfulPiece] = useState(false);

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
                dispatch(updateProperty(
                    Number(values.propertyStatus),
                    currentUser.user.idUser,
                    JSON.stringify(values.propertyParameters),
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

    const formikPiece = useFormik({
        initialValues: {
            pieceName: '',
            pieceSurface: '',
            pieceExposure: ''
        },
        onSubmit: (values) => {
            setSuccessfulPiece(false);
            for (const key of Object.keys(values)) {
                if (values[key] === "") {
                    delete values[key];
                }
            }

            if (Object.keys(values).length === 0) {
                setSuccessfulPiece(false);
            } else {
                dispatch(updatePiece(infoProperty, infosPiece.idPiece, values))
                    .then(() => {
                        setSuccessfulPiece(true);
                    })
                    .catch(() => {
                        setSuccessfulPiece(false);
                    })
            }
        },
    });

    const getInfoPiece = (event) => {
        const retrieveIdPiece = event.target.value;
        setIdPiece(retrieveIdPiece);
        const rowInfoPiece = document.querySelector('#rowInfoPiece');
        rowInfoPiece.style.display = 'block';
        axios.get(`http://www.share-your-universe.com/public/api/v1/property/${infoProperty}/${retrieveIdPiece}`)
            .then(response => {
                setInfosPiece(response.data.piece)
            })
    };

    useEffect(() => {
        axios.get(`http://www.share-your-universe.com/public/api/v1/property/${infoProperty}`)
            .then(response => {
                setInfosProperty(response.data);
                setLoading(false);
            })
    }, [infoProperty])

    if (isLoading) {
        return <div style={{ textAlign: 'center' }}><CircularProgress /></div>;
    }

    if (!currentUser) {
        return <Redirect to='/' />;
    }

    return (
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <div className={classes.paper}>
                        <Avatar>R</Avatar>
                        <Typography>
                            Modifier La Propriété
                        </Typography>
                        <Tooltip title={
                            <span className={classes.helpText}>
                                Des textes d'indications sont présents sous les champs du formulaire avec les informations de la propriété sélectionnée,
                                laissez le champs vide pour ne pas modifier la valeur.
                            </span>}
                        >
                            <Button className={classes.button}>Aide</Button>
                        </Tooltip>
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
                                            <FormHelperText>Status Précédent de la propriété : {PropertyStatus(infosProperty.property.propertyStatus)}</FormHelperText>
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
                                        <FormHelperText>Prix Précédent de la propriété : {infosProperty.parameters[0]["valueParameter"]}</FormHelperText>
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
                                        <FormHelperText>Type de Bien Précédent de la propriété : {infosProperty.parameters[1]["valueParameter"]}</FormHelperText>
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
                                        <FormHelperText>Superficie Précédente de la propriété : {infosProperty.parameters[2]["valueParameter"]}</FormHelperText>
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
                                        <FormHelperText>Nombre de pièces Précédent de la propriété : {infosProperty.parameters[3]["valueParameter"]}</FormHelperText>
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
                                        <FormHelperText>Ville Précédente de la propriété : {infosProperty.parameters[4]["valueParameter"]}</FormHelperText>
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
                                        <FormHelperText>Code Postal Précédent de la propriété : {infosProperty.parameters[5]["valueParameter"]}</FormHelperText>
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
                                        <FormHelperText>Orientation Précédente de la propriété : {infosProperty.parameters[6]["valueParameter"]}</FormHelperText>
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
                                        <FormHelperText>Spécificités Précédentes de la propriété : {infosProperty.parameters[7]["valueParameter"]}</FormHelperText>
                                    </Grid>
                                    <Grid container className={classes.rowSubmit}>
                                        <Grid item xs={12}>
                                            <Button type="submit" className={classes.submit}>
                                                Modifier la Propriété
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
                </Grid>
                <Grid item md={6}>
                    <div className={classes.paper}>
                        <Avatar>R</Avatar>
                        <Typography>
                            Modifier une des pièces de la propriété
                        </Typography>
                        <Tooltip title={
                            <span className={classes.helpText}>
                                Sélectionnez une pièce de la propriété pour la modifier
                            </span>}
                        >
                            <Button className={classes.button}>Aide</Button>
                        </Tooltip>
                        <form onSubmit={formikPiece.handleSubmit} ref={ref} className={classes.form}>
                            {!isSuccessfulPiece && (
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="selectorPiece">Sélectionnez une Pièce</InputLabel>
                                            <Select
                                                labelId="selectorPiece"
                                                id="selectPiece"
                                                label="Sélectionnez une Pièce"
                                                onChange={getInfoPiece}
                                                value={getIdPiece}
                                                ref={ref}
                                            >
                                                {
                                                    infosProperty.pieces.map(piece =>
                                                        <MenuItem value={piece.idPiece} key={piece.pieceName + Math.floor(Math.random() * 101)}>{piece.pieceName + ' : ' + piece.pieceSurface + " m²"}</MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <div className={classes.infosPieceNone} id="rowInfoPiece">
                                        <Grid container spacing={2}>
                                            <Grid item md={6}>
                                                <TextField
                                                    id="message"
                                                    label="Nom de la Pièce"
                                                    type="text"
                                                    name="pieceName"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={formikPiece.values.pieceName}
                                                    onChange={formikPiece.handleChange}
                                                />
                                                <FormHelperText>Nom Précédent de la pièce : {infosPiece.pieceName}</FormHelperText>
                                            </Grid>
                                            <Grid item md={6}>
                                                <TextField
                                                    id="message"
                                                    label="Surface de la Pièce (en m²)"
                                                    type="text"
                                                    name="pieceSurface"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={formikPiece.values.pieceSurface}
                                                    onChange={formikPiece.handleChange}
                                                />
                                                <FormHelperText>Surface Précédente de la pièce : {infosPiece.pieceSurface}</FormHelperText>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl>
                                                    <FormLabel component="legend">Orientation de la Pièce:</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-label="Orientation"
                                                        name="pieceExposure"
                                                        value={formikPiece.values.pieceExposure}
                                                        onChange={formikPiece.handleChange}
                                                    >
                                                        <FormControlLabel value="Nord" control={<Radio />} label="Nord" />
                                                        <FormControlLabel value="Sud" control={<Radio />} label="Sud" />
                                                        <FormControlLabel value="Est" control={<Radio />} label="Est" />
                                                        <FormControlLabel value="Ouest" control={<Radio />} label="Ouest" />
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormHelperText>Exposition Précédente de la pièce : {infosPiece.pieceExposure}</FormHelperText>
                                            </Grid>
                                            <Grid container className={classes.rowSubmit}>
                                                <Grid item xs={12}>
                                                    <Button type="submit" className={classes.submit}>
                                                        Modifier la Pièce sélectionnée
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </div>
                                </Grid>
                            )}
                            <Grid container>
                                <Grid item xs={12}>
                                    {message && (
                                        <Alert severity={isSuccessfulPiece ? 'success' : 'error'}>{message}</Alert>
                                    )}
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};