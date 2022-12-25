import { cardTemplate, cardList} from "./index.js";
import { openImagePopup } from "./modal.js";
import { deleteCard } from "./utils.js";

export function createCard(card) {
    const newCard = cardTemplate.cloneNode(true);
    const newCardElement = newCard.querySelector('.element');
    const newCardTitle = newCard.querySelector('.element__title');
    const newCardImage = newCard.querySelector('.element__image');
    const newCardLike = newCard.querySelector('.element__like');
    const newCardDelete = newCard.querySelector('.element__delete');
  
    newCardTitle.textContent = card.name;
    newCardImage.src = card.link;
    newCardImage.alt = card.name;
  
    newCardImage.addEventListener('click', () => openImagePopup(card.name, card.link));
  
    newCardDelete.addEventListener('click', () => deleteCard(newCardElement));
  
    newCardLike.addEventListener('click', (element) =>
    element.target.classList.toggle('element__like_active')
    )
    return newCard;
}
