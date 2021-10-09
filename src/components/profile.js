import React, { useEffect, useState } from "react";
import clsx from 'clsx';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

import ProfileNavbar from '../addons/profileNavbar';
import {
    makeStyles,
    Avatar,
    CssBaseline,
    Typography,
    Container,
    Grid,
    Paper,
    CircularProgress
} from '@material-ui/core';

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
    largeAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    userInfos: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 25,
        paddingBottom: 25,
        alignItems: 'center',
    },
    userInfo: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    heightCardContent: {
        height: '100px',
        [theme.breakpoints.down('sm')]: {
            height: '180px',
        },
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
    }
}));

const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [infoUser, setInfoUser] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        return axios.get(`http://www.share-your-universe.com/public/api/v1/user/${currentUser.user.idUser}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${currentUser.token}`,
            }
        }).then((response) => {
            setInfoUser(response.data);
            setLoading(false);
        }).catch(err => console.log(err.response));
    }, [currentUser.user.idUser, currentUser.token])

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
                        {/* Recent Documents Added */}
                        <Grid item xs={12} md={9} className={classes.leftColumn}>
                            <Paper className={fixedHeightPaper}>
                                <span>Bonjour</span>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3} className={classes.rightColumn}>
                            <Paper className={fixedHeightPaper}>
                                {isLoading ? <div className="App"><CircularProgress /></div> :
                                    <div className={classes.userInfos}>
                                        <Avatar>{infoUser.user.userLastname.charAt(0) + infoUser.user.userFirstname.charAt(0)}</Avatar>
                                        <Typography className={classes.userInfo}>
                                            {infoUser.user.userLastname + ' ' + infoUser.user.userFirstname}
                                        </Typography>
                                    </div>
                                }
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    )
}

export default Profile;