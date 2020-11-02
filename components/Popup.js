export default class Popup {
  constructor( {popupSelector} ) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }


  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _closePopupByOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        this.close();
    }
}


  setEventListeners() {
    this._popupSelector.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));
    this._popupSelector.addEventListener('mousedown', this._closePopupByOverlayClick.bind(this));
  }
}
