// Попап Редактировать профиль //
// Объявляем переменные для попапа Редактировать профиль
const popupProfile = document.querySelector('.popup_type-edit-profile');
const formProfile = popupProfile.querySelector('.popup__container');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');
let nameInput = formProfile.querySelector('.popup__input_name');
let jobInput = formProfile.querySelector('.popup__input_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

// Создаем функции, которые будут открывать/закрывать попап Редактировать профиль
function popupProfileOpen() {
  popupProfile.classList.toggle('popup_opened');
}
function popupProfileClose() {
  popupProfile.classList.toggle('popup_opened');
}
// Навешиваем обработчики событий на кнопки, которые будут открывать/закрывать попап Редактировать профиль
popupProfileOpenButton.addEventListener('click', popupProfileOpen);
popupProfileCloseButton.addEventListener('click', popupProfileClose);

// Получаем значения для полей формы из profile
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

// Создаем функцию, которая сохраняет значения попап Редактировать профиль
function formSubmitHandler (evt) {
  evt.preventDefault();
  // Получаем значение полей из свойства value для profile
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupProfileClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', formSubmitHandler);


// Попап Новое место //
// Объявляем переменные для попапа Новое место
const popupPlace = document.querySelector('.popup_type-add-place');
const formPlace = popupPlace.querySelector('.popup__container');
const popupPlaceOpenButton = document.querySelector('.profile__add-button')
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');
// Создаем функции, которые будут открывать/закрывать popup Новое место
function popupPlaceOpen() {
  popupPlace.classList.toggle('popup_opened');
}
function popupPlaceClose() {
  popupPlace.classList.toggle('popup_opened');
}
// Навешиваем обработчики событий на кнопки, которые будут открывать/закрывать popup Новое место
popupPlaceOpenButton.addEventListener('click', popupPlaceOpen);
popupPlaceCloseButton.addEventListener('click', popupPlaceClose);






const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector('.cards__template').content;
const cards = document.querySelector('.cards__list');
const newCard = cardTemplate.cloneNode(true);
const cardDeleteButton = newCard.querySelector('.cards__delete-button');
const placeInput = formPlace.querySelector('.popup__input_place');
const urlInput = formPlace.querySelector('.popup__submit-button');

function render() {
  initialCards.forEach(renderItem);
}

function renderItem({link, name}) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.cards__title').innerText = name;
  newCard.querySelector('.cards__image').src = link;
  newCard.querySelector('.cards__image').alt = name;
  cards.appendChild(newCard);

}

render();


const cardLike = document.querySelectorAll('.cards__like');
// Создаем функцию для открытия попапа изображение
cardLike.forEach(item => item.addEventListener('click', function(){
  item.classList.toggle('cards__like_active');
}))




// Попап Изображение //
// Объявляем переменные для попапа Изображение
const popupImage = document.querySelector('.popup_type-view-image');
const popupImageOpenButton = document.querySelectorAll('.cards__image');
const popupImageCloseButton = popupImage.querySelector('.popup__close-button');
// Создаем функцию для открытия попапа изображение
popupImageOpenButton.forEach(item => item.addEventListener('click', function(){
  popupImage.classList.toggle('popup_opened');
}))

// Создаем функцию, которая будет закрывать попап Изображение
function popupImageClose() {
  popupImage.classList.toggle('popup_opened');
}

// Навешиваем обработчики событий на кнопки, которые будут закрывать попап Изображение
popupImageCloseButton.addEventListener('click', popupImageClose);
