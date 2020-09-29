const showInputError = (formElement, inputElement, errorMessage, inputObj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log(errorElement);
  inputElement.classList.add(inputObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(inputObj.errorClass);
};

const hideInputError = (formElement, inputElement, inputObj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputObj.inputErrorClass);
  errorElement.classList.remove(inputObj.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputObj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputObj);
  } else {
    hideInputError(formElement, inputElement, inputObj);
  }
};

const setEventListeners = (formElement, inputObj) => {
  const inputList = Array.from(formElement.querySelectorAll(inputObj.inputSelector));
  console.log(inputList);
  const buttonElement = formElement.querySelector(inputObj.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputObj);
      toggleButtonState(inputList, buttonElement, inputObj);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, inputObj) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inputObj.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inputObj.inactiveButtonClass);
  }
};

const enableValidation = (inputObj) => {
  const formList = Array.from(document.querySelectorAll(inputObj.formSelector));
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => evt.preventDefault());

    setEventListeners(formElement, inputObj);

  });
};

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
