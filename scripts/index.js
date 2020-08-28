// Popup
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


// Редактирование имени и информации о себе

// Находим форму в DOM
let formElement = document.querySelector('.popup__container'); // Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = formElement.querySelector('.popup__input_name'); // Воспользуйтесь инструментом .querySelector()
    let jobInput = formElement.querySelector('.popup__input_job'); // Воспользуйтесь инструментом .querySelector()
    let profileName = document.querySelector('.profile__title');
    let profileJob = document.querySelector('.profile__subtitle');
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupToggle();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


