const initialCards = [
  {
    name: 'Андромеда',
    link: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7'
  },
  {
    name: 'Луна',
    link: 'https://images.unsplash.com/photo-1509647648544-a3e09b751ad6'
  },
  {
    name: 'Сомбреро',
    link: 'https://images.unsplash.com/photo-1560740583-0664e57560e4'
  },
  {
    name: 'Земля',
    link: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa'
  },
  {
    name: 'Млечный путь',
    link: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99'
  },
  {
    name: 'Солнце',
    link: 'https://images.unsplash.com/photo-1575881875475-31023242e3f9'
  }
];


// Попап Редактировать профиль //
// Объявляем переменные для попапа Редактировать профиль
const popupProfile = document.querySelector('.popup_type-edit-profile');
const formProfile = popupProfile.querySelector('.popup__container');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');
const nameInput = formProfile.querySelector('.popup__input_name');
const jobInput = formProfile.querySelector('.popup__input_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

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
function formSubmitProfileHandler(evt) {
  evt.preventDefault();
  // Получаем значение полей из свойства value для profile
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupProfileClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', formSubmitProfileHandler);


// Попап Новое место //
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

// Создаем функции, которые будут открывать/закрывать popup Новое место
function popupPlaceOpen() {
  popupPlace.classList.toggle('popup_opened');
}
function popupPlaceClose() {
  popupPlace.classList.toggle('popup_opened');
  formPlace.reset();
}

// Навешиваем обработчики событий на кнопки, которые будут открывать/закрывать popup Новое место
popupPlaceOpenButton.addEventListener('click', popupPlaceOpen);
popupPlaceCloseButton.addEventListener('click', popupPlaceClose);

function render() {
  initialCards.forEach(renderItem);
}


function renderItem({ link, name }) {
  const newCard = cardTemplate.cloneNode(true);
  const cardImage = newCard.querySelector('.cards__image');
  newCard.querySelector('.cards__title').innerText = name;
  newCard.querySelector('.cards__image').src = link;
  newCard.querySelector('.cards__image').alt = name;
  cardImage.addEventListener('click', event => {
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardImage.alt;
  });
  newCard.querySelector('.cards__like').addEventListener('click', event => {
    event.target.classList.toggle('cards__like_active')
  });
  newCard.querySelector('.cards__delete-button').addEventListener('click', event => {
    const cardDeleteButton = event.target.closest('.cards__list-item')
    cardDeleteButton.remove()
  });
  cards.prepend(newCard);
}
render();
formPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameValue = placeInput.value;
  const linkValue = urlInput.value;
  const newCard = {
    name: nameValue,
    link: linkValue
  }
  popupPlaceClose();
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

// Создаем функцию для открытия попапа изображение
popupPhotoOpenButton.forEach(item => item.addEventListener('click', function () {
  popupPhoto.classList.toggle('popup_opened');
}))

// Создаем функцию, которая будет закрывать попап Изображение
function popupPhotoClose() {
  popupPhoto.classList.toggle('popup_opened');
}

// Навешиваем обработчики событий на кнопки, которые будут закрывать попап Изображение
popupPhotoCloseButton.addEventListener('click', popupPhotoClose);

