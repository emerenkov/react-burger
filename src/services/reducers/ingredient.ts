import { TIngredient } from '../../utils/types';
import {
    CLOSE_WINDOW_INGREDIENT,
    OPEN_WINDOW_INGREDIENT,
    TIngredientModalActions,
} from "../actions/ingredient";

type TInitialState = {
    openDetailsModal: TIngredient | string | null;
}

const initialState: TInitialState = {
    openDetailsModal: null,
}

export const ingredientReducer = (state = initialState, action: TIngredientModalActions): TInitialState => {
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