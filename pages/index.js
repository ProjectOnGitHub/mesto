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

// добавление карточки
const addPlace = (evt) => {
  evt.preventDefault();
  const newCard = {
      name: placeInput.value,
      link: urlInput.value,
  }
  const card = new Card(newCard, '.cards__template', openPopupPhoto);
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

export const viewPopupPhoto = new PopupWithImage({popupSelector: popupPhoto});
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
popupPlace.addEventListener('submit', addPlace);
