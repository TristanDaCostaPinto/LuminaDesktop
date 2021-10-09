import { LIST_APPOINTMENT_SUCCESS } from "../actions/types";

const initialState = {
    appointment: [],
    loading: true,
}

export default function ListAppointment(state = initialState, action) {
    switch (action.type) {
        case LIST_APPOINTMENT_SUCCESS:
            return {
                ...state,
                appointment: action.payload,
                loading: false
            }
        default: return state
    }
}