import initialCards from "./initial-cards.js";
import { createCard } from "./card.js";
import { cardList, validationObjects } from "./index.js";
import { resetError } from "./validate.js";

export function renderInitialCards() {
  const cardDefault = initialCards.map((element) => {
    return createCard(element);
  });
  cardList.append(...cardDefault);
}

export function switchLikeButton(element) {
  element.target.classList.toggle('element__like_active');
}

export function resetInput(element) {
  element.reset();
  resetError(element, validationObjects);
}

export function deleteCard(element) {
  element.remove();
}
