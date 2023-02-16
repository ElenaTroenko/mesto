// Шаблон карточки места
const cardTemplate = document.querySelector('#template-card').content;

// Секция карточек
const sectionCards = document.querySelector('.foto-card');

// Информация о профиле на странице
const profileName = document.querySelector('.profile__name');                     // Имя на странице
const profileAboutYourSelf = document.querySelector('.profile__about-yourself');  // О себе на странице

// popup редактирования профиля
const popupEditProfile = document.querySelector('.popup_edit_profile');                         // popup редактирования профиля
const inputProfileName = popupEditProfile.querySelector('.popup-form__input_profile_name');     // поле Имя
const inputProfileJob = popupEditProfile.querySelector('.popup-form__input_profile_activity');  // поле О себе
const btnEditProfileClose = popupEditProfile.querySelector('.popup__btn-close');                // кнопка закрытия
const formEditProfile = popupEditProfile.querySelector('.popup-form');                          // форма редактирования профиля

// popup добавления нового места
const popupNewPlace = document.querySelector('.popup_new_place');                     // popup добавления нового места
const inputPlaceName = popupNewPlace.querySelector('.popup-form__input_place_name');  // поле имя места
const inputPlaceLink = popupNewPlace.querySelector('.popup-form__input_place_link');  // поле ссылка
const btnNewPlaceClose = popupNewPlace.querySelector('.popup__btn-close');            // кнопка закрытия
const formNewPlace = popupNewPlace.querySelector('.popup-form');                      // форма добавления нового места

// popup Zoom
const popupZoom = document.querySelector('.popup-zoom');                 // popup Zoom
const zoomImg = popupZoom.querySelector('.popup-zoom__image');           // картинка
const zoomText = popupZoom.querySelector('.popup-zoom__text');           // текст
const btnZoomClose = popupZoom.querySelector('.popup-zoom__btn-close');  // кнопка закрытия

// кнопки на странице
const btnProfileEdit = document.querySelector('.profile__btn-edit');   // кнопка редактирования профиля
const btnAddNewPlace = document.querySelector('.profile__btn-place');  // кнопка добавления новых мест


// Показать popup
function showPopUp(popup) {
  popup.classList.add('popup_opened');
}


// Скрыть popup
function hidePopUp(popup) {
  popup.classList.remove('popup_opened');
}


// Показать форму редактирования профиля
function showEditProfileForm() {
  // Заполнить поля
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileAboutYourSelf.textContent;

  // Показать popup
  showPopUp(popupEditProfile);
}


// Показать форму добавления места
function showNewPlaceForm() {
 // Показать popup
  showPopUp(popupNewPlace);
}


// Показать Zoom
function showZoom(text, src) {
  zoomText.textContent = text;
  zoomImg.src = src;
  zoomImg.alt = text;
  
  showPopUp(popupZoom);
}


// Передать отредактированный профиль
function handleFormSubmitProfile(evt) {
  evt.preventDefault();  // не перегружать страницу в браузере
  
  profileName.textContent = inputProfileName.value;
  profileAboutYourSelf.textContent = inputProfileJob.value;

  // скрыть popup
  hidePopUp(popupEditProfile);
}  


// Передать новое место
function handleFormSubmitPlace(evt) {
  evt.preventDefault();  // не перегружать страницу в браузере
  
  const cardElement = createFotoCard(inputPlaceName.value, inputPlaceLink.value);

  renderCard (cardElement);

  // скрыть popup
  hidePopUp(popupNewPlace);

  // очистить форму
  formNewPlace.reset();
}


// Включает/выключает сердечко
function changeHeart(element) {
  element.classList.toggle('foto-card__button-heart_active');
}


// функция для создания карточки из шаблона html
function createFotoCard(name, link){
  const cardElement = cardTemplate.querySelector('.foto-card__item').cloneNode(true);
  const cardElementImg = cardElement.querySelector('.foto-card__img');
  const heartElement = cardElement.querySelector('.foto-card__button-heart');
  const basketBtn = cardElement.querySelector('.foto-card__basket');
  
  cardElement.querySelector('.foto-card__title').textContent = name;
  cardElementImg.src = link;
  cardElementImg.alt = `Фото места: ${name}`;
  
  // добавить событие удаления карточки
  basketBtn.addEventListener('click', () => cardElement.remove());
  // добавить событие смены сердечка
  heartElement.addEventListener('click', event => changeHeart(event.target));
  // добавить событие показа Зума
  cardElementImg.addEventListener('click', () => showZoom(name, cardElementImg.src)); 

  return cardElement;
}

function renderCard(cardElement) {
  sectionCards.prepend(cardElement);
}


//Функция загрузки карточек из массива
function createDefaultCards() {
  initialCards.forEach(item => {
    const cardElement = createFotoCard(item.name, item.link);
    
    renderCard(cardElement);
  });
}


// Добавить слушателей событий 
function addEvents() {
  btnProfileEdit.addEventListener('click', showEditProfileForm);
  btnAddNewPlace.addEventListener('click', showNewPlaceForm);
  
  btnEditProfileClose.addEventListener('click', () => hidePopUp(popupEditProfile));
  btnNewPlaceClose.addEventListener('click', () => hidePopUp(popupNewPlace));
  btnZoomClose.addEventListener('click', () => hidePopUp(popupZoom));
  
  formEditProfile.addEventListener('submit', handleFormSubmitProfile);
  formNewPlace.addEventListener('submit', handleFormSubmitPlace);
}


// Добавить события
addEvents();
// создать карточки из массива 
createDefaultCards();