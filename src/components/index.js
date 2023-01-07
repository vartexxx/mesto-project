import '../pages/index.css';
import {
  getInitialCard, getUserInfo,
} from './api';
import { 
  closePopup,
  openEditAvatarPopup,
  openAddCardPopup,
  openProfileEditPopup,
  handleProfileEditSubmitForm,
  handleMestoSubmitForm,
  handleAvatarSubmitForm
} from './modal.js';
import { enableValidation } from './validate.js';


export const validationObjects = {
  formSelector: '.form',
  inputSelector: '.form__input',
  formFieldset: '.form__fieldset',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_active',
  inputErrorSelector: '.form__input-error',
};
export const popupProfile = document.querySelector('#popup-profile');
export const profileAvatar = document.querySelector('.profile__avatar');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
export const popupMesto = document.querySelector('#popup-mesto');
export const popupImage = document.querySelector('#popup-image');
export const popupAvatar = document.querySelector('#popup-avatar');
export const formEditProfile = document.querySelector('#form-profile');
export const formMesto = document.querySelector('#form-mesto');
export const formInputName = document.querySelector('.form__input_name');
export const formInputHobby = document.querySelector('.form__input_hobby');
export const profileName = document.querySelector('.profile__name');
export const profileHobby = document.querySelector('.profile__hobby');
export const formCardName = document.querySelector('#mesto-name');
export const formCardLink = document.querySelector('#mesto-link');
export const cardTemplate = document.querySelector('#default-elements').content;
export const cardList = document.querySelector('.main__elements');
export const popupImageGroup = document.querySelector('.popup__image-group');
export const popupImageTitle = document.querySelector('.popup__image-title');
export const formNewAvatar = document.querySelector('#edit-avatar');
export const newAvatarUrl = document.querySelector('#avatar-link');

document.querySelectorAll('.popup').forEach((element) => {
    element.addEventListener('click', (evt) => {
      if ((evt.target.classList.contains('popup__exit')) || (evt.target.classList.contains('popup_opened'))) {
        closePopup(element);
      }
    });
});

profileAvatar.addEventListener('click', openEditAvatarPopup);
addButton.addEventListener('click', openAddCardPopup);
editButton.addEventListener('click', openProfileEditPopup);
formMesto.addEventListener('submit', handleMestoSubmitForm);
formNewAvatar.addEventListener('submit', handleAvatarSubmitForm);
formEditProfile.addEventListener('submit', handleProfileEditSubmitForm);

enableValidation(validationObjects);
getInitialCard();
getUserInfo();