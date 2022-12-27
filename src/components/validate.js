const validationObjects = {
    formSelector: '.form',
    inputSelector: '.form__input',
    formFieldset: '.form__fieldset',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'form__input_invalid',
    errorClass: 'form__input-error_active',
}

export function enableValidation(){
    const formList = Array.from(document.querySelectorAll(validationObjects.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll(validationObjects.formFieldset));
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet);
        });
    });
};

const isValid = (formElement, inputElement) => {
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationObjects);
    } else {
        hideInputError(formElement, inputElement, validationObjects);
    }
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationObjects.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationObjects.errorClass);
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationObjects.inputErrorClass);
    errorElement.classList.remove(validationObjects.errorClass);
    errorElement.textContent = '';
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationObjects.inputSelector));
    const buttonElement = formElement.querySelector(validationObjects.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
    if(hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationObjects.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationObjects.inactiveButtonClass);
    }
};
