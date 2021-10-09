import {
    INFO_USER_FAIL,
    INFO_USER_SUCCESS,
    LIST_USERS_SUCCESS,
    LIST_USERS_FAIL,
    SET_MESSAGE,
} from './types';

import { getAllUsers, updateInfoUser } from '../services/user.service';

export const listUsers = () => (dispatch) => {
    return getAllUsers().then(
        (response) => {
            dispatch({
                type: LIST_USERS_SUCCESS,
                payload: response.data.users,
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
                    type: LIST_USERS_FAIL,
                    payload: message,
                });

                return Promise.reject();
        }
    )
}

export const updateUserInfo = (idUser, infoUser) => (dispatch) => {
    return updateInfoUser(idUser, infoUser).then(
        (response) => {
            dispatch({
                type: INFO_USER_SUCCESS,
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
                    type: INFO_USER_FAIL,
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });

                return Promise.reject();
        }
    );
};
