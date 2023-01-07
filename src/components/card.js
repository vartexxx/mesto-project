import { cardTemplate} from "./index.js";
import { openImagePopup } from "./modal.js";
import { deleteCard, switchLikeButton } from "./utils.js";


// function showTrashButton(element, trashButton) {
//     if(element._id === id) {
//         trashButton.classList.add('')
//     }
// }

export function createCard(name, link, likes) {
    const newCard = cardTemplate.cloneNode(true);
    const newCardElement = newCard.querySelector('.element');
    const newCardTitle = newCard.querySelector('.element__title');
    const newCardImage = newCard.querySelector('.element__image');
    const newCardLike = newCard.querySelector('.element__like');
    const newCardDelete = newCard.querySelector('.element__delete');
    const newCardLikes = newCard.querySelector('.element__like-number');
    newCardTitle.textContent = name;
    newCardImage.src = link;
    newCardImage.alt = name;
    newCardLikes.textContent = likes;
    newCardImage.addEventListener('click', () => openImagePopup(name, link));
    newCardDelete.addEventListener('click', () => deleteCard(newCardElement));
    newCardLike.addEventListener('click', (element) => switchLikeButton(element));
    return newCard;
}
