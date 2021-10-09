import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://www.share-your-universe.com/public/api/v1/appointment';

export const postAppointment = (appointmentDate, appointmentMotif, appointmentType, appointmentAgent, idUser) => {
    return axios.post(API_URL, {
        appointmentDate, 
        appointmentMotif, 
        appointmentType, 
        appointmentAgent,
        idUser,
    }, { headers: authHeader() })
    .catch(err => console.log(err.response));
}

export const getAppointment = () => {
    return axios.get('http://www.share-your-universe.com/public/api/v1/appointments', { headers: authHeader() })
    .catch(err => console.log(err.response));
}

export const putAppointment = (idAppointment, infosAppointment) => {
    return axios.put(API_URL + '/' + idAppointment, infosAppointment, { headers:  authHeader() })
    .catch(err => console.log(err.response));
}

export const deleteSingleAppointment = (idAppointment) => {
    return axios.delete(API_URL + "/" + idAppointment, { headers: authHeader() })
        .catch(err => console.log(err.response));
}