// import '../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import initialCards from '../utils/initialCards.js';
import {
  popupProfile,
  formProfile,
  popupProfileOpenButton,
  profileName,
  profileJob,
  popupPlace,
  formPlace,
  popupPlaceOpenButton,
  formPlaceSubmitButton,
  cards,
  placeInput,
  urlInput,
  popupPhoto,
  inputObj,
  openPopupPhoto
} from '../utils/constants.js';

const createCard = (item) => {
  const card = new Card(item, '.cards__template', openPopupPhoto);
  const element = card.generateCard();
  return element;
}

// Экземпляр класса Section - отрисовка элементов на странице
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
}, '.cards__list'
);
cardsList.renderItems();



// Экземпляр класса PopupWithForm - форма добавления нового места
const popupPlaceForm = new PopupWithForm({
  popupSelector: '.popup_type-add-place',
  handleFormSubmit: (item) => {
    cards.prepend(createCard(item));
  }
})
popupPlaceForm.setEventListeners();


//Экземпляр класса UserInfo - отвечает за управление отображением информации о пользователе на странице.
//const user = new UserInfo(".profile__title", ".profile__subtitle");

const user = new UserInfo({
  userNameSelector: '.profile__title',
  userJobSelector: '.profile__subtitle',
});

// Экземпляр класса PopupWithForm - форма редактирования профиля
const popupProfileForm = new PopupWithForm({
  popupSelector: '.popup_type-edit-profile',
  handleFormSubmit: () => {
    user.setUserInfo();
  }
})
popupProfileForm.setEventListeners();

// Экземпляр класса PopupWithImage
export const viewPopupPhoto = new PopupWithImage({ popupSelector: '.popup_type-view-image' });
viewPopupPhoto.setEventListeners();


// Валидация
const formList = Array.from(document.querySelectorAll(inputObj.formSelector));
const formPlaceValidation = new FormValidator(inputObj, formPlace);
const formProfileValidation = new FormValidator(inputObj, formProfile);
formPlaceValidation.enableValidation();
formProfileValidation.enableValidation();

// Обработчики
popupProfileOpenButton.addEventListener('click', () => {
  formPlaceSubmitButton.classList.add(inputObj.inactiveButtonClass);
  formPlaceSubmitButton.setAttribute('disabled', true);
  user.getUserInfo();
  popupProfileForm.open();
  formProfileValidation.hideFormErrors();
});

popupPlaceOpenButton.addEventListener('click', () => {
  popupPlaceForm.open();
  formPlaceValidation.hideFormErrors();
})

// popupPlace.addEventListener('submit', addPlace);
