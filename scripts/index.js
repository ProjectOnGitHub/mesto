// popup
// Объявляем переменные
const popupProfile = document.querySelector('.popup_type-edit-profile');
const popupPlace = document.querySelector('.popup_type-add-place');
const popupOpenEditButton = document.querySelector('.profile__edit-button');
const popupOpenAddButton = document.querySelector('.profile__add-button')
const popupProfileClose = popupProfile.querySelector('.popup__close-button');
const popupPlaceClose = popupPlace.querySelector('.popup__close-button');

// Создаем функцию, которая будет открывать popup Редактировать профиль
function popupProfileOpen() {
  popupProfile.classList.toggle('popup_opened');
}

// Создаем функцию, которая будет открывать popup Новое место
function popupPlaceOpen() {
  popupPlace.classList.toggle('popup_opened');
}

function popupProfileClose() {
  popupProfile.classList.toggle('popup_opened');
}

function popupPlaceClose() {
  popupPlace.classList.toggle('popup_opened');
}

// Навешиваем обработчики событий на кнопки, которые будут открывать/закрывать popup
popupOpenEditButton.addEventListener('click', popupProfileOpen);
popupOpenAddButton.addEventListener('click', popupPlaceOpen);
popupProfileClose.addEventListener('click', popupProfileClose);

// Форма редактирования
// Объявляем переменные
let formElement = document.querySelector('.popup__container');
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
    popupClose();
  }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
