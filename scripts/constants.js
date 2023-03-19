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
  }
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