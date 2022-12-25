import initialCards from "./initial-cards.js";
import { createCard } from "./card.js";
import { cardList } from "./index.js";

export function renderInitialCards() {
    const cardDefault = initialCards.map((element) => {
      return createCard(element);
    });
    cardList.append(...cardDefault);
}

export function deleteCard(element) {
    element.remove();
}
