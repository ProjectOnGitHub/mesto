import '../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
//import PopupWithFormConfirm from '../components/PopupWithFormConfirm.js';
import Api from '../components/Api.js';
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
/* новый код  */

let userId;
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  cohortId: 'cohort-21',
  token: '5391666e-5e33-4f71-9923-de80d868b155',
});

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(
    ([cards, userData]) => {
      userId = userData._id;
      user.setUserInfo({
        userName: userData.name,
        userJob: userData.about,
        userAvatar: userData.avatar
      });

      cardList.renderItems(cards.reverse());
    })
  .catch(err => console.log(`Ошибка загрузки данных: ${err}`))

/* кодец нового кода */



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
    cardsList.prependItem(createCard(item));
  }
})
popupPlaceForm.setEventListeners();

const user = new UserInfo({
  userNameSelector: '.profile__title',
  userJobSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__image'
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
