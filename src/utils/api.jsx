import {getCookie, setCookie} from "./cookie";

export const api = {
    url: 'https://norma.nomoreparties.space/api',
    headers: {
        'Content-Type': "application/json;charset=utf-8"
    }
};



const parseResponse = (res) => (res.ok ? res.json() : res.json().then((err) => Promise.reject(err)));

export const getData = () => {
    return fetch(`${api.url}/ingredients`, {
        headers: api.headers,
        method: 'GET'
    })
        .then(res => parseResponse(res))
}

export const setData = (order) => {
    return fetch(`${api.url}/orders`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        method: 'POST',
        body: JSON.stringify({ingredients: order})
    })
        .then(res => parseResponse(res))
}

export const authorization = (email, password) => {
    return fetch(`${api.url}/auth/login`, {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
        .then(res => parseResponse(res))
}

export const registrationUser = (email, password, name) => {
    return fetch( `${api.url}/auth/register`, {
        headers: api.headers,
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        })
    })
        .then(res => parseResponse(res))
}

export const dataUser = () => {
    return fetch( `${api.url}/auth/user`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json; charset=utf-8',
            Authorization: 'Bearer ' + getCookie('token')},
    })
        .then(res => parseResponse(res))
}

export const updateUser = (email, password, name) => {
    return fetch(`${api.url}/auth/user`, {
        headers: {'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')},
        method: 'PATCH',
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        })
    })
        .then(res => parseResponse(res))
}

export const newToken = () => {
    return fetch(`${api.url}/auth/token`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        method: 'POST',
        body: JSON.stringify({
            token: localStorage.getItem('token'),
        })
    })
        .then(res => parseResponse(res))
}

export function logout(refreshToken) {
    return fetch(`${api.url}/auth/logout`, {
        headers: api.headers,
        method: 'POST',
        body: JSON.stringify({
            token: refreshToken
        })
    })
        .then(res => parseResponse(res))
}

export const requestPassword = (email) => {
    return fetch(`${api.url}/password-reset`, {
        headers: api.headers,
        method: 'POST',
        body: JSON.stringify({
            email: email
        })
    })
        .then(res => parseResponse(res))
}

export const resetPassword = (password, token) => {
    return fetch(`${api.url}/password-reset/reset`, {
        headers: api.headers,
        method: 'POST',
        body: JSON.stringify({
            password: password,
            token: token
        })
    })
        .then(res => parseResponse(res));
}

