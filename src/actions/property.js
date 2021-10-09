import {
    ADD_PROPERTY_SUCCESS,
    ADD_PROPERTY_FAIL,
    MODIFY_PROPERTY_SUCCESS,
    MODIFY_PROPERTY_FAIL,
    LIST_PROPERTY_SUCCESS,
    LIST_PROPERTY_FAIL,
    DELETE_PROPERTY_SUCCESS,
    DELETE_PROPERTY_FAIL,
    SET_MESSAGE,
} from './types';

import { postProperty, getAllProperties, updateSingleProperty, deleteSingleProperty } from '../services/property.services';

export const addProperty = (propertyStatus, idUser, propertyParameters) => (dispatch) => {
    return postProperty(propertyStatus, idUser, propertyParameters).then(
        (response) => {
            dispatch({
                type: ADD_PROPERTY_SUCCESS,
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
                type: ADD_PROPERTY_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const updateProperty = (idProperty, propertyStatus, idUser, propertyParameters) => (dispatch) => {
    return updateSingleProperty(idProperty, propertyStatus, idUser, propertyParameters).then(
        (response) => {
            dispatch({
                type: MODIFY_PROPERTY_SUCCESS,
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
                type: MODIFY_PROPERTY_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const listProperties = () => (dispatch) => {
    return getAllProperties().then(
        (response) => {
            dispatch({
                type: LIST_PROPERTY_SUCCESS,
                payload: response.data.property,
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
                type: LIST_PROPERTY_FAIL,
                payload: message,
            });
            
            return Promise.reject();
        }
    );
}

export const deleteProperty = (idProperty) => (dispatch) => {
    return deleteSingleProperty(idProperty).then(
        (response) => {
            dispatch({
                type: DELETE_PROPERTY_SUCCESS,
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
                type: DELETE_PROPERTY_FAIL,
                payload: message,
            });
            
            return Promise.reject();
        }
    )
}