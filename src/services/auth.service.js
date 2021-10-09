import axios from 'axios';

const API_URL = "http://www.share-your-universe.com/public/api/v1/";

export const registerUser = (userLastname, userFirstname, userEmail, userDob, userPhone, userAdr, userPassword) => {
    return axios.post(API_URL + 'signup', {
        userLastname, 
        userFirstname, 
        userEmail, 
        userDob, 
        userPhone, 
        userAdr, 
        userPassword, 
        idRole: '1',
        idAgency : '1'
    })
    .catch(err => console.log(err.response));
}

export const loginUser = (userEmail, userPassword) => {
    return axios.post(API_URL + 'login', {
        userEmail,
        userPassword,
    }).then((response) => {
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
    })
}

export const logoutUser = () => {
    localStorage.removeItem('user');
}