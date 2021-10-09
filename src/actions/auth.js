import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from './types';

import { registerUser, loginUser, logoutUser } from '../services/auth.service';

export const register = (userLastname, userFirstname, userEmail, userDob, userPhone, userAdr, userPassword) => (dispatch) => {
    return registerUser(userLastname, userFirstname, userEmail, userDob, userPhone, userAdr, userPassword).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
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
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const login = (userEmail, password) => (dispatch) => {
    return loginUser(userEmail, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data },
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
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    logoutUser();

    dispatch({
        type: LOGOUT,
    });
};