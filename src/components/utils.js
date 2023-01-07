import { deleteCardById } from "./api.js";
import { createCard } from "./card.js";
import { cardList, validationObjects } from "./index.js";
import { resetError } from "./validate.js";

export function addCard(element) {
  cardList.append(createCard(element));
}

export function switchLikeButton(element) {
  element.target.classList.toggle('element__like_active');
}

export function resetInput(element) {
  element.reset();
  resetError(element, validationObjects);
  element.querySelector('.form__submit').classList.add('form__submit_disabled');
}

export function deleteCard(element, data) {
  element.target.closest('.element').remove();
  deleteCardById(data._id);
}