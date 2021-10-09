import {
    ADD_APPOINTMENT_SUCCESS,
    ADD_APPOINTMENT_FAIL,
    MODIFY_APPOINTMENT_SUCCESS,
    MODIFY_APPOINTMENT_FAIL,
    LIST_APPOINTMENT_SUCCESS,
    LIST_APPOINTMENT_FAIL,
    DELETE_APPOINTMENT_SUCCESS,
    DELETE_APPOINTMENT_FAIL,
    SET_MESSAGE,
} from './types';

import { postAppointment, putAppointment, getAppointment, deleteSingleAppointment } from '../services/appointment.service';

export const addAppointment = (appointmentDate, appointmentMotif, appointmentType, appointmentAgent, idUser) => (dispatch) => {
    return postAppointment(appointmentDate, appointmentMotif, appointmentType, appointmentAgent, idUser).then(
        (response) => {
            dispatch({
                type: ADD_APPOINTMENT_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: ADD_APPOINTMENT_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const modifyAppointment = (idAppointment, infosAppointment) => (dispatch) => {
    return putAppointment(idAppointment, infosAppointment).then(
        (response) => {
            dispatch({
                type: MODIFY_APPOINTMENT_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: MODIFY_APPOINTMENT_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const listAppointment = () => (dispatch) => {
    return getAppointment().then(
        (response) => {
            dispatch({
                type: LIST_APPOINTMENT_SUCCESS,
                payload: response.data.appointment,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: LIST_APPOINTMENT_FAIL,
                payload: message,
            });
            
            return Promise.reject();
        }
    );
}

export const deleteAppointment = (idAppointment) => (dispatch) => {
    return deleteSingleAppointment(idAppointment).then(
        (response) => {
            dispatch({
                type: DELETE_APPOINTMENT_SUCCESS,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: DELETE_APPOINTMENT_FAIL,
                payload: message,
            });
            
            return Promise.reject();
        }
    )
}
