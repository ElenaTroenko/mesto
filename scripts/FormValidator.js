class FormValidator {
  constructor(selectors, formElement) {
    // Элемент формы
    this._formElement = formElement;

    // селекторы
    this._selectors = selectors;

    // все input-поля
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));

    // кнопка submit
    this._buttonSubmit = this._formElement.querySelector(this._selectors.submitButtonSelector);
  }

  // Устанавливает слушателей событий на все input-поля формы
  _setInputEventListeners() {
    // перечислить input-поля и добавить событие
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => this._handleFormValid(inputElement));
    });
  };

  // Показывает сообщение об ошибке под переданным input-элементом
  _showInputError(inputElement) {
    // найти error-элемент для отображения ошибки
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    // добавить классы для отображения ошибка валидации
    errorElement.classList.add(this._selectors.errorClass);
    inputElement.classList.add(this._selectors.inputErrorClass);

    // Установить текст ошибки
    errorElement.textContent = inputElement.validationMessage;
  };

    // Прячет сообщение об ошибке под переданным input-элементом
  _hideInputError(inputElement) {
    // найти error-элемент для отображения ошибки
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    
    // убрать классы с отображением ошибки валидации
    errorElement.classList.remove(this._selectors.errorClass);
    inputElement.classList.remove(this._selectors.inputErrorClass);
  };

  // Проверяет валидность переданного input-поля
  _checkInputValid(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    };
  };

  // Проверяет список input-полей, возвращает true,
  // если хотя бы одно поле не проходит валидацию (иначе возвращает false)
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }
  )};

  // Переключает состояние кнопки submit исходя из 
  // состояния валидации всех input-полей
  _toggleButton() {
    if (this._hasInvalidInput()) {
      this._buttonSubmit.classList.add(this._selectors.inactiveButtonClass);
      this._buttonSubmit.setAttribute('disabled', true);
    } else {
      this._buttonSubmit.classList.remove(this._selectors.inactiveButtonClass);
      this._buttonSubmit.removeAttribute('disabled');
    }
  };

 // Хэндлер для событя переданного input-поля
  _handleFormValid(inputElement) {
    this._checkInputValid(inputElement);
    this._toggleButton();
  }
  
  // запустить поиск и добавление проверки валидации всех форм
  enableValidation() {
    this._setInputEventListeners();
  }
}


export default FormValidator;