import { openPopup, popupPhoto } from '../scripts/index.js';
import Popup from '../components/Popup.js';
//import PopupWithImage from '../components/PopupWithImage.js';

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.cloneNode(true).children[0];
  }

  generateCard() {
    this._element = this._getTemplate();
    const placeImage = this._element.querySelector('.cards__image');
    placeImage.src = this._link;
    placeImage.alt = this._name;
    this._element.querySelector('.cards__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.cards__delete-button').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.cards__like').addEventListener('click', () => {
      this._likeToogle();
    });
    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this._openPopupPhoto();
    });
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeToogle() {
    this._element.querySelector('.cards__like').classList.toggle('cards__like_active');
  }

  _openPopupPhoto() {
    const cardImage = this._element.querySelector('.cards__image');
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardImage.alt;
    openPopup(popupPhoto);
  }
}

export default Card;
