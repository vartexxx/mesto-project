import '../pages/index.css';
import { getInitialCard, getUserInfo } from './api';
import { generateInitialCard } from './card';
import {
  closePopup,
  openEditAvatarPopup,
  openAddCardPopup,
  openProfileEditPopup,
  handleProfileEditSubmitForm,
  handleMestoSubmitForm,
  handleAvatarSubmitForm,
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
export const profileAvatarContainer = document.querySelector('.profile__avatar-container');
export const popupConfirm = document.querySelector('#popup-confirm');
export const popupSubmit = document.querySelector('.popup__submit');
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
export let currentUserId = null;


document.querySelectorAll('.popup').forEach((element) => {
    element.addEventListener('click', (evt) => {
      if ((evt.target.classList.contains('popup__exit')) || (evt.target.classList.contains('popup_opened'))) {
        closePopup(element);
      }
    });
});

const loadDefaultCards = () => {
  getUserInfo()
    .then(() => {
      getInitialCard()
        .then((res) => generateInitialCard(res))
    })
    .catch((err) => console.log(err));
}

const loadDefaultProfile = () => {
  getUserInfo()
    .then((res) => {
      currentUserId = res._id;
      profileName.textContent = res.name;
      profileHobby.textContent = res.about;
    })
    .catch((err) => console.log(err));
}

const loadDefaultAvatar = () => {
  getUserInfo()
    .then((res) => {
      profileAvatar.src = res.avatar;
    })
    .catch((err) => console.log(err))
}

loadDefaultCards();
loadDefaultProfile();
loadDefaultAvatar();
getUserInfo();

enableValidation(validationObjects);

profileAvatarContainer.addEventListener('click', openEditAvatarPopup);
addButton.addEventListener('click', openAddCardPopup);
editButton.addEventListener('click', openProfileEditPopup);
formMesto.addEventListener('submit', handleMestoSubmitForm);
formNewAvatar.addEventListener('submit', handleAvatarSubmitForm);
formEditProfile.addEventListener('submit', handleProfileEditSubmitForm);
