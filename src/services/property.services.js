import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://www.share-your-universe.com/public/api/v1/';

export const postProperty = (propertyStatus, idUser, propertyParameters) => {
    return axios.post(API_URL + 'property', {
        propertyStatus,
        idUser,
        propertyParameters,
    }, { headers: authHeader() })
        .catch(err => console.log(err.response));
}

export const getAllProperties = () => {
    return axios.get(API_URL + "properties", { headers: authHeader() })
        .catch(err => console.log(err.response));
}

export const updateSingleProperty = (idProperty, propertyStatus, idUser, propertyParameters) => {
    return axios.put(API_URL + 'property/' + idProperty, {
        propertyStatus,
        idUser,
        propertyParameters,
    }, { headers: authHeader() })
        .catch(err => console.log(err.response));
}

export const deleteSingleProperty = (idProperty) => {
    return axios.delete(API_URL + "property/" + idProperty, { headers: authHeader() })
        .catch(err => console.log(err.response));
}