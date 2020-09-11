// popup
// Объявляем переменные для попапов
const popupProfile = document.querySelector('.popup_type-edit-profile');
const popupPlace = document.querySelector('.popup_type-add-place');
//const popup
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupPlaceOpenButton = document.querySelector('.profile__add-button')
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');

// Создаем функцию, которая будет открывать popup Редактировать профиль
function popupProfileOpen() {
  popupProfile.classList.toggle('popup_opened');
}

// Создаем функцию, которая будет открывать popup Новое место
function popupPlaceOpen() {
  popupPlace.classList.toggle('popup_opened');
}

// Создаем функцию, которая будет закрывать popup Редактировать профиль
function popupProfileClose() {
  popupProfile.classList.toggle('popup_opened');
}

// Создаем функцию, которая будет закрывать popup Новое место
function popupPlaceClose() {
  popupPlace.classList.toggle('popup_opened');
}

// Навешиваем обработчики событий на кнопки, которые будут открывать/закрывать popup Редактировать профиль
popupProfileOpenButton.addEventListener('click', popupProfileOpen);
popupProfileCloseButton.addEventListener('click', popupProfileClose);

// Навешиваем обработчики событий на кнопки, которые будут открывать/закрывать popup Новое место
popupPlaceOpenButton.addEventListener('click', popupPlaceOpen);
popupPlaceCloseButton.addEventListener('click', popupPlaceClose);

// Форма Редактировать профиль
// Объявляем переменные
let formElement = popupProfile.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

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
formElement.addEventListener('submit', formSubmitHandler);
