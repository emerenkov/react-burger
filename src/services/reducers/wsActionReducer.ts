import {TOrderDetails} from "../../utils/types";
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    TWsActions,
} from '../actions/wsAction';

type TInitialState = {
    wsConnected: boolean;
    orders: TOrderDetails[];
    total: number | null;
    totalToday: number | null;
}

const initialState: TInitialState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0
};

export const wsReducer = (state = initialState, action: TWsActions): TInitialState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            };

        case WS_GET_MESSAGE:
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday
            };
        default:
            return state;
    }
}
