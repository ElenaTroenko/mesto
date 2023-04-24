// Подкласс попапа с формой
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectors, submitHandler) {
    super(selectors);
    this._submitHendler = submitHandler;  // хендлер сабмита
    this._formElement = this._popupElement.querySelector(selectors.formElementSelector);    // элемент формы
    this._inputElements = this._popupElement.querySelectorAll(selectors.inputSelector);     // массив input-элементов формы
    this._buttonSubmit = this._popupElement.querySelector(selectors.buttonSubmitSelector);  // кнопка сабмита

    this._defaultTextButtonSubmit = this._buttonSubmit.textContent;
  }

  // возвращает объект данных, где имена свойств - имена input-полей, 
  // а значения свойств - value input-полей
  _getInputValues() {
    const inputData = {};  // init

    // подготовить объект данных
    // свойство - name input-поля, значение - value input-поля
    this._inputElements.forEach(input => {
      inputData[input.name] = input.value;
    });

    return inputData;
  }

  _setInputValues(defaultData) {
    this._inputElements.forEach(element => {
      element.value = defaultData[element.name];
    })
  }

  // установить слушателей событий
  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();  // не перегружать страницу в браузере
      this._buttonSubmit.textContent = 'Сохранение...';
      this._submitHendler(this._getInputValues());
    })
    
    super.setEventListeners();
  }

  // закрыть попап
  close() {
    this._formElement.reset();  // предварительно сбросить форму
    super.close();
  }

  // открыть попап, установив умолчания input-полей.
  // Параметр (defaultData) - объект, 
  // свойство - name input-поля, значение - value input-поля
  open(defaultData) {
    if (defaultData) {
      this._setInputValues(defaultData);
    }
    
    super.open();
  }


  // возвращает начальное название кнопки
  resetButtonText() {
    this._buttonSubmit.textContent = this._defaultTextButtonSubmit;
  }

}