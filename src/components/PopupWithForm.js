import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.popup__container');
    this._button = this._popup.querySelector('button[type="submit"]');
    this._buttonDefaultText = this._button.textContent;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  renderLoading(isLoading) {
    if (this._button.textContent = isLoading) {
      this._button.textContent = 'Сохранение...';
    } else {
      this._button.textContent = this._buttonDefaultText;
    }
  }
}
