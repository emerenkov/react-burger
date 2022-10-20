import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    CLOSE_ORDER_MODAL,
    TGetOrderActions,
} from '../actions/order' ;

type TInitialState = {
    orderNumber: number | null;
    orderRequest: boolean;
    orderFailed: boolean;
}

const initialState: TInitialState = {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false,
};

export const orderReducer = (state = initialState, action: TGetOrderActions): TInitialState => {
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

        case CLOSE_ORDER_MODAL: {
            return {
                ...state,
                orderNumber: null,

            };
        }
        default:
            return state
    }
};