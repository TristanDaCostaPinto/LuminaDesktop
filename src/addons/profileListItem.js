import React from 'react';
import { Link } from 'react-router-dom';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import Home from '@material-ui/icons/Home'

export const mainListItem = (
    <div>
        <Link to="/profile" style={{ textDecoration: 'none' }}>
            <ListItem>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText style={{ color: "#47A8BD" }} primary="Dashboard" />
            </ListItem>
        </Link>

        <Link to="/appointment" style={{ textDecoration: 'none' }}>
            <ListItem>
                <ListItemIcon>
                    <EventIcon />
                </ListItemIcon>
                <ListItemText style={{ color: "#47A8BD" }} primary="Gestion des Rendez-Vous" />
            </ListItem>
        </Link>

        <Link to="/agencies" style={{ textDecoration: 'none' }}>
            <ListItem>
                <ListItemIcon>
                    <HomeWorkIcon />
                </ListItemIcon>
                <ListItemText style={{ color: "#47A8BD" }} primary="Gestion des Agences" />
            </ListItem>
        </Link>

        <Link to="/properties" style={{ textDecoration: 'none' }}>
            <ListItem>
                <ListItemIcon>
                    <Home />
                </ListItemIcon>
                <ListItemText style={{ color: "#47A8BD" }} primary="Gestion des Propriétés" />
            </ListItem>
        </Link>

        <Link to="/settings" style={{ textDecoration: 'none' }}>
            <ListItem>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText style={{ color: "#47A8BD" }} primary="Paramètres" />
            </ListItem>
        </Link>
    </div>
);