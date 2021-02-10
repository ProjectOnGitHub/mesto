import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import initialCards from '../utils/initialCards.js';
import {
  formProfile,
  popupProfileOpenButton,
  formPlace,
  popupPlaceOpenButton,
  cards,
  inputObj,
  inputName,
  inputJob,
  openPopupPhoto
} from '../utils/constants.js';

const createCard = (item) => {
  const card = new Card(item, '.cards__template', openPopupPhoto);
  return card.generateCard();
}

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
}, '.cards__list'
);
cardsList.renderItems();

const popupPlaceForm = new PopupWithForm({
  popupSelector: '.popup_type-add-place',
  handleFormSubmit: (item) => {
    cards.prepend(createCard(item));
  }
})
popupPlaceForm.setEventListeners();

const user = new UserInfo({
  userNameSelector: '.profile__title',
  userJobSelector: '.profile__subtitle'
});

const popupProfileForm = new PopupWithForm({
  popupSelector: '.popup_type-edit-profile',
  handleFormSubmit: (item) => {
    user.setUserInfo(item);
  }
})
popupProfileForm.setEventListeners();

export const viewPopupPhoto = new PopupWithImage({ popupSelector: '.popup_type-view-image' });
viewPopupPhoto.setEventListeners();

const formPlaceValidation = new FormValidator(inputObj, formPlace);
const formProfileValidation = new FormValidator(inputObj, formProfile);
formPlaceValidation.enableValidation();
formProfileValidation.enableValidation();

popupProfileOpenButton.addEventListener('click', () => {
  const profile = user.getUserInfo();
  inputName.value = profile.userName;
  inputJob.value = profile.userJob;
  user.getUserInfo();
  popupProfileForm.open();
  formProfileValidation.hideFormErrors();
});

popupPlaceOpenButton.addEventListener('click', () => {
  popupPlaceForm.open();
  formPlaceValidation.hideFormErrors();
})
