export default class Card {
  constructor({ name, link, userId, ownerId, cardId, likes, cardSelector, handleCardClick, handleLikeClick, handleDeleteIconClick }) {
    this._name = name;
    this._link = link;
    this._userId = userId;
    this._ownerId = ownerId;
    this._cardId = cardId;
    this._likes = likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.cloneNode(true).children[0];
  }

  generateCard() {
    this._element = this._getTemplate();
    if (this._userId === this._ownerId) {
      this._element.querySelector('.cards__delete-button')
        .classList.add('cards__delete-button_visible');
    } else {
      this._element.querySelector('.cards__delete-button')
        .classList.add('cards__delete-button_hidden');
    };
    this._element.querySelector('.cards__image').src = this._link;
    this._element.querySelector('.cards__image').alt = this._name;
    this._element.querySelector('.cards__title').textContent = this._name;
    this._setEventListeners();
    this.renderLikeCard();
    return this._element;
  }

  _setEventListeners() {
    this._likeElement = this._element.querySelector('.cards__like');
    this._element.querySelector('.cards__delete-button').addEventListener('click', () => {
      this._handleDeleteIconClick(this);
    });
    this._likeElement.addEventListener('click', () => {
      this._handleLikeClick(this);
    });
    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this._openPopupWithImage();
    });
  }

  deleteCard() {
    this._element.remove();
  }

  _openPopupWithImage() {
    this._handleCardClick(
      this._name,
      this._link,
    )
  }

  ifLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  renderLikeCard() {
    this._element.querySelector('.cards__like-counter').textContent = this._likes.length;
    if (this.ifLiked()) {
      this._likeElement.classList.add('cards__like_active');
    } else {
      this._likeElement.classList.remove('cards__like_active');
    }

  }
}
