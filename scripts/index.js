// Объявляем переменные
let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');

// Создаем функцию, которая будет добавлять/удалять модификатор popup_opened
function popupToggle() {
  popup.classList.toggle('popup_opened');
}

// Навешиваем обработчики событий на кнопки, которые будут открывать/закрывать popup
popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
