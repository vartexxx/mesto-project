import { deleteCardById } from "./api.js";
import { createCard } from "./card.js";
import { cardList, validationObjects } from "./index.js";
import { resetError } from "./validate.js";


export const addCard = (element) => {
  cardList.append(createCard(element));
};

export const switchLikeButton = (element) => {
  element.target.classList.toggle('element__like_active');
};

export const resetInput = (element) => {
  element.reset();
  resetError(element, validationObjects);
  element.querySelector('.form__submit').classList.add('form__submit_disabled');
  element.querySelector('.form__submit').disabled = true;
};

export const deleteCard = (element, data) => {
  element.target.closest('.element').remove();
  deleteCardById(data._id);
};
