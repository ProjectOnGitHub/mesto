import PopupWithForm from '../components/PopupWithForm.js';

class PopupWithFormConfirm extends PopupWithForm {
  setSubmitConfirm(action) {
    this._handleFormSubmit = action;
  }
}

export default PopupWithFormConfirm;
