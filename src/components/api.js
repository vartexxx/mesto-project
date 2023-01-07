import { createCard } from "./card.js";
import { profileAvatar, profileHobby, profileName } from "./index.js";
import { addCard } from "./utils.js";

const token = 'cf2f740d-de00-436f-a166-58000bce866a';

export const apiConfig = {
    url: 'https://mesto.nomoreparties.co/v1/plus-cohort-18/',
    headers: {
        authorization: token,
        'Content-Type': 'application/json',
    },
};

function getResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export function getInitialCard() {
    return fetch(`${apiConfig.url}cards`, {
        headers: apiConfig.headers,
    })
    .then((res) => getResponse(res));
}

export function postNewCard(card) {
    return fetch(`${apiConfig.url}cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: card.name,
            link: card.link,
        })
    })
    .then((res) => getResponse(res));
}

export function getUserInfo() {
    return fetch(`${apiConfig.url}users/me`, {
        method: 'GET',
        headers: apiConfig.headers,
    })
    .then((res) => getResponse(res));
}

export function patchProfileInfo(name, hobby) {
    console.log(name);
    return fetch(`${apiConfig.url}users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: name,
            about: hobby,
        })
    })
    .then((res) => getResponse(res));
}

export function patchAvatar(link) {
    return fetch(`${apiConfig.url}users/me/avatar`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            avatar: `${link}`
        })
    })
    .then((res) => getResponse(res));
}

export function deleteCardById(id) {
    return fetch(`${apiConfig.url}cards/${id}`, {
        method: 'DELETE',
        headers: apiConfig.headers,
    })
    .then((res) => getResponse(res));
}