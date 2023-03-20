import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards, cardSelectors, validateSelectors} from './constants.js';

// Клавиша Esc
const keyEscape = 'Escape';

// Секция карточек
const sectionCards = document.querySelector('.foto-card');

// Информация о профиле на странице
const profileName = document.querySelector('.profile__name');                     // Имя на странице
const profileAboutYourSelf = document.querySelector('.profile__about-yourself');  // О себе на странице

// Все popup-ы
const popUps = document.querySelectorAll('.popup');

// popup редактирования профиля
const popupEditProfile = document.querySelector('.popup_edit_profile');                         // popup редактирования профиля
const inputProfileName = popupEditProfile.querySelector('.popup-form__input_profile_name');     // поле Имя
const inputProfileJob = popupEditProfile.querySelector('.popup-form__input_profile_activity');  // поле О себе
const btnEditProfileClose = popupEditProfile.querySelector('.popup__btn-close');                // кнопка закрытия
const btnEditProfileSubmit = popupEditProfile.querySelector('.popup-form__btn');                // кнопка submit
const formEditProfile = popupEditProfile.querySelector('.popup-form');                          // форма редактирования профиля

// popup добавления нового места
const popupNewPlace = document.querySelector('.popup_new_place');                     // popup добавления нового места
const inputPlaceName = popupNewPlace.querySelector('.popup-form__input_place_name');  // поле имя места
const inputPlaceLink = popupNewPlace.querySelector('.popup-form__input_place_link');  // поле ссылка
const btnNewPlaceClose = popupNewPlace.querySelector('.popup__btn-close');            // кнопка закрытия
const btnNewPlaceSubmit = popupNewPlace.querySelector('.popup-form__btn');            // кнопка submit
const formNewPlace = popupNewPlace.querySelector('.popup-form');                      // форма добавления нового места

// popup Zoom
const popupZoom = document.querySelector('.popup-zoom');                 // popup Zoom
const zoomImg = popupZoom.querySelector('.popup-zoom__image');           // картинка
const zoomText = popupZoom.querySelector('.popup-zoom__text');           // текст
const btnZoomClose = popupZoom.querySelector('.popup-zoom__btn-close');  // кнопка закрытия

// кнопки на странице
const btnProfileEdit = document.querySelector('.profile__btn-edit');     // кнопка редактирования профиля
const btnAddNewPlace = document.querySelector('.profile__btn-place');    // кнопка добавления новых мест


// Хэндлер нажатия клавиши esc
function handleEscKeydown(evt) {
    // если нажата клавиша Escape
    if (evt.key === keyEscape) {
      const openedPopup = document.querySelector('.popup_opened');
      
      hidePopUp(openedPopup); 
    }
};


// Показать popup
function showPopUp(popup) {
  popup.classList.add('popup_opened');
  
  // Добавить событие прослушивания клавиши esc на document-е
  document.addEventListener('keydown', handleEscKeydown);
}


// Скрыть popup
function hidePopUp(popup) {
  popup.classList.remove('popup_opened');

  // удалить событие прослушивания клавиши esc на document-е
  document.removeEventListener('keydown', handleEscKeydown);
}


// Показать форму редактирования профиля
function showEditProfileForm() {
 
  // Найти все error-элементы в форме
  const errorElements = Array.from(popupEditProfile.querySelectorAll('.popup-form__input-error'));
  // Найти все input-элементы в форме
  const inputElements = Array.from(popupEditProfile.querySelectorAll('.popup-form__input'));
 
  // перечислить error-элементы и "сбросить" их
  errorElements.forEach((element) => {
    // убрать классы
    element.classList.remove('popup-form__input-error_active');
  });

  // перечислить error-элементы и "сбросить" их
  inputElements.forEach((element) => {
    // убрать классы
    element.classList.remove('popup-form__input_type_error');
  });

  // Включить кнопку submit
  btnEditProfileSubmit.classList.remove('popup-form__btn_disable');
  btnEditProfileSubmit.removeAttribute('disabled');
 
  // Скопировать поля профиля на странице в форму
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
  
  const data = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value,
  }

  const cardElement = getCardElement(data);

  // отрисовать карточку места
  renderCard (cardElement);

  // скрыть popup
  hidePopUp(popupNewPlace);

  // очистить форму и отключить кнопку
  formNewPlace.reset();
  btnNewPlaceSubmit.classList.add('popup-form__btn_disable');
  btnNewPlaceSubmit.setAttribute('disabled', true);
}


// Возвращает cardElement
function getCardElement(data) {
  const card = new Card(data, cardSelectors, showZoom);
  const cardElement = card.getCard();
  return cardElement;
}


//Функция загрузки заранее данных карточек 
function createDefaultCards() {
  initialCards.forEach(item => {
    
    const cardElement = getCardElement(item);
    
    renderCard(cardElement);

  });
}


function renderCard(cardElement) {
  sectionCards.prepend(cardElement);
}


// Функция поиска и добавления проверки валидации по всем формам,
// которые будут найдены на странице
function enableValidation() {
  // все формы
  const formList = Array.from(document.querySelectorAll(validateSelectors.formSelector));

  // перечислить и добавить валидацию
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(validateSelectors, formElement);
    formValidator.enableValidation();
  });

};


// Добавить слушателей событий 
function addEvents() {
  btnProfileEdit.addEventListener('click', showEditProfileForm);
  btnAddNewPlace.addEventListener('click', showNewPlaceForm);
  
  // добавить обработчика события всем popup-ам
  popUps.forEach((popupItem) => {
    popupItem.addEventListener('mousedown', (evt) => {
      if (evt.target == popupItem) {
        hidePopUp(popupItem);
      } 
    });   
  });

  // добавить обработчики события кнопкам закрытия всех форм
  btnEditProfileClose.addEventListener('click', () => hidePopUp(popupEditProfile));
  btnNewPlaceClose.addEventListener('click', () => hidePopUp(popupNewPlace));
  btnZoomClose.addEventListener('click', () => hidePopUp(popupZoom));

  // добавить обработчики события отправки форм
  formEditProfile.addEventListener('submit', handleFormSubmitProfile);
  formNewPlace.addEventListener('submit', handleFormSubmitPlace);
}


// Добавить события
addEvents();
// создать карточки из массива 
createDefaultCards();
// включить валидацию форм
enableValidation();