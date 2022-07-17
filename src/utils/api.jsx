export const api = {
    url: 'https://norma.nomoreparties.space/api',
    headers: {
        'Content-Type': 'aplication.json'
    }
};

export const parseResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
}

export const getData = () => {
    return fetch(`${api.url}/ingredients`, {
        headers: api.headers,
        method: 'GET'
    })
        .then(res => parseResponse(res))
}

export const setData = () => {
    return fetch(`${api.url}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json;charset=utf-8",
        },
        body: JSON.stringify({"ingredients": ['60d3b41abdacab0026a733c6']})
    })
        .then(res => parseResponse(res))

}