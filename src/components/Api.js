class Api {
  constructor(options) {
    // тело конструктора
  }

  getInitialCards() {
    // ...
  }

  // другие методы работы с API
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: 'Добавить токен',
    'Content-Type': 'application/json'
  }
});

export default Api
