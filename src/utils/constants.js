// Карточки места по-умолчанию
export const initialCards = [
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
  },
];


// Селекторы карточек места
export const cardSelectors = {
  templateSelector: '#template-card',
  cardElementSelector: '.foto-card__item',
  cardElementImgSelector: '.foto-card__img',       
  heartElementSelector: '.foto-card__button-heart',
  basketBtnSelector: '.foto-card__basket',
  cardElementTitleSelector: '.foto-card__title',
  heartActiveClass: 'foto-card__button-heart_active',
}

// Селекторы для валидации форм
export const validateSelectors = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__btn',
  inactiveButtonClass: 'popup-form__btn_disable',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__input-error_active',
}


// селекторы попапа нового места
export const popupNewPlaceSelectors = {
  pupupElementSelector: '.popup_new_place',
  popupOpenedClass: 'popup_opened',
  btnCloseSelector: '.popup__btn-close',
  formElementSelector: '.popup-form',
  inputSelector: '.popup-form__input',
}


// селекторы попапа зума
export const popupZoomSelectors = {
  pupupElementSelector: '.popup-zoom', 
  popupOpenedClass: 'popup_opened',
  btnCloseSelector: '.popup-zoom__btn-close',
  imageSelector: '.popup-zoom__image',
  titleSelector: '.popup-zoom__text',
}


// селекторы попапа редактирования профиля
export const editProfileSelectors = {
  pupupElementSelector: '.popup_edit_profile',
  popupOpenedClass: 'popup_opened',
  btnCloseSelector: '.popup__btn-close',
  formElementSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  inputProfileNameClass: 'popup-form__input_profile_name',
  inputProfileJobClass: 'popup-form__input_profile_activity',
}


// селекторы попапа пользовательского профиля на странице
export const userProfileSelectors = {
  userNameSelector: '.profile__name',
  aboutUserSelector: '.profile__about-yourself',
}


// селекторы input-полей
export const inputSelectors = {
  inputPlaceNameClass: 'popup-form__input_place_name',
  inputPlaceLinkClass: 'popup-form__input_place_link',
}


// селекторы кнопок на странице
export const buttonsSelectors = {
  btnEditProfileSelector: '.profile__btn-edit',
  btnAddNewPlaceSelector: '.profile__btn-place',
}


// селекторы элементов для секций
export const sectionElementsSelectors = {
  fotoCardSelector: '.foto-card',
}