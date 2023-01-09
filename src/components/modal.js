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
    formMesto,
} from "./index.js";
import { resetInput, addCard } from "./utils.js";
import { patchProfileInfo, patchAvatar, postNewCard } from "./api.js";


export const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
};

export const openEditAvatarPopup = () => {
    resetInput(formNewAvatar);
    openPopup(popupAvatar);
};

export const openAddCardPopup = () => {
    resetInput(formMesto);
    openPopup(popupMesto);
};

export const openImagePopup = (title, link) => {
    popupImageTitle.textContent = title;
    popupImageGroup.src = link;
    popupImageGroup.alt = title;
    openPopup(popupImage);
};

export const openProfileEditPopup = () => {
    openPopup(popupProfile);
    formInputName.value = profileName.textContent;
    formInputHobby.value = profileHobby.textContent;
};

export const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
};

export const closePopupEsc = (evt) => {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
};

export const handleProfileEditSubmitForm = () => {
    profileName.textContent = formInputName.value;
    profileHobby.textContent = formInputHobby.value;
    patchProfileInfo(formInputName.value, formInputHobby.value);
    closePopup(popupProfile);
};

export const handleMestoSubmitForm = (evt) => {
    evt.preventDefault();
    const card = {
        name: formCardName.value,
        link: formCardLink.value,
    }
    postNewCard(card).then((res) => addCard(res));
    closePopup(popupMesto);
};

export const handleAvatarSubmitForm = (evt) => {
    evt.preventDefault();
    profileAvatar.src = newAvatarUrl.value;
    patchAvatar(newAvatarUrl.value);
    resetInput(formNewAvatar);
    closePopup(popupAvatar);
};
