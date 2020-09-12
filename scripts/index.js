
// Объявляем переменные для попапов
const popupProfile = document.querySelector('.popup_type-edit-profile');
const popupPlace = document.querySelector('.popup_type-add-place');
const popupImage = document.querySelector('.popup_type-view-image');

//Объявляем переменные для форм
const formProfile = popupProfile.querySelector('.popup__container');
const formPlace = popupPlace.querySelector('.popup__container');

//Объявляем переменные для полей форм
const nameInput = popupProfile.querySelector('.popup__input_name');
const jobInput = popupProfile.querySelector('.popup__input_job');
const placeInput = popupPlace.querySelector('.popup__input_place');
const urlInput = popupPlace.querySelector('.popup__input_url');

//Объявляем переменные для кнопок
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');
const popupPlaceOpenButton = document.querySelector('.profile__add-button')
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');
const popupImageOpenButton = document.querySelectorAll('.cards__image');
const popupImageCloseButton = popupImage.querySelector('.popup__close-button');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

// Создаем функцию, которая будет открывать popup Редактировать профиль
function popupProfileOpen() {
  popupProfile.classList.toggle('popup_opened');
}

// Создаем функцию, которая будет закрывать popup Редактировать профиль
function popupProfileClose() {
  popupProfile.classList.toggle('popup_opened');
}

// Создаем функцию, которая будет открывать popup Новое место
function popupPlaceOpen() {
  popupPlace.classList.toggle('popup_opened');
}

// Создаем функцию, которая будет закрывать popup Новое место
function popupPlaceClose() {
  popupPlace.classList.toggle('popup_opened');
}

// Создаем функцию, которая будет открывать popup изображение
function popupImageOpen() {
  popupImage.classList.toggle('popup_opened');
}

// Создаем функцию, которая будет закрывать popup изображение
function popupImageClose() {
  popupImage.classList.toggle('popup_opened');
}

// Навешиваем обработчики событий на кнопки, которые будут открывать/закрывать popup Редактировать профиль
popupProfileOpenButton.addEventListener('click', popupProfileOpen);
popupProfileCloseButton.addEventListener('click', popupProfileClose);

// Навешиваем обработчики событий на кнопки, которые будут открывать/закрывать popup Новое место
popupPlaceOpenButton.addEventListener('click', popupPlaceOpen);
popupPlaceCloseButton.addEventListener('click', popupPlaceClose);

// Навешиваем обработчики событий на кнопки, которые будут открывать/закрывать popup Изображение
popupImageOpenButton.addEventListener('click', popupImageOpen);
popupImageCloseButton.addEventListener('click', popupImageClose);

// Форма Редактировать профиль
// Объявляем переменные


// Получаем значения для полей формы из profile
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;//

// Создаем функцию, которая сохраняет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.
    // Получите значение полей из свойства value для profile
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupProfileClose();
  }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', formSubmitHandler);
