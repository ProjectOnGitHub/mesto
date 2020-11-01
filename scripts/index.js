import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import initialCards from './initialCards.js';

const popupProfile = document.querySelector('.popup_type-edit-profile');
const formProfile = popupProfile.querySelector('.popup__container');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');
const nameInput = formProfile.querySelector('.popup__input_name');
const jobInput = formProfile.querySelector('.popup__input_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const popupPlace = document.querySelector('.popup_type-add-place');
const formPlace = popupPlace.querySelector('.popup__container');
const popupPlaceOpenButton = document.querySelector('.profile__add-button');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');
const formPlaceSubmitButton = formPlace.querySelector('.popup__submit-button');
const cardTemplate = document.querySelector('.cards__template').content;
const template = document.querySelector('.cards__template');
const cards = document.querySelector('.cards__list');
const placeInput = formPlace.querySelector('.popup__input_place');
const urlInput = formPlace.querySelector('.popup__input_url');

const popupPhoto = document.querySelector('.popup_type-view-image');
//const popupPhotoCloseButton = popupPhoto.querySelector('.popup__close-button');
const inputObj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


export const openPopupPhoto = (name, link) => {
  const popupPhoto = document.querySelector('.popup_type-view-image');
  const popupPhotoCaption = document.querySelector('.popup__caption');
  const popupPhotoImage = document.querySelector('.popup__image');
  popupPhotoCaption.textContent =name;
  popupPhotoImage.alt = name;
  popupPhotoImage.src = link;
  viewPopupPhoto.open(popupPhoto);
}

// Экземпляр класса Section - отрисовка элементов на странице

const cardsList = new Section({items: initialCards,
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
  const card = new Card(newCard, '.cards__template', openPopupPhoto);
  const element = card.generateCard();
  cardsList.addItem(element);
  popupPlaceForm.close(popupPlace, evt);
  }


// Экземпляр класса PopupWithForm - форма добавления нового места

const popupPlaceForm = new PopupWithForm({
  popupSelector: popupPlace,
  handleFormSubmit: (item) => {
    const card = new Card(item, '.cards__template', openPopupPhoto);
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

const viewPopupPhoto = new PopupWithImage(popupPhoto);
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
  formProfileValidation.hideInputError();
});

popupPlaceOpenButton.addEventListener('click', () => {
  formPlaceSubmitButton.classList.add(inputObj.inactiveButtonClass);
  formPlaceSubmitButton.setAttribute('disabled', true);
  popupPlaceForm.open(popupPlace);
  formPlaceValidation.hideInputError();
})
popupPlace.addEventListener('click', addPlace);





/*
formProfile.addEventListener('submit', formSubmitProfileHandler);
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));


popupPlaceCloseButton.addEventListener('click', () => closePopup(popupPlace));
popupPhotoCloseButton.addEventListener('click', () => closePopup(popupPhoto));





function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
  document.addEventListener('click', closePopupOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
  document.removeEventListener('mousedown', closePopupOverlay);
}
function closePopupEscape(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === "Escape") {
    closePopup(popupOpened);
  }
}

function closePopupOverlay(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
};

function takeProfileValue() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function saveFormProfileValue() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function formSubmitProfileHandler(evt) {
  evt.preventDefault();
  saveFormProfileValue();
  closePopup(popupProfile);
}



/*
formPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameValue = placeInput.value;
  const linkValue = urlInput.value;

  const card = new Card(newCard, '.cards__template');
  const element = card.generateCard();

  cards.prepend(element);
});
*/


/*
initialCards.forEach(({ name, link }) => {
  const card = new Card({ name, link }, '.cards__template');
  const element = card.generateCard();
  cards.append(element);
})
*/


