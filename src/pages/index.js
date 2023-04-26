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
// объект карточек мест
const sectionCards = new Section(renderCardElement, sectionElementsSelectors.fotoCardSelector);
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
    }
  );
}


// показывает ошибку (в консоль)
function showError(err) {
  // определить, err - это строка или нет (нет может возникнуть при отсутствии интернета, тогда это будет объект)
  if (typeof(err) != 'string') {
    err = 'Неизвестная ошибка. Проверьте соединение с Интернетом.'
  }
  
  console.log(err);
}


// хэндлер для смены аватара
function handleFormSubmitAvatar(inputData) {
  // создать ссылку на изображение аватара
  const avatarLink = inputData[inputNames.profileAvatar];

  // передать новые данные на сервер
  api.patchAvatar(avatarLink)
  .then((data) => {
      setUserInfo(data);
      popupAvatar.close();
    })
    .catch((err) => {
      showError(err);
    })
    .finally(() => popupAvatar.resetButtonText())
}


// хэндлер клика по картинке аватара
function handleImgAvatar() {
  // открыть попап для смены аватара
  popupAvatar.open();
  validatorList.avatar.resetValidation();  // сбросить валидатор
}


// хэндлер удаления карточки
function handleDeleteCard(cardObj) {
  // отправить запрос на удаление
  // передается в т.ч. коллбэкЮ который удалит карточку и закроет попап
  api.deleteCard(cardObj.getId())
  .then(() => {
    cardObj.removeCardElement()
    popupConfirmationDelCard.close();
  })
  .catch((err) => {
    showError(err);
  })
  .finally(() => popupConfirmationDelCard.resetButtonText())
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
function handleFormSubmitProfile(inputData) {
  const data = {
    name: inputData[inputNames.profileName],
    about: inputData[inputNames.profileAbout],
  }

    // отправить на сервер новые данные о пользователе
    api.patchUserInfo(data)
    .then((newData) => {
      setUserInfo(newData);
      popupEditProfile.close();
    })
    .catch((err) => {
      showError(err);
    })
    .finally(() => popupEditProfile.resetButtonText())
}


// устанавливает (на странице) новые данные о пользователе
function setUserInfo(data) {
  // сменить информацию о пользователе
  userInfo.setUserInfo(data);
}


// Хендлер для передачи нового места
function handleFormSubmitPlace(inputData) {
  const data = {
    name: inputData[inputNames.placeName],
    link: inputData[inputNames.placeLink],
  }

  // отправить на сервер новую карточку места,
  // в т.ч. передается коллбэк, который отрендерит новую карточку и закроет попап
  api.postCard(data)
  .then((newData) => {
    renderCardElement(newData); 
    popupNewPlace.close();
  })  
  .catch((err) => {
    showError(err);
  })
  .finally(() => popupNewPlace.resetButtonText())
}


// хэндлер установки лайка карточки
function handleLikeCard(cardId, likeCallBack) {
  api.likeCard(cardId)
  .then((data) => {
    likeCallBack(data.likes);
  })
  .catch((err) => {
    showError(err);
  });
}


// хэндлер отзыва лайка карточки
function handleDelLikeCard(cardId, likeCallBack) {
  api.delLikeCard(cardId)
  .then((data) => {
    likeCallBack(data.likes);
  })
  .catch((err) => {
    showError(err);
  });
}


function getCard(data) {
  // получить объект карты
  const card =  new Card(
    data, cardSelectors, showZoom, showConfirmDelCardPopup, userInfo.getUserInfo(),
    (cardId, likeCallBack) => handleLikeCard(cardId, likeCallBack),
    (cardId, likeCallBack) => handleDelLikeCard(cardId, likeCallBack),
  )

  // вернуть DOM-элемент карты
  return card.getCard();
}


// рендерит на странице размеченный card-элемент
function renderCardElement(data) {
  // получить DOM-элемент карты
  const cardElement = getCard(data); 
  
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
  popupEditProfile.setInputValues(data);
  popupEditProfile.open();
  

  validatorList.profile.resetValidation();  // сбросить валидатор
}


// Хендлер кнопки добавления нового места
function handleBtnAddNewPlace() {
  popupNewPlace.open();       // Открыть попап добавдения нового места
  validatorList.newplace.resetValidation();  // сбросить валидатор
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


// Первый инициирующий запуск запросов инфПользователя - карточки
function initPage() {
  Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
  ])
  .then(([data, defaultItems]) => {
    // установить информацию о пользователе
    setUserInfo(data);

    // "и последние станут первыми"
    defaultItems.reverse();
    // рендеринг всех карточек с сервера
    sectionCards.renderItems(defaultItems)
  })
  .catch((err) => {
    showError(err);
  });
}


// Добавить события
addEvents();
// включить валидацию форм
enableValidation();
// инициирующий запрос на сервер. старт
initPage();