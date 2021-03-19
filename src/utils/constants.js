import { viewPopupPhoto } from '../pages/index.js';

const popupProfile = document.querySelector('.popup_type-edit-profile');
const formProfile = popupProfile.querySelector('.popup__container');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const inputName = document.querySelector('.popup__input_name');
const inputJob = document.querySelector('.popup__input_job')
const popupPlace = document.querySelector('.popup_type-add-place');
const formPlace = popupPlace.querySelector('.popup__container');
const popupPlaceOpenButton = document.querySelector('.profile__add-button');
const popupAvatarOpenButton = document.querySelector('.profile__image-edit');
const cards = document.querySelector('.cards__list');
const inputObj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const openPopupPhoto = (name, link) => {
  viewPopupPhoto.open(name, link);
}



export {
  popupProfile,
  formProfile,
  popupProfileOpenButton,
  inputName,
  inputJob,
  popupPlace,
  formPlace,
  popupPlaceOpenButton,
  popupAvatarOpenButton,
  cards,
  inputObj,
  openPopupPhoto
};
