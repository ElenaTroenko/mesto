// Подкласс попапа с формой
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectors, closeHandler, submitHandler) {
    super(selectors, closeHandler);
    this._submitHendler = submitHandler;  // хендлер сабмита
    this._formElement = this._popupElement.querySelector(selectors.formElementSelector);  // элемент формы
    this._inputElements = this._popupElement.querySelectorAll(selectors.inputSelector);   // массив input-элементов формы
  }

  // возвращает массив объектов данных значений полей и их списка классов
  _getInputValues() {
    const inputDataItems = [];  // init

    // подготовить массив объектов данных
    // в каждом объекте данных 2 свойства:
    // value - значение input-поля, classlist - список классов input-поля
    this._inputElements.forEach(input => {
      const inputData = {
        value: input.value,
        classList: input.classList,
      };
      
      inputDataItems.push(inputData);
    })

    return inputDataItems;
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
  // Параметр (defaultDataItems) - массив объектов, 
  // содержащих 2 свойства:
  // value - значение input-поля, classlist - список классов input-поля.
  open(defaultDataItems) {
    
    if (defaultDataItems) {
    
      // перечислить все Input-поля формы в попапе.
      // по вхождению класса в classlist input-поля,
      // установить value input-поля
      this._inputElements.forEach((element) => {
        
        const value = defaultDataItems.filter((item) => {
          return element.classList.contains(item.class);
        })[0].value;

        element.value = value;
        
      })
    }
    
    super.open();
  }

}