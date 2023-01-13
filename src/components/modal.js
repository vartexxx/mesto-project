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

export const openImagePopup = (title, link) => {
    popupImageTitle.textContent = title;
    popupImageGroup.src = link;
    popupImageGroup.alt = title;
    openPopup(popupImage);
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