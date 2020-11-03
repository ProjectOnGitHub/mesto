const initialCards = [
  {
    name: 'Андромеда',
    link: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7'
  },
  {
    name: 'Луна',
    link: 'https://images.unsplash.com/photo-1509647648544-a3e09b751ad6'
  },
  {
    name: 'Сомбреро',
    link: 'https://images.unsplash.com/photo-1560740583-0664e57560e4'
  },
  {
    name: 'Земля',
    link: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa'
  },
  {
    name: 'Млечный путь',
    link: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99'
  },
  {
    name: 'Солнце',
    link: 'https://images.unsplash.com/photo-1575881875475-31023242e3f9'
  }
];

const popupProfile = document.querySelector('.popup_type-edit-profile');
const formProfile = popupProfile.querySelector('.popup__container');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const popupPlace = document.querySelector('.popup_type-add-place');
const formPlace = popupPlace.querySelector('.popup__container');
const popupPlaceOpenButton = document.querySelector('.profile__add-button');
const formPlaceSubmitButton = formPlace.querySelector('.popup__submit-button');
const cards = document.querySelector('.cards__list');
const placeInput = formPlace.querySelector('.popup__input_place');
const urlInput = formPlace.querySelector('.popup__input_url');

const popupPhoto = document.querySelector('.popup_type-view-image');

const inputObj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


const openPopupPhoto = (name, link) => {
  const popupPhoto = document.querySelector('.popup_type-view-image');
  const popupPhotoCaption = document.querySelector('.popup__caption');
  const popupPhotoImage = document.querySelector('.popup__image');
  popupPhotoCaption.textContent = name;
  popupPhotoImage.alt = name;
  popupPhotoImage.src = link;
  viewPopupPhoto.open(popupPhoto);
}

// Экземпляр класса Section - отрисовка элементов на странице

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.cards__template', openPopupPhoto);
    const element = card.generateCard();
    cardsList.addItem(element);
  }
}, cards
);
cardsList.renderItems();

//  добавление карточки
const addPlace = (evt) => {
  evt.preventDefault();
  const newCard = {
    name: placeInput.value,
    link: urlInput.value,
  }
  const card = new Card(newCard, '.cards__template');
  const element = card.generateCard();
  cards.prepend(element);
  popupPlaceForm.close(popupPlace, evt);
}


// Экземпляр класса PopupWithForm - форма добавления нового места

const popupPlaceForm = new PopupWithForm({
  popupSelector: popupPlace,
  handleFormSubmit: (formData) => {
    const card = new Card(formData, '.cards__template');
    const element = card.generateCard();
    cardsList.addItem(element);
  }
})
popupPlaceForm.setEventListeners();




// Экземпляр класса PopupWithForm - форма редактирования профиля

const popupProfileForm = new PopupWithForm({
  popupSelector: popupProfile,
  handleFormSubmit: () => {
    user.setUserInfo();
  }
})
popupProfileForm.setEventListeners();


// Экземпляр класса PopupWithImage

const viewPopupPhoto = new PopupWithImage({ popupSelector: popupPhoto });
viewPopupPhoto.setEventListeners();


//Экземпляр класса UserInfo - отвечает за управление отображением информации о пользователе на странице.

const user = new UserInfo({
  name: profileName,
  job: profileJob
})

// Валидация

const formList = Array.from(document.querySelectorAll(inputObj.formSelector));
const formPlaceValidation = new FormValidator(inputObj, formPlace);
const formProfileValidation = new FormValidator(inputObj, formProfile);
formPlaceValidation.enableValidation();
formProfileValidation.enableValidation();

// Обработчики


popupProfileOpenButton.addEventListener('click', () => {
  user.getUserInfo();
  popupProfileForm.open(popupProfile);
  formProfileValidation.hideFormErrors();
});

popupPlaceOpenButton.addEventListener('click', () => {
  formPlaceSubmitButton.classList.add(inputObj.inactiveButtonClass);
  formPlaceSubmitButton.setAttribute('disabled', true);
  popupPlaceForm.open(popupPlace);
  formPlaceValidation.hideFormErrors();
})
popupPlace.addEventListener('click', addPlace);


class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.cloneNode(true).children[0];
  }

  generateCard() {
    this._element = this._getTemplate();
    const placeImage = this._element.querySelector('.cards__image');
    placeImage.src = this._link;
    placeImage.alt = this._name;
    this._element.querySelector('.cards__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.cards__delete-button').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.cards__like').addEventListener('click', () => {
      this._likeToogle();
    });
    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this._openPopupWithImage();
    });
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeToogle() {
    this._element.querySelector('.cards__like').classList.toggle('cards__like_active');
  }

  _openPopupWithImage() {
    this._handleCardClick(
      this._name,
      this._link,
    )
  }

}


class FormValidator {
  constructor(inputObj, formElement) {
    this._formSelector = inputObj.formSelector;
    this._inputSelector = inputObj.inputSelector;
    this._submitButtonSelector = inputObj.submitButtonSelector;
    this._inactiveButtonClass = inputObj.inactiveButtonClass;
    this._inputErrorClass = inputObj.inputErrorClass;
    this._errorClass = inputObj.errorClass;
    this._formElement = formElement;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  hideFormErrors() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _setEventListeners = () => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', true);
    }
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
  };
}
class Popup {
  constructor({ popupSelector }) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keyup', (evt) => this._handleEscClose(evt));

  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keyup', (event) => this._handleEscClose(event));
  }


  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _closePopupByOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }


  setEventListeners() {
    this._popupSelector.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));
    this._popupSelector.addEventListener('mousedown', this._closePopupByOverlayClick.bind(this));
  }
}

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupSelector.querySelector('.popup__container');
  }
  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.querySelector('.popup__container').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
  close() {
    super.close();
    this._formElement.reset();
  }
}
class PopupWithImage extends Popup {

  open() {
    super.open();
    this._popupSelector.addEventListener('click', () => this.openPopupPhoto);
  }
}
class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(element) {
    this._container.append(element);
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
    this._profileName = document.querySelector('.popup__input_name');
    this._profileJob = document.querySelector('.popup__input_job')
  }

  getUserInfo() {
    this._profileName.value = this._name.textContent;
    this._profileJob.value = this._job.textContent;
  }

  setUserInfo() {
    this._name.textContent = this._profileName.value;
    this._job.textContent = this._profileJob.value;
  }
}

