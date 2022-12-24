/*Активные кнопки*/
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileAvatar = document.querySelector('.profile__avatar');
const closeButton = document.querySelector('.popup__exit');
const allPopups = document.querySelectorAll('.popup');

/*Основные попапы*/
const popupProfile = document.querySelector('#popup-profile');
const popupMesto = document.querySelector('#popup-mesto');
const popupImage = document.querySelector('#popup-image');
const popupAvatar = document.querySelector('#popup-avatar');

/*Поля имени и хобби*/
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');

/*Формы профиля и места*/
const formEditProfile = document.querySelector('.popup__form');
const formMesto = document.querySelector('#form-mesto');

/*Поля формы имени и хобби*/
const formInputName = document.querySelector('.form__input_name');
const formInputHobby = document.querySelector('.form__input_hobby');

/*Поля формы места и ссылки на картинку*/
const formCardName = document.querySelector('#mesto-name');
const formCardLink = document.querySelector('#mesto-link');

/*Попап с картинкой*/
const popupImageGroup = document.querySelector('.popup__image-group');
const popupImageTitle = document.querySelector('.popup__image-title');

/*Конструкция Template*/
const cardTemplate = document.querySelector('#default-elements').content;

/*Блок с элементами*/
const cardList = document.querySelector('.main__elements');

/*Поле формы нового аватара */
const newAvatarUrl = document.querySelector('#avatar-link');

/* Форма нового аватара */
const formNewAvatar = document.querySelector('#edit-avatar');

/*Функция рендера дефолтных карточек (мест)*/
function renderInitialCards() {
  const cardDefault = initialCards.map((element) => {
    return createCard(element);
  });
  cardList.append(...cardDefault);
}

renderInitialCards();

/*Функция открытия любого попапа*/
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

/*Функция закрытия любого попапа*/
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

/*Функция открытия попапа для смены аватара*/
function openEditAvatarPopup() {
  openPopup(popupAvatar);
}

/*Функция открытия попапа профиля*/
function openEditProfilePopup() {
  openPopup(popupProfile);
}

/*Функция закрытия попапа клавишой Esc*/
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupElement = document.querySelector('.popup_opened');
    closePopup(popupElement);
  }
}

/*Функция отправки данных с формы профиля*/
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = formInputName.value;
  profileHobby.textContent = formInputHobby.value;
  closePopup(popupProfile);
}

/*Открытие попапа добавления места*/
function openAddCardPopup() {
  openPopup(popupMesto);
}

/*Функция создания карточки (места)*/
function createCard(card) {
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

/*Функция отправки данных с формы добавления карточки*/
function formMestoSubmitHandler(evt) {
  evt.preventDefault();
  const cardPlace = createCard({name: formCardName.value, link: formCardLink.value});
  cardList.prepend(cardPlace);
  closePopup(popupMesto);
}

/*Функция отправки данных с формы смены аватара профиля*/
function submitNewAvatar(evt) {
  evt.preventDefault();
  profileAvatar.src = newAvatarUrl.value;
  closePopup(popupAvatar);
}

/*Функция открытия попапа для добавления места*/
function openImagePopup (title, link) {
  popupImageTitle.textContent = title;
  popupImageGroup.src = link;
  popupImageGroup.alt = title;

  openPopup(popupImage);
}

/*Функция удаления карточки (места)*/
function deleteCard(element) {
  element.remove();
}

/*Отработка кнопки закрытия любого открытого попапа*/
allPopups.forEach((element) => {
  element.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__exit')) {
      closePopup(element);
    }
  });
});


/*Обработчики событий для основных кнопок и отправки форм*/
formMesto.addEventListener('submit', formMestoSubmitHandler);
formEditProfile.addEventListener('submit', submitEditProfileForm);
formNewAvatar.addEventListener('submit', submitNewAvatar);
editButton.addEventListener('click', openEditProfilePopup);
addButton.addEventListener('click', openAddCardPopup);
profileAvatar.addEventListener('click', openEditAvatarPopup);

/*Закрытие попапа двойным кликом на оверлей*/
document.addEventListener('dblclick', (evt) => {
  if(evt.target.classList.contains('popup')) {
    allPopups.forEach((element) => {
      closePopup(element);
    })
  }
});
