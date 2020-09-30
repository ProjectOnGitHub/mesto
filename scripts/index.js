const popupProfile = document.querySelector('.popup_type-edit-profile');
const formProfile = popupProfile.querySelector('.popup__container');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');
const nameInput = formProfile.querySelector('.popup__input_name');
const jobInput = formProfile.querySelector('.popup__input_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
  document.addEventListener('click', closePopupOverlay);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
  document.removeEventListener('mousedown', closePopupOverlay);
}
function closePopupEscape(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === "Escape" && popupOpened) {
  closePopup(popupOpened);
  }
}

function closePopupOverlay(event) {
  if(event.target.classList.contains('popup')) {
      closePopup(event.target);
  }
};

function takeProfileValue() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function saveFormProfileValue() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}


function formSubmitProfileHandler(evt) {
  evt.preventDefault();
  saveFormProfileValue();
  closePopup(popupProfile);
}

formProfile.addEventListener('submit', formSubmitProfileHandler);

const popupPlace = document.querySelector('.popup_type-add-place');
const formPlace = popupPlace.querySelector('.popup__container');
const popupPlaceOpenButton = document.querySelector('.profile__add-button')
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');
const cardTemplate = document.querySelector('.cards__template').content;
const cards = document.querySelector('.cards__list');
const cardsItem = document.querySelector('.cards__list-item');
const placeInput = formPlace.querySelector('.popup__input_place');
const urlInput = formPlace.querySelector('.popup__input_url');

function render() {
  initialCards.forEach(renderItem);
}

function renderItem({ link, name }) {
  const card = createCard({ link, name });
  cards.appendChild(card);
}


function createCard({ link, name }) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.cards__image');
  card.querySelector('.cards__title').innerText = name;
  card.querySelector('.cards__image').src = link;
  card.querySelector('.cards__image').alt = name;
  cardImage.addEventListener('click', event => {
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardImage.alt;
    openPopup(popupPhoto);
  });
  card.querySelector('.cards__like').addEventListener('click', likeToogle);
  card.querySelector('.cards__delete-button').addEventListener('click', deleteCard);
  return card;
}

function likeToogle(evt) {
  evt.target.classList.toggle('cards__like_active');
}

function deleteCard(evt) {
  evt.target.parentNode.remove();
}

formPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameValue = placeInput.value;
  const linkValue = urlInput.value;
  const newCard = {
    name: nameValue,
    link: linkValue
  }
  formPlace.reset()
  const card = createCard(newCard);
  closePopup(popupPlace);
  cards.prepend(card);
});

render();

const popupPhoto = document.querySelector('.popup_type-view-image');
const popupPhotoOpenButton = document.querySelectorAll('.cards__image');
const popupPhotoTitle = document.querySelectorAll('.cards__title');
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__close-button');
const popupImage = popupPhoto.querySelector('.popup__image');
const popupCaption = popupPhoto.querySelector('.popup__caption');

popupProfileOpenButton.addEventListener('click', () => {
  takeProfileValue();
  openPopup(popupProfile)
});

popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
popupPlaceOpenButton .addEventListener('click', () => openPopup(popupPlace));
popupPlaceCloseButton.addEventListener('click', () => closePopup(popupPlace));
popupPhotoCloseButton.addEventListener('click', () => closePopup(popupPhoto));
