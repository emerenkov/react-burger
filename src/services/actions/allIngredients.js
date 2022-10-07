import {getData} from "../../utils/api";

export const GET_ALL_INGREDIENTS_REQUEST = 'GET_ALL_INGREDIENTS_REQUEST';
export const GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS';
export const GET_ALL_INGREDIENTS_FAILED = 'GET_ALL_INGREDIENTS_FAILED';
export const GET_TAB = 'GET_TUB';

export function getAllIngredients () {
    return function (dispatch) {
        dispatch({
            type: GET_ALL_INGREDIENTS_REQUEST
        });
        getData()
            .then(res => {
                dispatch({
                    type: GET_ALL_INGREDIENTS_SUCCESS,
                    ingredients: res.data,
                });
            })
            .catch(err => {
                dispatch({
                    type: GET_ALL_INGREDIENTS_FAILED,
                });
                console.log(err);
            })
    }
}