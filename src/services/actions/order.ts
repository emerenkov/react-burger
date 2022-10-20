import {setData} from "../../utils/api";
import { AppThunk, AppDispatch } from '../../utils/types';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const CLOSE_ORDER_MODAL: 'CLOSE_ORDER_MODAL' = 'CLOSE_ORDER_MODAL';

export type TGetOrderActions =
    IGetOrderRequestAction
    | IGetOrderSuccessAction
    | IGetOrderFailedAction
    | ICloseOrderModalAction;

export interface IGetOrderRequestAction {
    type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccessAction {
    type: typeof GET_ORDER_SUCCESS;
    orderNumber: number
}
export interface IGetOrderFailedAction {
    type: typeof GET_ORDER_FAILED;
}
export interface ICloseOrderModalAction {
    type: typeof CLOSE_ORDER_MODAL;
}
export const closeOrderModal = (): ICloseOrderModalAction => ({
    type: CLOSE_ORDER_MODAL,
});

export const getOrder: AppThunk = (order: Array<string>) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        setData(order)
            .then((res) => {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    orderNumber: res.order.number,
                });
            })
            .catch((err) => {
                dispatch({
                    type: GET_ORDER_FAILED,
                })
                console.log(err)
            })
    };
}
