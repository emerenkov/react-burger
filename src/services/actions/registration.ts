import {
    authorization,
    dataUser,
    logout, newToken,
    registrationUser,
    requestPassword,
    resetPassword,
    updateUser
} from "../../utils/api";

import {deleteCookie, getCookie, setCookie} from '../../utils/cookie';
import { AppThunk, AppDispatch } from '../../utils/types';
import { TUser } from '../../utils/types';

export const AUTHORIZATION_REQUEST: "AUTHORIZATION_REQUEST" = "AUTHORIZATION_REQUEST";  //авторизация
export const AUTHORIZATION_SUCCESS: "AUTHORIZATION_SUCCESS" = "AUTHORIZATION_SUCCESS";
export const AUTHORIZATION_FAILED: "AUTHORIZATION_FAILED" = "AUTHORIZATION_FAILED";

export const REGISTRATION_USER_REQUEST: "REGISTRATION_USER_REQUEST" = "REGISTRATION_USER_REQUEST";  //регистрация
export const REGISTRATION_USER_SUCCESS: "REGISTRATION_USER_SUCCESS" = "REGISTRATION_USER_SUCCESS";
export const REGISTRATION_USER_FAILED: "REGISTRATION_USER_FAILED" = "REGISTRATION_USER_FAILED";

export const DATA_USER_REQUEST: "DATA_USER_REQUEST" = "DATA_USER_REQUEST";  //получение данных пользователя
export const DATA_USER_SUCCESS: "DATA_USER_SUCCESS" = "DATA_USER_SUCCESS";
export const DATA_USER_FAILED: "DATA_USER_FAILED" = "DATA_USER_FAILED";

export const UPDATE_DATA_USER_REQUEST: "UPDATE_DATA_USER_REQUEST" = "UPDATE_DATA_USER_REQUEST";  //обновление данных пользователя
export const UPDATE_DATA_USER_SUCCESS: "UPDATE_DATA_USER_SUCCESS" = "UPDATE_DATA_USER_SUCCESS";
export const UPDATE_DATA_USER_FAILED: "UPDATE_DATA_USER_FAILED" = "UPDATE_DATA_USER_FAILED";

export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";  //выход
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";

export const REQUEST_PASSWORD_REQUEST: "REQUEST_PASSWORD_REQUEST" = "REQUEST_PASSWORD_REQUEST"; //восстановить пароль
export const REQUEST_PASSWORD_SUCCESS: "REQUEST_PASSWORD_SUCCESS" = "REQUEST_PASSWORD_SUCCESS";
export const REQUEST_PASSWORD_FAILED: "REQUEST_PASSWORD_FAILED" = "REQUEST_PASSWORD_FAILED";

export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" = "RESET_PASSWORD_REQUEST";   //новый пароль
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" = "RESET_PASSWORD_FAILED";

export const UPDATE_USER_TOKEN_REQUEST: "UPDATE_USER_TOKEN_REQUEST" = "UPDATE_USER_TOKEN_REQUEST";
export const UPDATE_USER_TOKEN_SUCCESS: "UPDATE_USER_TOKEN_SUCCESS" = "UPDATE_USER_TOKEN_SUCCESS";
export const UPDATE_USER_TOKEN_FAILED: "UPDATE_USER_TOKEN_FAILED" = "UPDATE_USER_TOKEN_FAILED";

export const AUTH_CHECKED: 'AUTH_CHECKED' = 'AUTH_CHECKED';
export const CHECK_AUTH_CHECKED: 'CHECK_AUTH_CHECKED' = 'CHECK_AUTH_CHECKED';

// Объединяем в Union
export type TUserActions =
    IAuthorizationRequestAction
    | IAuthorizationSuccessAction
    | IAuthorizationFailedAction
    | IRegistrationRequestAction
    | IRegistrationSuccessAction
    | IRegistrationFailedAction
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailedAction
    | IUpdateUserRequestAction
    | IUpdateUserSuccessAction
    | IUpdateUserFailedAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutFailedAction
    | IRestorePasswordRequestAction
    | IRestorePasswordSuccessAction
    | IRestorePasswordFailedAction
    | INewPasswordRequestAction
    | INewPasswordSuccessAction
    | INewPasswordFailedAction
    | ITokenRequestAction
    | ITokenSuccessAction
    | ITokenFailedAction
    | IAuthChecked
    | ICheckAuthChecked;

export interface IAuthChecked {
    readonly type: typeof AUTH_CHECKED;
}

export interface ICheckAuthChecked {
    readonly type: typeof CHECK_AUTH_CHECKED;
}

export const checkUserAuth = () => {
    return function (dispatch: AppDispatch) {
        const accessToken = getCookie('accessToken');

        dispatch({ type: AUTH_CHECKED });
        if (!!accessToken) {
            dataUser()
                .then((res) => {
                    dispatch({
                        type: DATA_USER_SUCCESS,
                        payload: res.user
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: DATA_USER_FAILED,
                    });
                })
        }

        dispatch({ type: CHECK_AUTH_CHECKED });
    };
};

export interface IAuthorizationRequestAction {
    readonly type: typeof AUTHORIZATION_REQUEST;
}
export interface IAuthorizationSuccessAction {
    readonly type: typeof AUTHORIZATION_SUCCESS;
    readonly payload: TUser['user'];
}
export interface IAuthorizationFailedAction {
    readonly type: typeof AUTHORIZATION_FAILED;
}

