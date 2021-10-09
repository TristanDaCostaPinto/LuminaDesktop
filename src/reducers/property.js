import { LIST_PROPERTY_SUCCESS } from "../actions/types";

const initialState = {
    property: [],
    loading: true,
}

export default function ListProperties(state = initialState, action) {
    switch (action.type) {
        case LIST_PROPERTY_SUCCESS:
            return {
                ...state,
                property: action.payload,
                loading: false
            }
        default: return state
    }
}