import '../pages/index.css';
import { 
  getInitialCard,
  getUserInfo,
  patchProfileInfo,
  postNewCard,
  patchAvatar
} from './api';
import { generateInitialCard, createCard } from './card';
import {
  closePopup,
  openPopup,
} from './modal.js';
import { enableValidation } from './validate.js';
import { resetInput } from './utils.js';


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
export const formSubmit = document.querySelector('.form__submit');
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


Promise.all([
  getInitialCard(),
  getUserInfo()
])
  .then((res) => {
    currentUserId = res[1]._id;
    profileName.textContent = res[1].name;
    profileHobby.textContent = res[1].about;
    profileAvatar.src = res[1].avatar;
    generateInitialCard(res[0])})
  .catch((err) => console.log(`Ошибка ${err}`));

document.querySelectorAll('.popup').forEach((element) => {
    element.addEventListener('click', (evt) => {
      if ((evt.target.classList.contains('popup__exit')) || (evt.target.classList.contains('popup_opened'))) {
        closePopup(element);
      }
    });
});

profileAvatarContainer.addEventListener('click', () => {
  resetInput(formNewAvatar);
  openPopup(popupAvatar);
});
addButton.addEventListener('click', () => {
  resetInput(formMesto);
  openPopup(popupMesto);
});
editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  formInputName.value = profileName.textContent;
  formInputHobby.value = profileHobby.textContent;
});
const saveProfilePopup = (evt) => {
  evt.preventDefault();
  formSubmit.textContent = 'Сохранение...';
  patchProfileInfo(formInputName.value, formInputHobby.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileHobby.textContent = res.about;
      closePopup(popupProfile);
    })
    .catch((err) => console.log(`Ошибка ${err}`))
    .finally(() => formSubmit.textContent = 'Сохранить');
};
const saveMestoPopup = (evt) => {
  evt.preventDefault();
  formSubmit.textContent = 'Создание...';
  const card = {
    name: formCardName.value,
    link: formCardLink.value,
  };
  postNewCard(card)
    .then((res) => {
      cardList.prepend(createCard(res))
      closePopup(popupMesto);
    })
    .catch((err) => console.log(`Ошибка ${err}`))
    .finally(() => formSubmit.textContent = 'Создать')
}
const saveAvatarPopup = (evt) => {
  evt.preventDefault();
  formSubmit.textContent = 'Сохранение...';
  patchAvatar(newAvatarUrl.value)
    .then((res) => {
      profileAvatar.src = res.avatar
      resetInput(formNewAvatar);
      closePopup(popupAvatar);
    })
    .catch((err) => console.log(`Ошибка ${err}`))
    .finally(() => formSubmit.textContent = 'Сохранить')
}

formEditProfile.addEventListener('submit', saveProfilePopup);
formMesto.addEventListener('submit', saveMestoPopup);
formNewAvatar.addEventListener('submit', saveAvatarPopup);

enableValidation(validationObjects);
