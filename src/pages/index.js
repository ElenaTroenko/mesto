import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import { cardSelectors, validateSelectors,
  popupNewPlaceSelectors, popupZoomSelectors, editProfileSelectors,
  userProfileSelectors, inputNames, buttonsSelectors,
  sectionElementsSelectors, baseUrls, token, removeCardConfirmSelectors,
  popupAvatarSelectors } from '../utils/constants.js';
import './index.css';
import { Api } from '../components/Api.js';


// кнопки на странице
const btnProfileEdit = document.querySelector(buttonsSelectors.btnEditProfileSelector);  // кнопка редактирования профиля
const btnAddNewPlace = document.querySelector(buttonsSelectors.btnAddNewPlaceSelector);  // кнопка добавления новых мест
const avatarWrapper = document.querySelector(buttonsSelectors.avatarWrapperSelector);    // wrapper аватара

// все формы
const formList = Array.from(document.querySelectorAll(validateSelectors.formSelector));

// ГЛОБАЛЬНЫЕ ОБЪЕКТЫ
// api
const api = getApi();
// Инициализация секции карточек мест. Будет заменен объектом после получения карточек с сервера
let sectionCards = {};
// Инициализация объекта валидаторов
const validatorList = {};
// Попап с зумом
const popupZoom = new PopupWithImage(popupZoomSelectors);
// Попап с формой добавления нового мета
const popupNewPlace = new PopupWithForm(popupNewPlaceSelectors, handleFormSubmitPlace);
// Попап с формой редактирования профиля
const popupEditProfile = new PopupWithForm(editProfileSelectors, handleFormSubmitProfile);
// Попап с формой ссылки на аватар
const popupAvatar = new PopupWithForm(popupAvatarSelectors, handleFormSubmitAvatar);
// попап подтверждения удаления карточки
const popupConfirmationDelCard = new PopupWithConfirmation(removeCardConfirmSelectors, handleDeleteCard);
// Объект пользовательского профиля
const userInfo = new UserInfo(userProfileSelectors);


// возвращает настроенный объект api
function getApi() {
  return new Api(
    {
      baseUrls: baseUrls,
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
    },
    (msg) => console.log(msg),
  );
}


// хэндлер для смены аватара
function handleFormSubmitAvatar(evt, inputData) {
  evt.preventDefault();  // не перегружать страницу в браузере
 
  // создать ссылку на изображение аватара
  const avatarLink = inputData[inputNames.profileAvatar];

  // передать новые данные на сервер
  api.patchAvatar(avatarLink, () => api.getUserInfo(setUserInfo));
}


// хэндлер клика по картинке аватара
function handleImgAvatar() {
  // открыть попап для смены аватара
  popupAvatar.open();
  resetAllValidators();  // сбросить валидаторы
}


// хэндлер удаления карточки
function handleDeleteCard(evt, cardObj) {
  evt.preventDefault();  // не перегружать страницу в браузере

  // отправить запрос на удаление
  // передается в т.ч. коллбэкЮ который удалит карточку и закроет попап
  api.deleteCard(cardObj.getId(), () => {
    cardObj.remove()
    popupConfirmationDelCard.close();
  })
}


// показать диалог подтверждения удаления карточки
function showConfirmDelCardPopup(cardObj) {
  // вызвать попап
  popupConfirmationDelCard.open(cardObj);
}


// Показать попап с зумом
function showZoom(text, src) {
  popupZoom.open({imageSrc: src, imageTitle: text})
}


// Хендлер для смены данных в профиле пользователя
function handleFormSubmitProfile(evt, inputData) {
  evt.preventDefault();  // не перегружать страницу в браузере

  const data = {
    name: inputData[inputNames.profileName],
    about: inputData[inputNames.profileAbout],
  }

    // отправить на сервер новые данные о пользователе
    api.patchUserInfo(data, (newData) => {
      setUserInfo(newData);
      popupEditProfile.close();
    });
}


// устанавливает (на странице) новые данные о пользователе
function setUserInfo(data) {
  // сменить информацию о пользователе
  userInfo.setUserInfo(data);

  // закрыть попап
  popupAvatar.close();
}


// Хендлер для передачи нового места
function handleFormSubmitPlace(evt, inputData) {
  evt.preventDefault();  // не перегружать страницу в браузере

  const data = {
    name: inputData[inputNames.placeName],
    link: inputData[inputNames.placeLink],
    owner: userInfo.getUserInfo(),
  }

  // отправить на сервер новую карточку места,
  // в т.ч. передается коллбэк, который отрендерит новую карточку и закроет попап
  api.postCard(data, (newData) => {
    renderCardElement(newData); 
    popupNewPlace.close();
  });
}


// создает глобальный объект секции с заранее заданными карточками
function createSection(defaultItems) {
  // "и последние станут первыми"
  defaultItems.reverse();
  
  // создание секции
  sectionCards = new Section({items: defaultItems, renderer: renderCardElement}, sectionElementsSelectors.fotoCardSelector);
  // рендеринг
  sectionCards.render();
}


// рендерит на странице размеченный card-элемент
function renderCardElement(data) {
  const card = new Card(
    data, cardSelectors, showZoom, showConfirmDelCardPopup, userInfo.getUserInfo(),
    (cardId, likeCallBack)=>api.likeCard(cardId, likeCallBack),
    (cardId, likeCallBack)=>api.delLikeCard(cardId, likeCallBack)
  );

  // получить элемент карты
  const cardElement = card.getCard();
  
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
  data[inputNames.profileName] = userInfoData.name,
  data[inputNames.profileAbout] = userInfoData.about,

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
  // запустить методы у объектов попап для установки событий в этих попапах
  popupZoom.setEventListeners();
  popupNewPlace.setEventListeners();
  popupEditProfile.setEventListeners();
  popupConfirmationDelCard.setEventListeners();
  popupAvatar.setEventListeners();

  // установить слушателей событий на кнопках страницы
  btnProfileEdit.addEventListener('click', handleBtnProfileEdit);
  btnAddNewPlace.addEventListener('click', handleBtnAddNewPlace);
  avatarWrapper.addEventListener('click', handleImgAvatar);
}


// Добавить события
addEvents();
// включить валидацию форм
enableValidation();
// запустить процесс получения информации с сервера:
// получить данные пользователя, а в качестве коллбэка
// успеха получения этих данных передать функцию создания секции
api.getUserInfo(setUserInfo, () => api.getInitialCards(createSection));