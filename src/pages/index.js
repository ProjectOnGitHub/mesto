import '../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Api from '../components/Api.js';
import {
  //popupProfile,
  formProfile,
  popupProfileOpenButton,
  inputName,
  inputJob,
  //popupPlace,
  formPlace,
  //popupAvatar,
  formAvatar,
  popupPlaceOpenButton,
  popupAvatarOpenButton,
  //cards,
  inputObj,
  openPopupPhoto
} from '../utils/constants.js';

const user = new UserInfo({
  userNameSelector: '.profile__title',
  userJobSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__image'
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  cohortId: 'cohort-21',
  token: '5391666e-5e33-4f71-9923-de80d868b155',
});

let userId;

const createCard = (item) => {
  const card = new Card({
    name: item.name,
    link: item.link,
    userId: userId,
    ownerId: item.owner._id,
    cardId: item._id,
    cardSelector: '.cards__template',
    handleCardClick: openPopupPhoto,
    handleDeleteIconClick: (card) => {
      popupConfirmForm.open();
      popupConfirmForm.setSubmitCallback(() => {
        api.deleteCard(item._id)
          .then(() => {
            card.deleteCard();
            popupConfirmForm.close();
          })
          .catch(err => console.log(`Ошибка при удалении карточки: ${err}`))
      });
    }
  });
  return card.generateCard();
}

// Рендеринг карточек
const cardsList = new Section({
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
}, '.cards__list'
);

// Попап добавления нового места
const popupPlaceForm = new PopupWithForm({
  popupSelector: '.popup_type-add-place',
  handleFormSubmit: (item) => {
    popupPlaceForm.renderLoading(true);
    api.addCard(item)
      .then((data) => {
        cardsList.addItem(createCard(data));
        popupPlaceForm.close;
      })
      .catch(err => console.log(`Ошибка добавление карточки: ${err}`))
      .finally(() => popupPlaceForm.renderLoading(false));
  }
});
popupPlaceForm.setEventListeners();

// Попап обновления профиля
const popupProfileForm = new PopupWithForm({
  popupSelector: '.popup_type-edit-profile',
  handleFormSubmit: (item) => {
    popupProfileForm.renderLoading(true);
    api.changeUserInfo({
      name: item.userName,
      about: item.userJob
    })
      .then((info) => {
        user.setUserInfo({
          userName: info.name,
          userJob: info.about,
        })
        popupProfileForm.close();
      })
      .catch(err => console.log(`Ошибка при обновлении профиля пользователя: ${err}`))
      .finally(() => popupProfileForm.renderLoading(false));
  }
});
popupProfileForm.setEventListeners();

// Попап обновления аватара
const popupAvatarForm = new PopupWithForm({
  popupSelector: '.popup_type-edit-avatar',
  handleFormSubmit: (item) => {
    popupAvatarForm.renderLoading(true);
    api.changeUserAvatar({
      avatar: item.userAvatar,
    })
      .then((info) => {
        user.setUserAvatar({
          userAvatar: info.avatar,
        });
        popupAvatarForm.close();
      })
      .catch(err => console.log(`Ошибка при изменении аватара пользователя: ${err}`))
      .finally(() => popupAvatarForm.renderLoading(false));
  }
});
popupAvatarForm.setEventListeners();


// Попап подтверждения удаления формы
const popupConfirmForm = new PopupWithConfirm({
  popupSelector: '.popup_type-delete-card'
});
popupConfirmForm.setEventListeners();

// Попап изображения
export const viewPopupPhoto = new PopupWithImage({ popupSelector: '.popup_type-view-image' });
viewPopupPhoto.setEventListeners();

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(
    ([initialCards, info]) => {
      userId = info._id;
      user.setUserInfo({
        userName: info.name,
        userJob: info.about,
      });
      user.setUserAvatar({
        userAvatar: info.avatar,
      });
      cardsList.renderItems(initialCards.reverse());
    })
  .catch(err => console.log(`Ошибка: ${err}`))






// Обработчики

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

popupAvatarOpenButton.addEventListener('click', () => {
  popupAvatarForm.open();
  formAvatarValidation.hideFormErrors();
});


// Валидация форм
const formPlaceValidation = new FormValidator(inputObj, formPlace);
formPlaceValidation.enableValidation();
const formProfileValidation = new FormValidator(inputObj, formProfile);
formProfileValidation.enableValidation();
const formAvatarValidation = new FormValidator(inputObj, formAvatar);
formAvatarValidation.enableValidation();
