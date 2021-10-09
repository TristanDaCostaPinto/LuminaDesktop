import {
    ADD_PIECE_SUCCESS,
    ADD_PIECE_FAIL,
    MODIFY_PIECE_SUCCESS,
    MODIFY_PIECE_FAIL,
    DELETE_PIECE_SUCCESS,
    DELETE_PIECE_FAIL,
    SET_MESSAGE,
} from './types';

import { postPiece, updateSinglePiece, deleteSinglePiece } from '../services/pieces.services';

export const addPiece = (pieceName, pieceSurface, pieceExposure, idProperty) => (dispatch) => {
    return postPiece(pieceName, pieceSurface, pieceExposure, idProperty).then(
        (response) => {
            dispatch({
                type: ADD_PIECE_SUCCESS,
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
                type: ADD_PIECE_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const updatePiece = (idProperty, idPiece, infosPiece) => (dispatch) => {
    return updateSinglePiece(idProperty, idPiece, infosPiece).then(
        (response) => {
            dispatch({
                type: MODIFY_PIECE_SUCCESS,
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
                type: MODIFY_PIECE_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const deletePiece = (idProperty, idPiece) => (dispatch) => {
    return deleteSinglePiece(idProperty, idPiece).then(
        (response) => {
            dispatch({
                type: DELETE_PIECE_SUCCESS,
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
                type: DELETE_PIECE_FAIL,
                payload: message,
            });
            
            return Promise.reject();
        }
    )
}