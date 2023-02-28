// Показывает сообщение об ошибке под переданным input-элементом
function showInputError(formElement, inputElement, options) {
  // найти error-элемент для отображения ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.add(options.errorClass);
  inputElement.classList.add(options.inputErrorClass);

  // Установить текст ошибки
  errorElement.textContent = inputElement.validationMessage;
};


// Прячет сообщение об ошибке под переданным input-элементом
function hideInputError(formElement, inputElement, options) {
  // найти error-элемент для отображения ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  // убрать классы
  errorElement.classList.remove(options.errorClass);
  inputElement.classList.remove(options.inputErrorClass);
};


// Проверяет валидность переданного input-поля
function checkInputValid(formElement, inputElement, options) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, options);
  } else {
    showInputError(formElement, inputElement, options);
  };
};


// Проверяет переданный список input-полей, возвращает true,
// если хотя бы одно поле не проходит валидацию (иначе возвращает false)
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }
)};


// Переключает состояние переданной кнопки submit исходя из 
// состояния валидации всех переданных input-полей
function toggleButton(buttonElement, inputList, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};


// Устанавливает слушателей событий на все input-поля переданнной формы
function setInputEventListeners(formElement, options) {
  // все input-поля
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  // кнопка submit
  const buttonSubmit = formElement.querySelector(options.submitButtonSelector);

  // перечислить
  inputList.forEach((inputElement) => {
    
    // добавить событие
    inputElement.addEventListener('input', () => {
      checkInputValid(formElement, inputElement, options);
      toggleButton(buttonSubmit, inputList, options.inactiveButtonClass);
    });
  });
};


// Главная функция поиска и добавления проверки валидации по всем формам,
// которые будут найдены на странице
function enableValidation(options) {
  // все формы
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  // перечислить
  formList.forEach((formElement) => {
    
    setInputEventListeners(formElement, options);
  });

};


// запустить поиск и добавление проверки валидации всех форм
enableValidation({
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__btn',
  inactiveButtonClass: 'popup-form__btn_disable',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__input-error_active'
});