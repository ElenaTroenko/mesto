// Переменные
let profileName = document.querySelector('.profile__name');  // абзац Имя на странице
let profileAboutYourSelf = document.querySelector('.profile__about-yourself');  // абзац О себе на странице
let popup = document.querySelector('.popup');  // секция popup
let popupForm = popup.querySelector('.popup-form');  // форма
let inputName = popupForm.querySelector('.popup-form__input-name');  // поле Имя в форме
let inputJob = popupForm.querySelector('.popup-form__input-job');  // поле О себе в форме


// Показать форму
function showForm(){
  popup.classList.add('popup-show');

  inputName.value = profileName.textContent;
  inputJob.value = profileAboutYourSelf.textContent;
}


// Скрыть форму
function hideForm(){
  popup.classList.remove('popup-show');
}


function handleFormSubmit(evt) {
  evt.preventDefault();  // не перегружать страницу в браузере
  
  profileName.textContent = inputName.value;
  profileAboutYourSelf.textContent = inputJob.value;
  hideForm();
}  


// Добавить слушателей событий
function addEvents() {
  document.querySelector('.profile__btn-edit').addEventListener('click', showForm);
  document.querySelector('.popup-form__btn-close').addEventListener('click', hideForm);
  popupForm.addEventListener('submit', handleFormSubmit);
}


// Добавить события
addEvents();