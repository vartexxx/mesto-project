const token = 'cf2f740d-de00-436f-a166-58000bce866a';
const apiConfig = {
    url: 'https://mesto.nomoreparties.co/v1/plus-cohort-18/',
    headers: {
        authorization: token,
        'Content-Type': 'application/json',
    },
};


const getResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialCard = () => {
    return fetch(`${apiConfig.url}cards`, {
        headers: apiConfig.headers,
    })
    .then((res) => getResponse(res));
};

export const postNewCard = (card) => {
    return fetch(`${apiConfig.url}cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: card.name,
            link: card.link,
        })
    })
    .then((res) => getResponse(res));
};

export const getUserInfo = () => {
    return fetch(`${apiConfig.url}users/me`, {
        method: 'GET',
        headers: apiConfig.headers,
    })
    .then((res) => getResponse(res));
};

export const patchProfileInfo = (name, hobby) => {
    return fetch(`${apiConfig.url}users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: name,
            about: hobby,
        })
    })
    .then((res) => getResponse(res));
};

export const patchAvatar = (link) => {
    return fetch(`${apiConfig.url}users/me/avatar`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            avatar: `${link}`
        })
    })
    .then((res) => getResponse(res));
};

export const deleteCardById = (id) => {
    return fetch(`${apiConfig.url}cards/${id}`, {
        method: 'DELETE',
        headers: apiConfig.headers,
    })
    .then((res) => getResponse(res));
};

export const likeCard = (id) => {
    return fetch(`${apiConfig.url}cards/likes/${id}`, {
        method: 'PUT',
        headers: apiConfig.headers,
    })
    .then((res) => getResponse(res));
}

export const dislikeCard = (id) => {
    return fetch(`${apiConfig.url}cards/likes/${id}`, {
        method: 'DELETE',
        headers: apiConfig.headers,
    })
    .then((res) => getResponse(res));
}
