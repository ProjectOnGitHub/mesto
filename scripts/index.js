// Объявляем переменные для попапа Редактировать профиль
const popupProfile = document.querySelector('.popup_type-edit-profile');
const formProfile = popupProfile.querySelector('.popup__container');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');
const nameInput = formProfile.querySelector('.popup__input_name');
const jobInput = formProfile.querySelector('.popup__input_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

// Создаем функции, которые будут открывать/закрывать popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
  document.addEventListener('click', closePopupOverlay);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
  document.removeEventListener('click', closePopupOverlay);
}
// Закрываем попапы по Escape
function closePopupEscape(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === "Escape" && popupOpened) {
  closePopup(popupOpened);
  }
}

// Закрываем попапы по клику по темному фону
function closePopupOverlay(event) {
  if(event.target.classList.contains('popup')) {
      closePopup(event.target);
  }
};

// Получаем значения для полей формы из profile
function takeProfileValue() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function saveFormProfileValue() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}


// Создаем функцию, которая сохраняет значения попап Редактировать профиль
function formSubmitProfileHandler(evt) {
  evt.preventDefault();
  // Получаем значение полей из свойства value для profile
  saveFormProfileValue();
  closePopup(popupProfile);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', formSubmitProfileHandler);

// Объявляем переменные для попапа Новое место
const popupPlace = document.querySelector('.popup_type-add-place');
const formPlace = popupPlace.querySelector('.popup__container');
const popupPlaceOpenButton = document.querySelector('.profile__add-button')
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');
const cardTemplate = document.querySelector('.cards__template').content;
const cards = document.querySelector('.cards__list');
const cardsItem = document.querySelector('.cards__list-item');
const placeInput = formPlace.querySelector('.popup__input_place');
const urlInput = formPlace.querySelector('.popup__input_url');

//Перебираем массив
function render() {
  initialCards.forEach(renderItem);
}

//Собираем карточку
function renderItem({ link, name }) {
  const newCard = cardTemplate.cloneNode(true);
  const cardImage = newCard.querySelector('.cards__image');
  newCard.querySelector('.cards__title').innerText = name;
  newCard.querySelector('.cards__image').src = link;
  newCard.querySelector('.cards__image').alt = name;
  //Передаем значения в попап Изображение
  cardImage.addEventListener('click', event => {
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardImage.alt;
  });
  //Лайк карточки
  newCard.querySelector('.cards__like').addEventListener('click', event => {
    event.target.classList.toggle('cards__like_active')
  });
  //Удаление карточки
  newCard.querySelector('.cards__delete-button').addEventListener('click', event => {
    const cardDeleteButton = event.target.closest('.cards__list-item')
    cardDeleteButton.remove()
  });
  //Вывод карточки в начало
  cards.prepend(newCard);
}
render();
//Передаем значения для новой карточки из формы Новое место
formPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameValue = placeInput.value;
  const linkValue = urlInput.value;
  const newCard = {
    name: nameValue,
    link: linkValue
  }
  closePopup(popupPlace);
  formPlace.reset()
  renderItem(newCard);
});



// Попап Изображение //
// Объявляем переменные для попапа Изображение
const popupPhoto = document.querySelector('.popup_type-view-image');
const popupPhotoOpenButton = document.querySelectorAll('.cards__image');
const popupPhotoTitle = document.querySelectorAll('.cards__title');
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__close-button');
const popupImage = popupPhoto.querySelector('.popup__image');
const popupCaption = popupPhoto.querySelector('.popup__caption');

// Навешиваем обработчики событий на кнопки, которые будут открывать/закрывать popup
popupProfileOpenButton.addEventListener('click', () => {
  takeProfileValue();
  openPopup(popupProfile)
});
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
popupPlaceOpenButton .addEventListener('click', () => openPopup(popupPlace));
popupPlaceCloseButton.addEventListener('click', () => closePopup(popupPlace));
popupPhotoOpenButton.forEach(item => item.addEventListener('click', () => openPopup(popupPhoto)));
popupPhotoCloseButton.addEventListener('click', () => closePopup(popupPhoto));
