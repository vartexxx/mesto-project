const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelector('.popup__exit');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');

const formElement = document.querySelector('.popup__form');
const formInputName = document.querySelector('.form__input_name');
const formInputHobby = document.querySelector('.form__input_hobby');

const popupMesto = document.querySelector('#popup-mesto');

function popupClose() {
  popup.classList.toggle('popup_opened');
}

closeButton.addEventListener('click', popupClose);

function popupOpen() {
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', popupOpen);

function formSumbitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = formInputName.value;
  profileHobby.textContent = formInputHobby.value;
  popupClose();
}

formElement.addEventListener('submit', formSumbitHandler);


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector('#default-cards').content;