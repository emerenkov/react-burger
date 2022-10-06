import {
    authorization,
    dataUser,
    logout, newToken,
    registrationUser,
    requestPassword,
    resetPassword,
    updateUser
} from "../../utils/api";
import {setCookie, deleteCookie, getCookie} from "../../utils/cookie";

export const AUTHORIZATION_REQUEST = 'AUTHORIZATION_REQUEST';
export const AUTHORIZATION_SUCCESS = 'AUTHORIZATION_SUCCESS';
export const AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED';

export const DATA_USER_REQUEST = 'DATA_USER_REQUEST';
export const DATA_USER_SUCCESS = 'DATA_USER_SUCCESS';
export const DATA_USER_FAILED = 'DATA_USER_FAILED';

export const UPDATE_DATA_USER_REQUEST = 'UPDATE_DATA_USER_REQUEST';
export const UPDATE_DATA_USER_SUCCESS = 'UPDATE_DATA_USER_SUCCESS';
export const UPDATE_DATA_USER_FAILED = 'UPDATE_DATA_USER_FAILED';

export const UPDATE_USER_TOKEN_REQUEST = 'UPDATE_USER_TOKEN_REQUEST';
export const UPDATE_USER_TOKEN_SUCCESS = 'UPDATE_USER_TOKEN_SUCCESS';
export const UPDATE_USER_TOKEN_FAILED = 'UPDATE_USER_TOKEN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const REGISTRATION_USER_REQUEST = 'REGISTRATION_USER_REQUEST';
export const REGISTRATION_USER_SUCCESS = 'REGISTRATION_USER_SUCCESS';
export const REGISTRATION_USER_FAILED = 'REGISTRATION_USER_FAILED';

export const REQUEST_PASSWORD_REQUEST = 'REQUEST_PASSWORD_REQUEST';
export const REQUEST_PASSWORD_SUCCESS = 'REQUEST_PASSWORD_SUCCESS';
export const REQUEST_PASSWORD_FAILED = 'REQUEST_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const AUTH_CHECKED = 'AUTH_CHECKED';
export const CHECK_AUTH_CHECKED = 'CHECK_AUTH_CHECKED'

// export const checkUserAuth = () => (dispatch) => {
//     if(getCookie('authToken')) {
//         dispatch(getDataUser())
//             .finally(() => {
//                 dispatch({type: AUTH_CHECKED});
//             })
//     } else {
//         dispatch({type: AUTH_CHECKED});
//     }
// }

export const checkUserAuth = () => {
    return function (dispatch) {
        const accessToken = getCookie('accessToken');

        dispatch({ type: AUTH_CHECKED });
        if (!!accessToken) {
            dispatch(getDataUser());
        }

        dispatch({ type: CHECK_AUTH_CHECKED });
    };
};

export function authorizationUser(email, password) {
    return function (dispatch) {
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
                });
            })
            .catch( () => {
                dispatch({
                    type: AUTHORIZATION_FAILED,
                });
            });
    };
}

export function getDataUser() {
    return function (dispatch) {
        dispatch({
            type: DATA_USER_REQUEST,
        });
        dataUser()
        .then((res) => {
            dispatch({
                type: DATA_USER_SUCCESS,
                payload: res.user,
            });
        })
            .catch(() => {
                dispatch({
                    type: DATA_USER_FAILED
                });
            })
    }
}

export function updateUserInformation(email, password, name) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_DATA_USER_REQUEST,
        });
        updateUser(email, password, name)
            .then((res) => {
                console.log(res);
                dispatch({
                    type: UPDATE_DATA_USER_SUCCESS,
                    payload: res.user,
                });
            })
            .catch(() => {
                dispatch({
                    type: UPDATE_DATA_USER_FAILED})
            });
    }
}

export function registrationNewUser (email, password, name) {
    return function(dispatch) {
        dispatch({
            type: REGISTRATION_USER_REQUEST
        });
        registrationUser(email, password, name)
            .then((res) =>{
                console.log(res);
                const authToken = res.accessToken.split('Bearer ')[1];
                setCookie('token', authToken);
                localStorage.setItem('token', res.refreshToken);
                dispatch({
                    type: REGISTRATION_USER_SUCCESS,
                    payload: res.user,
                })
            })
            .catch(() => {
                dispatch({
                    type: REGISTRATION_USER_FAILED
                });
            })
    }
}

export function updateUserToken () {
    return function(dispatch) {
        dispatch({
            type: UPDATE_USER_TOKEN_REQUEST
        })
        newToken()
            .then((res) => {
                console.log(res);
                const authToken = res.accessToken.split('Bearer ')[1];
                setCookie('token', authToken);
                localStorage.setItem('token', res.refreshToken);
                dispatch({
                    type: UPDATE_USER_TOKEN_SUCCESS
                })
            })
            .catch(() => {
                dispatch({
                    type: UPDATE_USER_TOKEN_FAILED
                })
            })
    }
}

export function logoutUser(outToken) {
    return function(dispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        });
        logout(outToken)
            .then((res) => {
                deleteCookie('token');
                localStorage.removeItem('token');
                dispatch({
                    type: LOGOUT_SUCCESS
                })
            })
            .catch(() =>{
                dispatch({
                    type: LOGOUT_FAILED
                });
            })
    }
}

export function resetPasswordEmail (email) {
    return function (dispatch) {
        dispatch({
            type: REQUEST_PASSWORD_REQUEST
        });
        requestPassword(email)
            .then((res) => {
                dispatch({
                    type: REQUEST_PASSWORD_SUCCESS
                })
            })
        .catch((err) => {
            dispatch({
                type: REQUEST_PASSWORD_FAILED
            });
        });
    }
}

export function resetPasswordUser (password, token) {
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
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
                    type: RESET_PASSWORD_FAILED
                });
                console.log(err);
            });
    }
}

// export const fetchWithRefresh = (request, ...requestParams) => {
//     return function (dispatch) {
//         const refreshToken = localStorage.getItem('refreshToken');
//
//         console.log('fetchWithRefresh');
//         if (!refreshToken) {
//             throw new Error('Token does not exist in storage');
//         } else {
//             dispatch({ type: UPDATE_USER_TOKEN_REQUEST });
//             console.log(refreshToken);
//             api
//                 .refreshToken(refreshToken)
//                 .then((res) => {
//                     console.log('fetchWithRefresh - refresh');
//                     setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
//                     localStorage.setItem('refreshToken', res.refreshToken);
//                     dispatch({ type: UPDATE_USER_TOKEN_SUCCESS });
//                     return res;
//                 })
//                 .then((res) => {
//                     console.log('fetchWithRefresh - repeat request');
//                     console.log(...requestParams, 'params');
//
//                     requestParams = { ...requestParams, accessToken: res.accessToken };
//
//                     dispatch(request(requestParams));
//                 })
//                 .catch((err) => {
//                     console.log('fetchWithRefresh - in err');
//
//                     dispatch(logOut());
//                     dispatch({ type: UPDATE_USER_TOKEN_FAILED, err: err.message });
//                     return Promise.reject(err);
//                 });
//         }
//     };
// };