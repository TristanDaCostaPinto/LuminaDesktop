import {
    ADD_AGENCY_SUCCESS,
    ADD_AGENCY_FAIL,
    MODIFY_AGENCY_SUCCESS,
    MODIFY_AGENCY_FAIL,
    LIST_AGENCY_SUCCESS,
    LIST_AGENCY_FAIL,
    DELETE_AGENCY_FAIL,
    DELETE_AGENCY_SUCCESS,
    SET_MESSAGE,
} from './types';

import { postAgency, getAllAgencies, updateSingleAgency, deleteSingleAgency } from '../services/agency.services';

export const addAgency = (agencyName, agencyAdr, agencyPhone, agencyContact) => (dispatch) => {
    return postAgency(agencyName, agencyAdr, agencyPhone, agencyContact).then(
        (response) => {
            dispatch({
                type: ADD_AGENCY_SUCCESS,
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
                type: ADD_AGENCY_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const updateAgency = (idAgency, infosAgency) => (dispatch) => {
    return updateSingleAgency(idAgency, infosAgency).then(
        (response) => {
            dispatch({
                type: MODIFY_AGENCY_SUCCESS,
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
                type: MODIFY_AGENCY_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const listAgencies = () => (dispatch) => {
    return getAllAgencies().then(
        (response) => {
            dispatch({
                type: LIST_AGENCY_SUCCESS,
                payload: response.data.agency,
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
                type: LIST_AGENCY_FAIL,
                payload: message,
            });
            
            return Promise.reject();
        }
    );
}

export const deleteAgency = (idAgency) => (dispatch) => {
    return deleteSingleAgency(idAgency).then(
        (response) => {
            dispatch({
                type: DELETE_AGENCY_SUCCESS,
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
                type: DELETE_AGENCY_FAIL,
                payload: message,
            });
            
            return Promise.reject();
        }
    )
}