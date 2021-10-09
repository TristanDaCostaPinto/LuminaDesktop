import React, { useEffect, useState, createRef } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Redirect, Link } from 'react-router-dom';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Radio,
	RadioGroup,
	FormLabel,
	FormControlLabel,
	CircularProgress,
	Button,
	Typography,
	Grid,
	Container,
	Paper,
	Slider,
	InputLabel,
	MenuItem,
	Select,
	Input,
	TextField,
	makeStyles,
} from '@material-ui/core';

import ProfileNavbar from '../addons/profileNavbar';

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
	leftColumn: {
		order: 1,
		[theme.breakpoints.down('sm')]: {
			order: 2,
		},
	},
	rightColumn: {
		order: 2,
		[theme.breakpoints.down('sm')]: {
			order: 1,
		},
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	paperContent: {
		marginTop: '5px',
		marginBottom: '5px',
	},
	fixedHeight: {
		height: '100%',
	},
	maxWidthCustom: {
		width: '100%',
	},
	centerText: {
		textAlign: 'center',
	},
	leftText: {
		textAlign: 'left',
	},
	rightText: {
		textAlign: 'right',
	},
	justifyContent: {
		justifyContent: 'center',
	},
	linkButton: {
		textDecoration: 'none',
		width: '100%',
	}
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const namesAddonsProperties = [
	'Terrasse',
	'Balcon',
	'Jardin',
	'Piscine',
	'Cheminée',
	'Bureau',
	'Cuisine Aménagée',
	'Grenier',
	'Cave',
	'Garage',
	'Plein Pied',
	'Dressing',
	'Ascenseur',
];

const marks = [
	{
		value: 100000,
		label: '100k',
	},
	{
		value: 200000,
		label: '200k',
	},
	{
		value: 300000,
		label: '300k',
	},
	{
		value: 400000,
		label: '400k',
	},
	{
		value: 500000,
		label: '500k',
	},
	{
		value: 600000,
		label: '600k',
	},
	{
		value: 700000,
		label: '700k',
	},
];

export default function Properties() {
	const { user: currentUser } = useSelector((state) => state.auth);

	const classes = useStyles();
	const [isLoading, setLoading] = useState(true);
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	const [properties, setProperties] = useState([]);
	const ref = createRef();

	const propertiesFiltered = (property, filtersKey) => {
		return property.filter(eachProperty => {
			let parametersKey = eachProperty.parameters.map(eachKey => eachKey.keyParameter);
			let parametersValue = eachProperty.parameters.map(eachValue => eachValue.valueParameter);

			return filtersKey.every(filter =>
				// filter[0] === 'Prix' ? parametersValue <= filter[1] && parametersKey.includes(filter[0]) : parametersKey.includes(filter[0]) && parametersValue.includes(filter[1].toString())
				parametersKey.includes(filter[0]) && filter[0] === 'Prix' ? parametersValue <= filter[1] : parametersValue.toString().includes(filter[1])
			);
		})
	}

	const [valueParameterArray, setValueParameters] = useState([]);

	const handleChangePriceProperties = (event, newValue) => {
		const priceProperties = newValue;
		setValueParameters(valueParameter => ({ ...valueParameter, "Prix": priceProperties.toString() }));
	};

	const [orientation, setOrientation] = useState('');

	const handleOrientation = (event) => {
		const orientation = event.target.value;
		setOrientation(orientation);
		setValueParameters(valueParameter => ({ ...valueParameter, "Orientation": orientation }));
	};

	const [typeProperties, setTypeProperties] = useState('');

	const handleChangeTypeProperties = (event) => {
		const typeProperties = event.target.value;
		setTypeProperties(typeProperties);
		setValueParameters(valueParameter => ({ ...valueParameter, "Type de Bien": typeProperties }));
	};

	const [pieceProperties, setPieceProperties] = useState('');

	const handleChangePieceProperties = (event) => {
		const pieceProperties = event.target.value;
		setPieceProperties(pieceProperties);
		setValueParameters(valueParameter => ({ ...valueParameter, "Pièces": pieceProperties }));
	}

	const [addonsProperties, setAddonsProperties] = useState([]);

	const handleChangeAddonsProperties = (event) => {
		const addonsProperties = event.target.value;
		setAddonsProperties(addonsProperties);
		setValueParameters(valueParameter => ({ ...valueParameter, "Spécificités": addonsProperties.join(' ') }));
	};

	useEffect(() => {
		axios.get("http://www.share-your-universe.com/public/api/v1/properties").then(response => {
			setProperties(response.data);
			setLoading(false);
		});

	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		setProperties({ 'property': propertiesFiltered(Object.values(properties.property), Object.entries(valueParameterArray)) });
	}


	if (!currentUser) {
		return <Redirect to='/' />;
	}

	return (
		<div className={classes.root}>
			<ProfileNavbar />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container className={classes.container}>
					<Grid container spacing={3}>
						<Link to={'/addProperty'} className={classes.linkButton} target="_blank">
							<Button className={classes.maxWidthCustom} variant="outlined">Ajouter une Propriété</Button>
						</Link>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs={12} md={8} className={classes.leftColumn}>
							<Paper className={fixedHeightPaper}>
								<Typography>Résultats de recherche</Typography>
								<Grid container spacing={3}>
									{isLoading ? <div className={classes.centerText}><CircularProgress /></div> :
										Object.keys(properties.property).map((item) =>
											<Grid item xs={12} md={6} key={properties.property[item]["idProperty"]}>
												<Card>
													<CardActionArea>
														<CardMedia
															component="img"
															alt={properties.property[item]["parameters"][1]["valueParameter"] +
																" - " + properties.property[item]["parameters"][4]["valueParameter"] + " - " +
																properties.property[item]["parameters"][3]["valueParameter"] + " Pièces"}
															height="140"
															image={properties.property[item]["parameters"][8]["valueParameter"]}
															title={properties.property[item]["parameters"][1]["valueParameter"] +
																" - " + properties.property[item]["parameters"][4]["valueParameter"] + " - " +
																properties.property[item]["parameters"][3]["valueParameter"] + " Pièces"}
														/>
														<CardContent>
															<Grid container spacing={1}>
																<Grid item md={9} xs={12} className={classes.leftText}>
																	{properties.property[item]["parameters"][1]["valueParameter"] +
																		" " + properties.property[item]["parameters"][3]["valueParameter"] +
																		" Pièces - " + properties.property[item]["parameters"][2]["valueParameter"]}
																</Grid>
																<Grid item md={3} xs={12} className={classes.rightText}>
																	{properties.property[item]["parameters"][0]["valueParameter"] + " €"}
																</Grid>
																<Grid item xs={12}>
																	{properties.property[item]["parameters"][4]["valueParameter"]}
																</Grid>
															</Grid>
														</CardContent>
													</CardActionArea>
													<CardActions>
														<Link to={`/modifyProperty/${properties.property[item]["idProperty"]}`} className={classes.linkButton} target="_blank">
															<Button className={classes.maxWidthCustom} variant="outlined">Gestion de la Propriété</Button>
														</Link>
													</CardActions>
												</Card>
											</Grid>
										)
									}
								</Grid>
							</Paper>
						</Grid>
						<Grid item xs={12} md={4} className={classes.rightColumn}>
							<Paper className={fixedHeightPaper}>
								<Typography>Tags</Typography>
								<form onSubmit={handleSubmit} className={classes.maxWidthCustom}>
									<Grid container spacing={3} className={classes.justifyContent}>
										<Grid item xs={11}>
											<Typography id="discrete-slider-always" gutterBottom>
												Budget Maximum
											</Typography>
											<Slider
												defaultValue={50000}
												aria-labelledby="discrete-slider-always"
												step={10000}
												marks={marks}
												min={50000}
												max={800000}
												onChange={handleChangePriceProperties}
												valueLabelDisplay="auto"
											/>
										</Grid>
										<Grid item xs={12}>
											<FormLabel component="legend">Type de Biens :</FormLabel>
											<RadioGroup row aria-label="typeProperties" name="typeProperties" value={typeProperties} onChange={handleChangeTypeProperties}>
												<FormControlLabel value="Maison" control={<Radio />} label="Maison" />
												<FormControlLabel value="Appartement" control={<Radio />} label="Appartement" />
												<FormControlLabel value="Terrain" control={<Radio />} label="Terrain" />
												<FormControlLabel value="Commerce" control={<Radio />} label="Commerce" />
											</RadioGroup>
										</Grid>
										<Grid item xs={12}>
											<FormLabel component="legend">Orientation :</FormLabel>
											<RadioGroup row aria-label="orientation" name="orientation" value={orientation} onChange={handleOrientation}>
												<FormControlLabel value="Nord" control={<Radio />} label="Nord" />
												<FormControlLabel value="Sud" control={<Radio />} label="Sud" />
												<FormControlLabel value="Est" control={<Radio />} label="Est" />
												<FormControlLabel value="Ouest" control={<Radio />} label="Ouest" />
											</RadioGroup>
										</Grid>
										<Grid item xs={12}>
											<TextField
												label="Combien de pièces ?"
												variant="outlined"
												fullWidth
												InputLabelProps={{
													shrink: true,
												}}
												type='text'
												name='piecesProperty'
												value={pieceProperties}
												onChange={handleChangePieceProperties}
											/>
										</Grid>
										<Grid item xs={12}>
											<InputLabel id="labelAddonsProperties">Spécificités à ajouter</InputLabel>
											<Select
												labelId="labelAddonsProperties"
												id="selectAddonsProperties"
												fullWidth
												multiple
												value={addonsProperties}
												onChange={handleChangeAddonsProperties}
												input={<Input id="select-multiple-chip" />}
												MenuProps={MenuProps}
												ref={ref}
											>
												{namesAddonsProperties.map((name) => (
													<MenuItem key={name} value={name}>
														{name}
													</MenuItem>
												))}
											</Select>
										</Grid>
										<Grid item xs={12} md={6}>
											<Button
												variant="outlined"
												type="submit"
												className={classes.maxWidthCustom}
											>
												Filtrer
											</Button>
										</Grid>
										<Grid item xs={12} md={6}>
											<Button
												variant="outlined"
												type="button"
												className={classes.maxWidthCustom}
												onClick={() => window.location.reload()}
											>
												Réinitialiser
											</Button>
										</Grid>
									</Grid>
								</form>
							</Paper>
						</Grid>
					</Grid>
				</Container>
			</main>
		</div>
	)
};