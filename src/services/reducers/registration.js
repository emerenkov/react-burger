import {
    AUTHORIZATION_REQUEST,
    AUTHORIZATION_SUCCESS,
    AUTHORIZATION_FAILED,

    DATA_USER_REQUEST,
    DATA_USER_SUCCESS,
    DATA_USER_FAILED,

    UPDATE_DATA_USER_REQUEST,
    UPDATE_DATA_USER_SUCCESS,
    UPDATE_DATA_USER_FAILED,

    REGISTRATION_USER_REQUEST,
    REGISTRATION_USER_SUCCESS,
    REGISTRATION_USER_FAILED,

    UPDATE_USER_TOKEN_REQUEST,
    UPDATE_USER_TOKEN_SUCCESS,
    UPDATE_USER_TOKEN_FAILED,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,

    REQUEST_PASSWORD_REQUEST,
    REQUEST_PASSWORD_SUCCESS,
    REQUEST_PASSWORD_FAILED,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
} from "../actions/registration";

const initialState = {
    user: null,

    authRequest: false,
    authSuccess: false,
    authFailed: false,

    dataUserRequest: false,
    dataUserSuccess: false,
    dataUserFailed: false,

    updateUserRequest: false,
    updateUserSuccess: false,
    updateUserFailed: false,

    getTokenRequest: false,
    getTokenSuccess: false,
    getTokenFailed: false,

    logoutRequest: false,
    logoutSuccess: false,
    logoutFailed: false,

    registrationNewUserRequest: false,
    registrationNewUserSuccess: false,
    registrationNewUserFailed: false,

    forgotPasswordRequest: false,
    forgotPasswordSuccess: false,
    forgotPasswordFailed: false,

    resetPasswordRequest: false,
    resetPasswordSuccess: false,
    resetPasswordFailed: false,

};

export const registration = (state = initialState, action) => {
    switch (action.type) {
        case AUTHORIZATION_REQUEST:
            return {
                ...state,
                authRequest: true
            };
        case AUTHORIZATION_SUCCESS:
            return {
                ...state,
                authRequest: false,
                authSuccess: true,
                user: action.payload,
            };
        case AUTHORIZATION_FAILED:
            return {
                ...state,
                authRequest: false,
                authSuccess: false,
                authFailed: true
            };

        case DATA_USER_REQUEST:
            return {
                ...state,
                dataUserRequest: true
            };
        case DATA_USER_SUCCESS:
            return {
                ...state,
                dataUserRequest: false,
                dataUserSuccess: true,
                user: action.payload,
            };
        case DATA_USER_FAILED:
            return {
                ...state,
                dataUserRequest: false,
                dataUserSuccess: false,
                dataUserFailed: true,
            };

        case LOGOUT_REQUEST:
            return {
                ...state,
                logoutRequest: true
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                logoutRequest: false,
                logoutSuccess: true,
            };
        case LOGOUT_FAILED:
            return {
                ...state,
                dataUserSuccess: false,
                logoutFailed: true,
                logoutRequest: false
            };

        case UPDATE_DATA_USER_REQUEST:
            return {
                ...state,
                updateUserRequest: true
            };
        case UPDATE_DATA_USER_SUCCESS:
            return {
                ...state,
                updateUserRequest: false,
                updateUserSuccess: true,
                user: action.payload,
            };
        case UPDATE_DATA_USER_FAILED:
            return {
                ...state,
                updateUserRequest: false,
                updateUserSuccess: false,
                updateUserFailed: true,
            };

        case REGISTRATION_USER_REQUEST:
            return {
                ...state,
                registrationNewUserRequest: true
            };
        case REGISTRATION_USER_SUCCESS:
            return {
                ...state,
                registrationNewUserRequest: false,
                registrationNewUserSuccess: true,
                user: action.payload,
            };
        case REGISTRATION_USER_FAILED:
            return {
                ...state,
                registrationNewUserSuccess: false,
                registrationNewUserRequest: false,
                registrationNewUserFailed: true
            };

        case UPDATE_USER_TOKEN_REQUEST:
            return {
                ...state,
                getTokenRequest: true
            };
        case UPDATE_USER_TOKEN_SUCCESS:
            return {
                ...state,
                getTokenRequest: false,
                getTokenSuccess: true,
            };
        case UPDATE_USER_TOKEN_FAILED:
            return {
                ...state,
                getTokenRequest: false,
                getTokenSuccess: false,
                getTokenFailed: true,
            };

        case REQUEST_PASSWORD_REQUEST:
            return {
                ...state,
                forgotPasswordRequest: true,
            };
        case REQUEST_PASSWORD_SUCCESS:
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordSuccess: true,
            };
        case REQUEST_PASSWORD_FAILED:
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordSuccess: false,
                forgotPasswordFailed: true
            };

        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                resetPasswordRequest: true,
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordSuccess: true,
            };
        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordSuccess: false,
                resetPasswordFailed: true
            };
        default:
            console.log(state);
            return state;
    }
}