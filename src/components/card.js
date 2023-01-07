import { cardTemplate, currentUserId } from "./index.js";
import { openImagePopup } from "./modal.js";
import { switchLikeButton, deleteCard, addCard } from "./utils.js";


function showTrashButton(owner, trashButton) {
    if(owner._id === currentUserId) {
        return trashButton.classList.add('element__delete_active');
    }
}

export const generateInitialCard = (initialArray) => {
    initialArray.forEach(element => {
        addCard(element);
    });
}

export function createCard(data) {
    const newCard = cardTemplate.cloneNode(true);
    const newCardElement = newCard.querySelector('.element');
    const newCardTitle = newCard.querySelector('.element__title');
    const newCardImage = newCard.querySelector('.element__image');
    const newCardLike = newCard.querySelector('.element__like');
    const newCardDelete = newCard.querySelector('.element__delete');
    const newCardLikes = newCard.querySelector('.element__like-number');
    const likes = data.likes;
    newCard.id = data._id;
    newCardTitle.textContent = data.name;
    newCardImage.src = data.link;
    newCardImage.alt = data.name;
    newCardLikes.textContent = likes.length;
    showTrashButton(data.owner, newCardDelete);
    newCardImage.addEventListener('click', () => openImagePopup(data.name, data.link));
    newCardDelete.addEventListener('click', (evt) => deleteCard(evt, data));
    newCardLike.addEventListener('click', (element) => switchLikeButton(element));
    return newCard;
}
