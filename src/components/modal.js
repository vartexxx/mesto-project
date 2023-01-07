import { 
    popupImageTitle,
    popupImageGroup,
    popupImage,
    popupAvatar,
    popupMesto,
    popupProfile,
    formInputName,
    formInputHobby,
    profileName,
    profileHobby,
    formCardName,
    formCardLink,
    formNewAvatar,
    newAvatarUrl,
    profileAvatar,
    cardList,
    formMesto
} from "./index.js";
import { createCard } from "./card.js";
import { addCard, resetInput } from "./utils.js";
import { patchUserInfo, postNewCard } from "./api.js";

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

export function openEditAvatarPopup() {
    resetInput(formNewAvatar);
    openPopup(popupAvatar);
}

export function openAddCardPopup() {
    resetInput(formMesto);
    openPopup(popupMesto);
}

export function openImagePopup (title, link) {
    popupImageTitle.textContent = title;
    popupImageGroup.src = link;
    popupImageGroup.alt = title;
    openPopup(popupImage);
}

export function openProfileEditPopup() {
    openPopup(popupProfile);
    formInputName.value = profileName.textContent;
    formInputHobby.value = profileHobby.textContent;
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

export function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_opened'));
    }
}

export function handleProfileEditSubmitForm() {
    profileName.textContent = formInputName.value;
    profileHobby.textContent = formInputHobby.value;
    patchUserInfo(formInputName.value, formInputHobby.value);
    closePopup(popupProfile);
}

export function handleMestoSubmitForm(evt) {
    evt.preventDefault();
    const name = formCardName.value;
    const link = formCardLink.value;
    addCard(createCard(name, link))
    postNewCard(name, link);
    closePopup(popupMesto);
}

export function handleAvatarSubmitForm(evt) {
    evt.preventDefault();
    profileAvatar.src = newAvatarUrl.value;
    resetInput(formNewAvatar);
    closePopup(popupAvatar);
}
