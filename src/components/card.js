import { dislikeCard, likeCard } from "./api.js";
import { cardTemplate, currentUserId } from "./index.js";
import { openImagePopup } from "./modal.js";
import { deleteCard, addCard } from "./utils.js";


export const generateInitialCard = (initialArray) => {
    initialArray.forEach(element => {
        addCard(element);
    });
};

const showTrashButton = (owner, trashButton) => {
    if(owner._id === currentUserId) {
        trashButton.classList.add('element__delete_active');
    }
};

const switchLike = (id, button, likes) => {
    if(button.classList.contains('element__like_active')) {
        dislikeCard(id)
            .then(() => {
                button.classList.remove('element__like_active');
                likes.textContent--;
            })
            .catch((err) => console.log(err))
    } else {
        likeCard(id)
            .then(() => {
                button.classList.add('element__like_active');
                likes.textContent++;
            })
            .catch((err) => console.log(err))
    }
}

const swtichCardLikeState = (data, button) => {
    if(data.some(element => element._id === currentUserId)) {
        button.classList.toggle('element__like_active');
    }
}

export const createCard = (data) => {
    const newCard = cardTemplate.cloneNode(true);
    const newCardTitle = newCard.querySelector('.element__title');
    const newCardImage = newCard.querySelector('.element__image');
    const newCardLike = newCard.querySelector('.element__like');
    const newCardDelete = newCard.querySelector('.element__delete');
    const newCardLikes = newCard.querySelector('.element__like-number');

    newCard.id = data._id;
    newCardTitle.textContent = data.name;
    newCardImage.src = data.link;
    newCardImage.alt = data.name;
    newCardLikes.textContent = data.likes.length;
    newCardImage.addEventListener('click', () => openImagePopup(data.name, data.link));
    newCardDelete.addEventListener('click', (evt) => deleteCard(evt, data));
    newCardLike.addEventListener('click', () => switchLike(newCard.id, newCardLike, newCardLikes));

    showTrashButton(data.owner, newCardDelete);
    swtichCardLikeState(data.likes, newCardLike);
    return newCard;
}
