import Card from './Card.js';
import FormValidator from './FormValidator.js';
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
const cardTemplate = document.querySelector('.cards__template').content;
const cards = document.querySelector('.cards__list');
const placeInput = formPlace.querySelector('.popup__input_place');
const urlInput = formPlace.querySelector('.popup__input_url');

const popupPhoto = document.querySelector('.popup_type-view-image');
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__close-button');

const inputObj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const formList = Array.from(document.querySelectorAll(inputObj.formSelector));
const formPlaceValidation = new FormValidator(inputObj, formPlace);
const formProfileValidation = new FormValidator(inputObj, formProfile);
const placeFormValidator = formPlaceValidation.enableValidation();
const profileFormValidator = formProfileValidation.enableValidation();

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

formProfile.addEventListener('submit', formSubmitProfileHandler);

popupProfileOpenButton.addEventListener('click', () => {
  takeProfileValue();
  openPopup(popupProfile);
});

popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
popupPlaceOpenButton.addEventListener('click', () => openPopup(popupPlace));
popupPlaceCloseButton.addEventListener('click', () => closePopup(popupPlace));
popupPhotoCloseButton.addEventListener('click', () => closePopup(popupPhoto));

initialCards.forEach(({ name, link }) => {
  const card = new Card({ name, link }, cardTemplate);
  const element = card.generateCard();
  cards.append(element);
})

formPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameValue = placeInput.value;
  const linkValue = urlInput.value;
  const newCard = {
    name: nameValue,
    link: linkValue,
  }
  formPlace.reset()
  const card = new Card(newCard, cardTemplate);
  const element = card.generateCard();
  closePopup(popupPlace, evt);
  cards.prepend(element);
});

export { openPopup, popupPhoto };
