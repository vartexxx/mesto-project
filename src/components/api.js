import { createCard } from "./card.js";
import { profileAvatar, profileHobby, profileName } from "./index.js";
import { addCard } from "./utils.js";

const token = 'cf2f740d-de00-436f-a166-58000bce866a';
export let currentUserId = null;

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
    return fetch(`${apiConfig.url}/cards`, {
        method: 'GET',
        headers: apiConfig.headers,
    })
    .then((res) => getResponse(res))
    .then((res) => {
        res.forEach(element => {
            const newCard = createCard(element.name, element.link, element.likes.length);
            addCard(newCard);
        });
    });
}

export function postNewCard(name, link) {
    return fetch(`${apiConfig.url}/cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: name,
            link: link,
        })
    })
    .then((res) => getResponse(res));
}

export function getUserInfo() {
    return fetch(`${apiConfig.url}/users/me`, {
        method: 'GET',
        headers: apiConfig.headers,
    })
    .then((res) => getResponse(res))
    .then((res) => {
        profileName.textContent = res.name;
        profileHobby.textContent = res.about;
        profileAvatar.src = res.avatar;
        currentUserId = res._id;
    });
}

export function patchUserInfo(name, hobby) {
    console.log(name);
    return fetch(`${apiConfig.url}/users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: name,
            about: hobby,
        })
    })
    .then((res) => getResponse(res));
}