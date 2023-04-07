// Подкласс попапа с формой
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectors, submitHandler) {
    super(selectors);
    this._submitHendler = submitHandler;  // хендлер сабмита
    this._formElement = this._popupElement.querySelector(selectors.formElementSelector);  // элемент формы
    this._inputElements = this._popupElement.querySelectorAll(selectors.inputSelector);   // массив input-элементов формы
  }

  // возвращает массив объектов данных значений полей и их списка классов
  _getInputValues() {
    const inputData = {};  // init

    // подготовить объект данных
    // свойство - name input-поля, значение - value input-поля
    this._inputElements.forEach(input => {
      inputData[input.name] = input.value
    });

    return inputData;
  }

  // установить слушателей событий
  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      this._submitHendler(evt, this._getInputValues());
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
      this._inputElements.forEach(element => {
        element.value = defaultData[element.name];
      })
    }
    
    super.open();
  }

}