// Карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Шаблон
const userTemplate = document.querySelector('#template-card').content;
const sectionCards = document.querySelector('.foto-card');

// Информация о профиле на странице
const profileName = document.querySelector('.profile__name');                     // Имя на странице
const profileAboutYourSelf = document.querySelector('.profile__about-yourself');  // О себе на странице

// popup
const popup = document.querySelector('.popup');                                   // popup
const popupTitle = popup.querySelector('.popup__title');                          // заголовок формы popup
const btnPopupClose = document.querySelector('.popup__btn-close');                // кнопка закрытия popup

// форма редактирования профиля
const popupFormEditProfile = popup.querySelector('.popup-form_edit_profile');    // форма редактирования профиля
const inputName = popupFormEditProfile.querySelector('.popup-form__input_profile_name');     // поле Имя в форме
const inputJob = popupFormEditProfile.querySelector('.popup-form__input_profile_activity');  // поле О себе в форме

// Форма добавления новых мест
const popupFormNewPlace = popup.querySelector('.popup-form_new_place');                     // форма добавления новых мест

// кнопки на странице
const btnProfileEdit = document.querySelector('.profile__btn-edit');              // кнопка редактирования профиля
const btnProfile = document.querySelector('.profile__btn');                       // кнопка добавления новых мест

// Zoom
const dialog = document.querySelector('.zoom');
const dialogImage = dialog.querySelector('.zoom__image');
const dialogCaption = dialog.querySelector('.zoom__text');
const dialogBtn = dialog.querySelector('.zoom__btn-close');


// Показать popup
function showPopUp() {
  popup.classList.add('popup_opened');
}


// Скрыть popup
function hidePopUp() {
  popup.classList.remove('popup_opened');
}


// Показать форму редактирования профиля
function showEditProfileForm() {
  // Заменить заголовок формы
  popupTitle.textContent = 'Редактировать профиль';

  // скрыть ненужную форму, отобразить нужную
  popupFormNewPlace.classList.remove('popup-form_opened');
  popupFormEditProfile.classList.add('popup-form_opened');

  // Заполнить поля
  inputName.value = profileName.textContent;
  inputJob.value = profileAboutYourSelf.textContent;

  // Показать popup
  showPopUp();
}


// Показать форму добавления места
function showNewPlaceForm() {
  // Заменить заголовок формы
  popupTitle.textContent = 'Новое место';

  // скрыть ненужную форму, отобразить нужную
  popupFormEditProfile.classList.remove('popup-form_opened');
  popupFormNewPlace.classList.add('popup-form_opened');
   
 // Показать popup
  showPopUp();
}


// Передать отредактированный профиль
function handleFormSubmitProfile(evt) {
  evt.preventDefault();  // не перегружать страницу в браузере
  
  profileName.textContent = inputName.value;
  profileAboutYourSelf.textContent = inputJob.value;

  // скрыть popup
  hidePopUp();
}  


// Передать новое место
function handleFormSubmitPlace(evt) {
  evt.preventDefault();  // не перегружать страницу в браузере
  
  let newPlaceName = document.querySelector('.popup-form__input_place_name');  // поле ввода ссылки нового места
  let newPlaceLink = document.querySelector('.popup-form__input_place_link');  // поле ввода имени нового места
  
  createFotoCard(newPlaceName.value, newPlaceLink.value);

    // скрыть popup
  hidePopUp();

  // очистить поля ввода Имени и Ссылки
  newPlaceName.value = '';
  newPlaceLink.value = '';
}


// Включает/выключает сердечко
function changeHeart(element) {
  element.classList.toggle('foto-card__button-heart_active');
}


// Отображает на экране Zoom
function showZoom(image, text) {
  dialogCaption.textContent = text;
  dialogImage.src = image.src;
  dialogImage.alt = text;
  dialog.showModal();
}


// функция для создания карточки из шаблона html
function createFotoCard(name, link){
  const cardElement = userTemplate.querySelector('.foto-card__item').cloneNode(true);
  const cardElementImg = cardElement.querySelector('.foto-card__img');
  const heartElement = cardElement.querySelector('.foto-card__button-heart');
  const basketBtn = cardElement.querySelector('.foto-card__basket');
  
  cardElement.querySelector('.foto-card__title').textContent = name;
  cardElementImg.src = link;
  cardElementImg.alt = `Фото места: ${name}`;
  
  sectionCards.prepend(cardElement);

  // добавить событие удаления карточки
  basketBtn.addEventListener('click', () => cardElement.remove());
  // добавить событие смены сердечка
  heartElement.addEventListener('click', element => changeHeart(element.target));
  // добавить событие показа Зума
  cardElementImg.addEventListener('click', () => showZoom(cardElementImg, name)); 
}


//Функция загрузки карточек из массива
function createDefaultCards() {
  initialCards.forEach(item => {
    createFotoCard(item.name, item.link);
  });
}


// Добавить слушателей событий 
function addEvents() {
  btnProfileEdit.addEventListener('click', showEditProfileForm);
  btnProfile.addEventListener('click', showNewPlaceForm);
  btnPopupClose.addEventListener('click', hidePopUp);
  popupFormEditProfile.addEventListener('submit', handleFormSubmitProfile);
  popupFormNewPlace.addEventListener('submit', handleFormSubmitPlace);

  dialogBtn.addEventListener('click', closeDialog => dialog.close());
}


// Добавить события
addEvents();
// создать карточки из массива 
createDefaultCards();