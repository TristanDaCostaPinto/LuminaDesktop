import { combineReducers } from 'redux';
import auth from './auth';
import ListAppointment from './appointment';
import ListAgencies from './agency';
import ListProperties from './property';
import message from './message';

export default combineReducers({
    auth,
    ListAppointment,
    ListAgencies,
    ListProperties,
    message,
});