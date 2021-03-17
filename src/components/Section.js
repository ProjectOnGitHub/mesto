export default class Section {
  constructor({ /*items, */renderer }, containerSelector) {
    // this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  addItem(element) {
    this._container.append(element);
  }

  renderItems(initialCards) {
    initialCards.forEach(item => {
      this._renderer(item);
    });
  }
}
