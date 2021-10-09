import { LIST_AGENCY_SUCCESS } from "../actions/types";

const initialState = {
    agency: [],
    loading: true,
}

export default function ListAgencies(state = initialState, action) {
    switch (action.type) {
        case LIST_AGENCY_SUCCESS:
            return {
                ...state,
                agency: action.payload,
                loading: false
            }
        default: return state
    }
}