import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
} from '@material-ui/core';
import { deleteAppointment } from '../actions/appointment';


export default function DeleteAppointment({ sendIdAppointment }) {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (idAppointment) => {
        dispatch(deleteAppointment(idAppointment)).then(() => {
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
                Supprimer le RDV
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">{"Voulez-vous supprimer le rendez-vous ?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={() => handleSubmit(sendIdAppointment)} color="primary" autoFocus>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
