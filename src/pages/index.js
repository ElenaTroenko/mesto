import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
// import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards, cardSelectors, validateSelectors,
  popupNewPlaceSelectors, popupZoomSelectors, editProfileSelectors,
  userProfileSelectors, inputSelectors, buttonsSelectors,
  sectionElementsSelectors} from '../utils/constants.js';
import './index.css';


// Клавиша Esc
const keyEscape = 'Escape';


// кнопки на странице
const btnProfileEdit = document.querySelector(buttonsSelectors.btnEditProfileSelector);  // кнопка редактирования профиля
const btnAddNewPlace = document.querySelector(buttonsSelectors.btnAddNewPlaceSelector);  // кнопка добавления новых мест

// Инициализация массива валидаторов
const validatorList = [];

// ГЛОБАЛЬНЫЕ ОБЪЕКТЫ
// Секция карточек мест
const sectionCards = new Section({items: getDefaultCards(), renderer: renderCard}, sectionElementsSelectors.fotoCardSelector);
// Попап с зумом
const popupZoom = new PopupWithImage(popupZoomSelectors, disableDocumentListeners);
// Попап с формой добавления нового мета
const popupNewPlace = new PopupWithForm(popupNewPlaceSelectors, disableDocumentListeners, handleFormSubmitPlace);
// Попап с формой редактирования профиля
const popupEditProfile = new PopupWithForm(editProfileSelectors, disableDocumentListeners, handleFormSubmitProfile);
// Объект пользовательского профиля
const userInfo = new UserInfo(userProfileSelectors);


// Хэндлер нажатия клавиши esc
function handleEscKeydown(evt) {
    // если нажата клавиша Escape
    if (evt.key === keyEscape) {
      closeAllPopups(); 
    }
};


// Закрывает все попапы на странице
function closeAllPopups() {
  popupZoom.close();
  popupNewPlace.close();
  popupEditProfile.close();
}


// Показать попап с зумом
function showZoom(text, src) {
  enableDocumentListeners();  // предварительно включаются слушатели событий на document
  popupZoom.open({imageSrc: src, imageTitle: text})
}


// Хендлер для смены данных в профиле пользователя
function handleFormSubmitProfile(evt, inputDataItems) {
  evt.preventDefault();  // не перегружать страницу в браузере

  // скрыть popup редактирования профиля
  popupEditProfile.close(); 
  
  // готовим объект информации о профиле
  const userInfoData = {
    userName: inputDataItems.filter(inputData => inputData.classList.contains(editProfileSelectors.inputProfileNameClass))[0].value,
    aboutUser: inputDataItems.filter(inputData => inputData.classList.contains(editProfileSelectors.inputProfileJobClass))[0].value,
  }

  // сменить информацию о пользователе
  userInfo.setUserInfo(userInfoData);
}  


// Хендлер для передачи нового места
function handleFormSubmitPlace(evt, inputDataItems) {
  evt.preventDefault();  // не перегружать страницу в браузере

  popupNewPlace.close();
  
  // готовим объект данных для создания карты
  const data = {
    name: inputDataItems.filter((inputData) => {
      return inputData.classList.contains(inputSelectors.inputPlaceNameClass);
    })[0].value,

    link: inputDataItems.filter((inputData) => {
      return inputData.classList.contains(inputSelectors.inputPlaceLinkClass);
    })[0].value
  }

  // получаем карту
  const cardElement = getCardElement(data);

  // добавляем карту и рендерим
  sectionCards.addItem(cardElement);
  sectionCards.render();

}


// Возвращает cardElement
function getCardElement(data) {
  const card = new Card(data, cardSelectors, showZoom);
  const cardElement = card.getCard();
  return cardElement;
}


// Получить заранее заданные карточки (массив card)
function getDefaultCards() {
  const cards = [];  // init

  // перебрать константу initialCards
  initialCards.forEach(item => {
   
    const cardElement = getCardElement(item);
    cards.push(cardElement);

  });
  return cards;  
}


// отобразить карту в секции карт
function renderCard(element, container) {
 container.prepend(element);
}


// Включает валидатор форм
function enableValidation() {
  // все формы
  const formList = Array.from(document.querySelectorAll(validateSelectors.formSelector));

  // перечислить и добавить валидацию
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(validateSelectors, formElement);
    validatorList.push(formValidator);  // добавить созданный валидатор в глобальный список валилаторов
    formValidator.enableValidation();
  });

};


// Добавляет на document слушателей событий
function enableDocumentListeners() {
  document.addEventListener('keydown', handleEscKeydown);
}


// Удаляет у document слушателей событий
function disableDocumentListeners() {
  document.removeEventListener('keydown', handleEscKeydown);
}


// Хендлер нажатия кнопки редактирования профиля
function handleBtnProfileEdit() {
  
  // заполучить объект данных информации о пользователе
  const userInfoData = userInfo.getUserInfo(); 

  enableDocumentListeners();  // предварительно включаются слушатели событий на document
  
  // открыть попап редактирования профиля и передать ему
  // (подготовить) массив объектов данных для input-полей
  popupEditProfile.open([
    {
      value: userInfoData.userName,
      class: 'popup-form__input_profile_name',
    },
    {
      value: userInfoData.aboutUser,
      class: 'popup-form__input_profile_activity',
    }
  ]);

  resetAllValidators();  // сбросить валидаторы
}


// Хендлер кнопки добавления нового места
function handleBtnAddNewPlace() {
  enableDocumentListeners();  // предварительно включаются слушатели событий на document
  popupNewPlace.open();       // Открыть попап добавдения нового места
  resetAllValidators();       // сбросить валидаторы
}


// сбрасывает все валидаторы
function resetAllValidators() {
  validatorList.forEach(validator => {
    validator.reset();
  });
}


// Добавляет слушателей событий (общие на страницу и ее объекты)
function addEvents() {
  popupZoom.setEventListeners();         // запускает метод у объекта попап
  popupNewPlace.setEventListeners();     // запускает метод у объекта попап
  popupEditProfile.setEventListeners();  // запускает метод у объекта попап

  btnProfileEdit.addEventListener('click', handleBtnProfileEdit);  // устанавливает слушатель по клику на кнопку
  btnAddNewPlace.addEventListener('click', handleBtnAddNewPlace);  // устанавливает слушатель по клику на кнопку
}


// Добавить события
addEvents();
// включить валидацию форм
enableValidation();