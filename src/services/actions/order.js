import {setData} from "../../utils/api";


export const CLOSE_WINDOW_ORDER = 'CLOSE_WINDOW_ORDER';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function closeWindowOrder () {
    return {
        type: CLOSE_WINDOW_ORDER
    };
}

export function getOrder () {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        setData() // order need add
            .then((res) => {
            dispatch({
                type: GET_ORDER_SUCCESS,
                orderNumber: res.number, // order need add
            });
        })
            .catch((err) => {
                dispatch({
                    type: GET_ORDER_FAILED
                });
                console.log(err);
            })
    }
}