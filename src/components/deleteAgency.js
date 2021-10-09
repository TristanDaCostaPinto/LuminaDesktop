import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
} from '@material-ui/core';
import { deleteAgency } from '../actions/agency';

export default function DeleteAgency({ sendIdAgency }) {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (idAgency) => {
        dispatch(deleteAgency(idAgency)).then(() => {
            window.location.reload();
        }).catch(err => console.log(err.response))
        setOpen(false);
    }

    if (!currentUser) {
        return <Redirect to='/' />;
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Supprimer l'agence
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">{"Voulez-vous supprimer l'agence ?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={() => handleSubmit(sendIdAgency)} color="primary" autoFocus>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
