export default class Api {
  constructor({ baseUrl, token, cohortId }) {
    this._baseUrl = baseUrl;
    this._token = token;
    this._cohortId = cohortId;
  }

  getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/${this._cohortId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this.getResponse)
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/${this._cohortId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this.getResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/${this._cohortId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then(this.getResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/${this._cohortId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this.getResponse)
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/${this._cohortId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this.getResponse)
  }

  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/${this._cohortId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token
      },
      body: JSON.stringify(avatar),
    })
      .then(this._getResponse)
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/${this._cohortId}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
      .then(this._getResponse)
  }

  dislikeCard(id) {
    return fetch(`${this._baseUrl}/${this._cohortId}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
      .then(this.getResponse)
  }
}

