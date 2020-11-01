export default class Popup {
  constructor( {popupSelector} ) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keyup', (evt) => this._handleEscClose(evt));
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keyup', (evt) => this._handleEscClose(evt));
  }


  _handleEscClose(evt) {
    const popupOpen = document.querySelector('.popup_opened');
    if (evt.key === "Escape") {
      this.close(popupOpen);
    }
  }

  _closePopupByOverlayClick(evt) {
    const popupOpen = document.querySelector('.popup_opened');
    if (evt.target === evt.currentTarget) {
        this.close(popupOpen);
    }
}


  setEventListeners() {
    this._popupSelector.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));
    document.addEventListener('keyup', this._handleEscClose);
    this._popupSelector.addEventListener('mousedown', this._closePopupByOverlayClick.bind(this));
  }
}
