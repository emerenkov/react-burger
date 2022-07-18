import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    CLOSE_WINDOW_ORDER,
} from '../actions/order' ;

const initialOrderState = {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false,
};

export const orderReducer = (state = initialOrderState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.orderNumber,
                orderRequest: false,
                orderFailed: false,
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true,
            };
        }

        case CLOSE_WINDOW_ORDER: {
            return {
                ...state,
                orderNumber: null,

            };
        }
        default:
            return state
    }
};