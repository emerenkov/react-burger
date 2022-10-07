import {
    GET_ALL_INGREDIENTS_SUCCESS,
    GET_ALL_INGREDIENTS_REQUEST,
    GET_ALL_INGREDIENTS_FAILED,
    GET_TAB,
} from "../actions/allIngredients";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    tab: 'bun'
}

export const burgerIngredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
            }
        }
        case GET_ALL_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                ingredientsRequest: false,
                ingredientsFailed: false,
            }
        }
        case GET_ALL_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
            }
        }
        case GET_TAB: {
            return {
                ...state,
                tab: action.tab,
            }
        }
        default:
            return state;
    }
}