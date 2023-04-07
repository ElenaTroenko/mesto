import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards, cardSelectors, validateSelectors,
  popupNewPlaceSelectors, popupZoomSelectors, editProfileSelectors,
  userProfileSelectors, inputNames, buttonsSelectors,
  sectionElementsSelectors} from '../utils/constants.js';
import './index.css';

// кнопки на странице
const btnProfileEdit = document.querySelector(buttonsSelectors.btnEditProfileSelector);  // кнопка редактирования профиля
const btnAddNewPlace = document.querySelector(buttonsSelectors.btnAddNewPlaceSelector);  // кнопка добавления новых мест

// все формы
const formList = Array.from(document.querySelectorAll(validateSelectors.formSelector));

// Инициализация массива валидаторов
const validatorList = {};

// ГЛОБАЛЬНЫЕ ОБЪЕКТЫ
// Секция карточек мест
const sectionCards = new Section({items: initialCards, renderer: renderCardElement}, sectionElementsSelectors.fotoCardSelector);
// Попап с зумом
const popupZoom = new PopupWithImage(popupZoomSelectors);
// Попап с формой добавления нового мета
const popupNewPlace = new PopupWithForm(popupNewPlaceSelectors, handleFormSubmitPlace);
// Попап с формой редактирования профиля
const popupEditProfile = new PopupWithForm(editProfileSelectors, handleFormSubmitProfile);
// Объект пользовательского профиля
const userInfo = new UserInfo(userProfileSelectors);


// Показать попап с зумом
function showZoom(text, src) {
  popupZoom.open({imageSrc: src, imageTitle: text})
}


// Хендлер для смены данных в профиле пользователя
function handleFormSubmitProfile(evt, inputData) {
  evt.preventDefault();  // не перегружать страницу в браузере

  // скрыть popup редактирования профиля
  popupEditProfile.close(); 
  
  // сменить информацию о пользователе
  userInfo.setUserInfo({
    userName: inputData[inputNames.profileName],
    aboutUser: inputData[inputNames.profileAbout],
  });
}  


// Хендлер для передачи нового места
function handleFormSubmitPlace(evt, inputData) {
  evt.preventDefault();  // не перегружать страницу в браузере

  popupNewPlace.close();
  
  renderCardElement({
    name: inputData[inputNames.placeName],
    link: inputData[inputNames.placeLink],
  });
}

// рендерит на странице размеченный card-элемент
function renderCardElement(data) {
  const card = new Card(data, cardSelectors, showZoom);
  const cardElement = card.getCard();  // получить элемент карты
  
  // добавить карту в секцию
  sectionCards.addItem(cardElement);
}


// Включает валидатор форм
function enableValidation() {
  
  // перечислить и добавить валидацию
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(validateSelectors, formElement);
    
    const formName = formElement.getAttribute('name');
    
    validatorList[formName] = formValidator;  // добавить созданный валидатор в глобальный список валидаторов
    formValidator.enableValidation();         // включить валидацию формы
  });
};


// Хендлер нажатия кнопки редактирования профиля
function handleBtnProfileEdit() {
  
  // заполучить объект данных информации о пользователе
  const userInfoData = userInfo.getUserInfo();

  // подготовить объект данных
  const data = {};  // init
  data[inputNames.profileName] = userInfoData.userName,
  data[inputNames.profileAbout] = userInfoData.aboutUser,

  // открыть попап редактирования профиля и передать ему данные профиля
  popupEditProfile.open(data);

  resetAllValidators();  // сбросить валидаторы
}


// Хендлер кнопки добавления нового места
function handleBtnAddNewPlace() {
  popupNewPlace.open();       // Открыть попап добавдения нового места
  resetAllValidators();       // сбросить валидаторы
}


// сбрасывает все валидаторы
function resetAllValidators() {
  formList.forEach(form => {
    validatorList[form.getAttribute('name')].resetValidation();
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
// отрендерить дефолтные карты в секцию
sectionCards.render();