import { viewPopupPhoto } from '../pages/index.js';

export const popupProfile = document.querySelector('.popup_type-edit-profile');
export const formProfile = popupProfile.querySelector('.popup__container');
export const popupProfileOpenButton = document.querySelector('.profile__edit-button');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__subtitle');

export const popupPlace = document.querySelector('.popup_type-add-place');
export const formPlace = popupPlace.querySelector('.popup__container');
export const popupPlaceOpenButton = document.querySelector('.profile__add-button');
export const formPlaceSubmitButton = formPlace.querySelector('.popup__submit-button');
export const cards = document.querySelector('.cards__list');
export const placeInput = formPlace.querySelector('.popup__input_place');
export const urlInput = formPlace.querySelector('.popup__input_url');

export const popupPhoto = document.querySelector('.popup_type-view-image');
export const inputObj = {
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
  popupPhotoCaption.textContent = name;
  popupPhotoImage.alt = name;
  viewPopupPhoto.open(popupPhoto);
  popupPhotoImage.src = link;
}
