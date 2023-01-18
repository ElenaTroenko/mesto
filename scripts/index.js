// Переменные
let profileName = document.querySelector('.profile__name');  // абзац Имя на странице
let profileAboutYourSelf = document.querySelector('.profile__about-yourself');  // абзац О себе на странице
let popup = document.querySelector('.popup');  // секция popup
let popupForm = popup.querySelector('.popup-form');  // форма
let inputName = popupForm.querySelector('.popup-form__input_profile_name');  // поле Имя в форме
let inputJob = popupForm.querySelector('.popup-form__input_profile_activity');  // поле О себе в форме
let btnProfileEdit = document.querySelector('.profile__btn-edit');  // кнопка редактирования профиля
let btnPopupClose = document.querySelector('.popup__btn-close');  // кнопка закрытия popup


// Показать форму
function showForm() {
  popup.classList.add('popup_opened');

  inputName.value = profileName.textContent;
  inputJob.value = profileAboutYourSelf.textContent;
}


// Скрыть форму
function hideForm() {
  popup.classList.remove('popup_opened');
}


function handleFormSubmit(evt) {
  evt.preventDefault();  // не перегружать страницу в браузере
  
  profileName.textContent = inputName.value;
  profileAboutYourSelf.textContent = inputJob.value;
  hideForm();
}  


// Добавить слушателей событий
function addEvents() {
  btnProfileEdit.addEventListener('click', showForm);
  btnPopupClose.addEventListener('click', hideForm);
  popupForm.addEventListener('submit', handleFormSubmit);
}


// Добавить события
addEvents();