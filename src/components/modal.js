import { popupImageTitle, popupImageGroup, popupImage, popupAvatar, popupMesto } from "./index.js";

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

export function openEditAvatarPopup() {
    openPopup(popupAvatar);
}

export function openAddCardPopup() {
    openPopup(popupMesto);
}

export function openImagePopup (title, link) {
    popupImageTitle.textContent = title;
    popupImageGroup.src = link;
    popupImageGroup.alt = title;
  
    openPopup(popupImage);
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

document.addEventListener('dblclick', (evt) => {
    if(evt.target.classList.contains('popup')) {
        document.querySelectorAll('.popup').forEach((element) => {
        closePopup(element);
      })
    }
});
