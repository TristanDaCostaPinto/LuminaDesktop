import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://www.share-your-universe.com/public/api/v1/';

export const postAgency = (agencyName, agencyAdr, agencyPhone, agencyContact) => {
    return axios.post(API_URL + 'agency', {
        agencyName, 
        agencyAdr, 
        agencyPhone, 
        agencyContact
    }, { headers: authHeader() })
        .catch(err => console.log(err.response));
}

export const getAllAgencies = () => {
    return axios.get(API_URL + "agencies")
        .catch(err => console.log(err.response));
}

export const updateSingleAgency = (idAgency, infoAgency) => {
    return axios.put(API_URL + 'agency/' + idAgency, infoAgency, { headers: authHeader() })
        .catch(err => console.log(err.response));
}

export const deleteSingleAgency = (idAgency) => {
    return axios.delete(API_URL + "agency/" + idAgency, { headers: authHeader() })
        .catch(err => console.log(err.response));
}