import {getData} from "../../utils/api";
import { TIngredient, AppThunk, AppDispatch } from '../../utils/types';

export const GET_ALL_INGREDIENTS_REQUEST: 'GET_ALL_INGREDIENTS_REQUEST' = 'GET_ALL_INGREDIENTS_REQUEST';
export const GET_ALL_INGREDIENTS_SUCCESS: 'GET_ALL_INGREDIENTS_SUCCESS' = 'GET_ALL_INGREDIENTS_SUCCESS';
export const GET_ALL_INGREDIENTS_FAILED: 'GET_ALL_INGREDIENTS_FAILED' = 'GET_ALL_INGREDIENTS_FAILED';
export const GET_TAB: 'GET_TUB' = 'GET_TUB';

export type TGetIngredientsActions =
    IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsErrorAction
    | IGetCurrentTabAction;

export interface IGetIngredientsRequestAction {
    type: typeof GET_ALL_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessAction {
    type: typeof GET_ALL_INGREDIENTS_SUCCESS;
    ingredients: Array<TIngredient>
}
export interface IGetIngredientsErrorAction {
    type: typeof GET_ALL_INGREDIENTS_FAILED;
}
export interface IGetCurrentTabAction {
    type: typeof GET_TAB;
    tab: string
}

export const getIngredients: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ALL_INGREDIENTS_REQUEST,
        });
        getData()
            .then((res) => {
                dispatch({
                    type: GET_ALL_INGREDIENTS_SUCCESS,
                    ingredients: res.data,
                });
            })
            .catch((err) => {
                dispatch({
                    type: GET_ALL_INGREDIENTS_FAILED,
                })
                console.log(err)
            });
    };
}
