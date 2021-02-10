import { viewPopupPhoto } from '../pages/index.js';

export const popupProfile = document.querySelector('.popup_type-edit-profile');
export const formProfile = popupProfile.querySelector('.popup__container');
export const popupProfileOpenButton = document.querySelector('.profile__edit-button');
export const inputName = document.querySelector('.popup__input_name');
export const inputJob = document.querySelector('.popup__input_job')
export const popupPlace = document.querySelector('.popup_type-add-place');
export const formPlace = popupPlace.querySelector('.popup__container');
export const popupPlaceOpenButton = document.querySelector('.profile__add-button');
export const cards = document.querySelector('.cards__list');

export const inputObj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const openPopupPhoto = (name, link) => {
  viewPopupPhoto.open(name, link);
}
