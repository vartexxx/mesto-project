import { enableValidation } from './validate.js';
import { openPopup, closePopup, openEditAvatarPopup, openAddCardPopup } from './modal.js';
import { createCard } from './card.js';
import { renderInitialCards } from './utils.js';

const popupProfile = document.querySelector('#popup-profile');
const profileAvatar = document.querySelector('.profile__avatar');
const addButton = document.querySelector('.profile__add-button');
export const popupMesto = document.querySelector('#popup-mesto');
export const popupImage = document.querySelector('#popup-image');
export const popupAvatar = document.querySelector('#popup-avatar');
const formEditProfile = document.querySelector('.popup__form');
const formMesto = document.querySelector('#form-mesto');
const formInputName = document.querySelector('.form__input_name');
const formInputHobby = document.querySelector('.form__input_hobby');
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');
const formCardName = document.querySelector('#mesto-name');
const formCardLink = document.querySelector('#mesto-link');
export const cardTemplate = document.querySelector('#default-elements').content;
export const cardList = document.querySelector('.main__elements');
export const popupImageGroup = document.querySelector('.popup__image-group');
export const popupImageTitle = document.querySelector('.popup__image-title');
const formNewAvatar = document.querySelector('#edit-avatar');
const newAvatarUrl = document.querySelector('#avatar-link');

document.querySelectorAll('.popup').forEach((element) => {
    element.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__exit')) {
        closePopup(element);
      }
    });
});

document.querySelector('.profile__edit-button').addEventListener('click', () => {
    openPopup(popupProfile);
    formInputName.value = profileName.textContent;
    formInputHobby.value = profileHobby.textContent;
});

formEditProfile.addEventListener('submit', () => {
    profileName.textContent = formInputName.value;
    profileHobby.textContent = formInputHobby.value;
    closePopup(popupProfile);
});

function submitNewAvatar(evt) {
  evt.preventDefault();
  profileAvatar.src = newAvatarUrl.value;
  closePopup(popupAvatar);
}

function formMestoSubmitHandler(evt) {
  evt.preventDefault();
  const cardPlace = createCard({name: formCardName.value, link: formCardLink.value});
  cardList.prepend(cardPlace);
  closePopup(popupMesto);
}

profileAvatar.addEventListener('click', openEditAvatarPopup);
addButton.addEventListener('click', openAddCardPopup);
formMesto.addEventListener('submit', formMestoSubmitHandler);
formNewAvatar.addEventListener('submit', submitNewAvatar);

renderInitialCards();
enableValidation();
