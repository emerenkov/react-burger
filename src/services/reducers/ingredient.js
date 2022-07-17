import {
    CLOSE_WINDOW_INGREDIENT,
    OPEN_WINDOW_INGREDIENT
} from "../actions/ingredient";

const initialState = {
    openDetailsModal: null,
}

export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_WINDOW_INGREDIENT:
            return {
                ...state,
                openDetailsModal: action.payload,
            }
        case CLOSE_WINDOW_INGREDIENT:
            return {
                ...state,
                openDetailsModal: null,
            }
        default:
            return state;
    }
}