export const authorizationUser: AppThunk = (email: string, password: string) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: AUTHORIZATION_REQUEST,
        });
        authorization(email, password)
            .then((res) => {
                const authToken = res.accessToken.split('Bearer ')[1];
                setCookie('token', authToken);
                localStorage.setItem('token', res.refreshToken);
                dispatch({
                    type: AUTHORIZATION_SUCCESS,
                    payload: res.user,
                });
            })
            .catch((err) => {
                dispatch({
                    type: AUTHORIZATION_FAILED,
                });
            });
    };
}

export interface IRegistrationRequestAction {
    readonly type: typeof REGISTRATION_USER_REQUEST;
}
export interface IRegistrationSuccessAction {
    readonly type: typeof REGISTRATION_USER_SUCCESS;
    readonly payload: TUser['user'];
}
export interface IRegistrationFailedAction {
    readonly type: typeof REGISTRATION_USER_FAILED;
}

export const registrationNewUser: AppThunk = (name: string, email: string, password: string) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: REGISTRATION_USER_REQUEST,
        });
        registrationUser(name, email, password)
            .then((res) => {
                const authToken = res.accessToken.split('Bearer ')[1];
                setCookie('token', authToken);
                localStorage.setItem('token', res.refreshToken);
                dispatch({
                    type: REGISTRATION_USER_SUCCESS,
                    payload: res.user,
                });
            })
            .catch((err) => {
                dispatch({
                    type: REGISTRATION_USER_FAILED,
                });
            });
    };
}

export interface IGetUserRequestAction {
    readonly type: typeof DATA_USER_REQUEST;
}
export interface IGetUserSuccessAction {
    readonly type: typeof DATA_USER_SUCCESS;
    readonly payload: TUser['user'];
}
export interface IGetUserFailedAction {
    readonly type: typeof DATA_USER_FAILED;
}

export const getUserInfo: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: DATA_USER_REQUEST,
        });
        dataUser()
            .then((res) => {
                dispatch({
                    type: DATA_USER_SUCCESS,
                    payload: res.user
                });
            })
            .catch((err) => {
                dispatch({
                    type: DATA_USER_FAILED,
                });
            })
    }
}

export interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_DATA_USER_REQUEST;
}
export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_DATA_USER_SUCCESS;
    readonly payload: TUser['user'];
}
export interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_DATA_USER_FAILED;
}

export function updateUserInfo(name: string, email: string, password: string) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: UPDATE_DATA_USER_REQUEST,
        });
        updateUser(name, email, password)
            .then((res) => {
                dispatch({
                    type: UPDATE_DATA_USER_SUCCESS,
                    payload: res.user
                });
            })
            .catch((err) => {
                dispatch({
                    type: UPDATE_DATA_USER_FAILED,
                });
            })
    }
}

export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
    readonly payload: TUser['user'] | null;
}
export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
}
export const logOut: AppThunk = (refreshToken: string) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: LOGOUT_REQUEST,
        });
        logout(refreshToken)
            .then(() => {
                deleteCookie('token');
                localStorage.removeItem('token');
                dispatch({
                    type: LOGOUT_SUCCESS,
                    payload: null
                });
            })
            .catch(() => {
                console.log('logoutFail')
                dispatch({
                    type: LOGOUT_FAILED,
                });
            });
    };
}

export interface IRestorePasswordRequestAction {
    readonly type: typeof REQUEST_PASSWORD_REQUEST;
}
export interface IRestorePasswordSuccessAction {
    readonly type: typeof REQUEST_PASSWORD_SUCCESS;
}
export interface IRestorePasswordFailedAction {
    readonly type: typeof REQUEST_PASSWORD_FAILED;
}

export const resetNewPassword: AppThunk = (email: string) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: REQUEST_PASSWORD_REQUEST
        })
        requestPassword(email)
            .then((res) => {
                dispatch({
                    type: REQUEST_PASSWORD_SUCCESS,
                })
            })
            .catch((err) => {
                dispatch({
                    type: REQUEST_PASSWORD_FAILED,
                })
            });
    };
}

export interface INewPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface INewPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
    success: boolean;
    message: string;
}
export interface INewPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export const newPassword: AppThunk = (password: string, token: string) => {
    return function(dispatch: AppDispatch) {
        dispatch({ type: RESET_PASSWORD_REQUEST })
        resetPassword(password, token)
            .then((res) => {
                dispatch({
                    type: RESET_PASSWORD_SUCCESS,
                    success: res.success,
                    message: res.message
                })
            })
            .catch((err) => {
                dispatch({
                    type: RESET_PASSWORD_FAILED,
                });
            });
    }
}

export interface ITokenRequestAction {
    readonly type: typeof UPDATE_USER_TOKEN_REQUEST;
}
export interface ITokenSuccessAction {
    readonly type: typeof UPDATE_USER_TOKEN_SUCCESS;
}
export interface ITokenFailedAction {
    readonly type: typeof UPDATE_USER_TOKEN_FAILED;
}

export const token: AppThunk = () => {
    return function(dispatch: AppDispatch) {
        dispatch({ type: UPDATE_USER_TOKEN_REQUEST})
        newToken()
            .then((res) => {
                const authToken = res.accessToken.split('Bearer ')[1];
                setCookie('token', authToken);
                localStorage.setItem('token', res.refreshToken);
                dispatch({
                    type: UPDATE_USER_TOKEN_SUCCESS,
                })
            })
            .catch((err) => {
                dispatch({
                    type: UPDATE_USER_TOKEN_FAILED,
                });
            });
    }
}