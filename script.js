const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelector('.popup__exit');
const popupMain = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('#popup-profile');
const popupMesto = document.querySelector('#popup-mesto');
const popupImage = document.querySelector('#popup-image');

const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');

const formElement = document.querySelector('.popup__form');
const formMesto = document.querySelector('#form-mesto');

const formInputName = document.querySelector('.form__input_name');
const formInputHobby = document.querySelector('.form__input_hobby');

const formCardName = document.querySelector('#mesto-name');
const formCardLink = document.querySelector('#mesto-link');

const popupImageGroup = document.querySelector('.popup__image-group');
const popupImageTitle = document.querySelector('.popup__image-title');

const cardTemplate = document.querySelector('#default-elements').content;

const cardList = document.querySelector('.main__elements');


function popupOpen(popup) {
  popup.classList.add('popup_opened');
}

function popupClose(popup) {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openProfile);

function openProfile() {
  popupOpen(popupProfile);
  formElement.addEventListener('submit', formSumbitHandler);
}

function formSumbitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = formInputName.value;
  profileHobby.textContent = formInputHobby.value;
  popupClose(popupProfile);
}

popupMain.forEach((element) => {
  element.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__exit')) {
      popupClose(element);
    }
    else if (evt.target.classList.contains('popup__image-close')) {
      popupClose(element);
    }
  });
});


function popupAddCards() {
  popupOpen(popupMesto);
}

addButton.addEventListener('click', popupAddCards);

function newCard(card) {
  const newCard = cardTemplate.cloneNode(true);
  const newCardElement = newCard.querySelector('.element');
  const newCardTitle = newCard.querySelector('.element__title');
  const newCardImage = newCard.querySelector('.element__image');
  const newCardLike = newCard.querySelector('.element__like');
  const newCardDelete = newCard.querySelector('.element__delete');

  newCardTitle.textContent = card.name;
  newCardImage.src = card.link;
  newCardImage.alt = card.name;

  newCardImage.addEventListener('click', () => popupCardImage(card.name, card.link));

  newCardDelete.addEventListener('click', () => deleteCard(newCardElement));

  newCardLike.addEventListener('click', (element) =>
  element.target.classList.toggle('element__like_active')
  )
  return newCard;
}

function deleteCard(element) {
  element.remove();
}

function formMestoSubmitHandler(evt) {
  evt.preventDefault();
  const cardPlace = newCard({name: formCardName.value, link: formCardLink.value});
  cardList.prepend(cardPlace);
  popupClose(popupMesto);
}

formMesto.addEventListener('submit', formMestoSubmitHandler);


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

function getActiveDefault() {
  const cardDefault = initialCards.map((element) => {
    return newCard(element);
  });
  cardList.append(...cardDefault);
}

getActiveDefault();

function popupCardImage (title, link) {
  popupImageTitle.textContent = title;
  popupImageGroup.src = link;
  popupImageGroup.alt = title;

  popupOpen(popupImage);
}