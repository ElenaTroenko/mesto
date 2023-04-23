export const token = '7fa7d08a-8e71-4306-afc1-47a65e80e1dc';

export const baseUrls = {
  cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-64/cards',
  userInfoUrl: 'https://nomoreparties.co/v1/cohort-64/users/me',
  userAvatarUrl: 'https://nomoreparties.co/v1/cohort-64/users/me/avatar',
}

// Селекторы карточек места
export const cardSelectors = {
  templateSelector: '#template-card',
  cardElementSelector: '.foto-card__item',
  cardElementImgSelector: '.foto-card__img',       
  heartElementSelector: '.foto-card__button-heart',
  basketBtnSelector: '.foto-card__basket',
  cardElementTitleSelector: '.foto-card__title',
  heartActiveClass: 'foto-card__button-heart_active',
  likesCounterSelector: '.foto-card__counter',
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
  buttonSubmitSelector: '.popup-form__btn',
  inactiveButtonClass: 'popup-form__btn_disable',
}

// селекторы попапа аватара
export const popupAvatarSelectors = {
  pupupElementSelector: '.popup_update_avatar',
  popupOpenedClass: 'popup_opened',
  btnCloseSelector: '.popup__btn-close',
  formElementSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  buttonSubmitSelector: '.popup-form__btn',
  inactiveButtonClass: 'popup-form__btn_disable',
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
  buttonSubmitSelector: '.popup-form__btn',
  inactiveButtonClass: 'popup-form__btn_disable',
}

// селекторы попапа удаления карточки
export const removeCardConfirmSelectors = {
  pupupElementSelector: '.popup_class_confirmation',
  popupOpenedClass: 'popup_opened',
  btnCloseSelector: '.popup__btn-close',
  buttonElementSelector: '.popup-form__btn',
}

// селекторы попапа пользовательского профиля на странице
export const userProfileSelectors = {
  userNameSelector: '.profile__name',
  aboutUserSelector: '.profile__about-yourself',
  userAvatarSelector: '.profile__foto',
}

// селекторы кнопок на странице
export const buttonsSelectors = {
  btnEditProfileSelector: '.profile__btn-edit',
  btnAddNewPlaceSelector: '.profile__btn-place',
  avatarWrapperSelector: '.profile__wrap',
}

// селекторы элементов для секций
export const sectionElementsSelectors = {
  fotoCardSelector: '.foto-card',
}

// имена input-полей
export const inputNames = {
  placeName: 'placename',
  placeLink: 'placelink',
  profileName: 'name',
  profileAbout: 'yourself',
  profileAvatar: 'avatarlink',
}