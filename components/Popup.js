export default class Popup {
  constructor( {popupSelector} ) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._closePopupOverlay);
  };

  _closePopupOverlay(event) {
    if (event.target == event.currentTarget) {
      this.close();
    }
  };

  _handleEscClose() {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', this._closePopupOverlay.bind(this));
  };
}
