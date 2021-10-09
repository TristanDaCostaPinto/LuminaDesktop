import { LIST_USERS_SUCCESS } from '../actions/types';

const initialState = {
    users: [],
    loading: true,
}

export default function ListUsers(state = initialState, action) {
    switch (action.type) {
        case LIST_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        default: return state
    }
}