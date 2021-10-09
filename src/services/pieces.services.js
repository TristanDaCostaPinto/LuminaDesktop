import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://www.share-your-universe.com/public/api/v1/';

export const postPiece = (pieceName, pieceSurface, pieceExposure, idProperty) => {
    return axios.post(API_URL + 'property/' + idProperty , {
        pieceName, 
        pieceSurface, 
        pieceExposure
    }, { headers: authHeader() })
        .catch(err => console.log(err.response));
}

export const updateSinglePiece = (idProperty, idPiece, infosPiece) => {
    return axios.put(API_URL + 'property/' + idProperty + "/" + idPiece, infosPiece, { headers: authHeader() })
        .catch(err => console.log(err.response));
}

export const deleteSinglePiece = (idProperty, idPiece) => {
    return axios.delete(API_URL + "property/" + idProperty + "/" + idPiece, { headers: authHeader() })
        .catch(err => console.log(err.response));
}