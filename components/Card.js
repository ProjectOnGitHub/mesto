export default class Card {
  constructor(data, cardSelector, openPopupPhoto) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openPopupPhoto = openPopupPhoto;
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
      this._openPopupWithImage();
    });
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeToogle() {
    this._element.querySelector('.cards__like').classList.toggle('cards__like_active');
  }

  _openPopupWithImage() {
    this._openPopupPhoto(
      this._name,
      this._link,
    )
  }

}
