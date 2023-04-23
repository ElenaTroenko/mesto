// Подкласс попапа с формой
import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selectors, confirmHandler) {
    super(selectors);                       // селекторы
    this._confirmHendler = confirmHandler;  // хендлер подтверждения
    this._buttonElement = this._popupElement.querySelector(selectors.buttonElementSelector);  // элемент кнопки
    this._defaultTextButtonSubmit = this._buttonElement.textContent;                          // текст на кнопке по-умолчанию
  } 

  // открыть попап (требует передачи объекта, для котороко нужно подтверждение)
  open(confirmationObject) {
    this._confirmationObject = confirmationObject;

    super.open();
  }

   // закрыть попап
   close() {
    this._buttonElement.textContent = this._defaultTextButtonSubmit;  // посстановить текст на кнопке по-умолчанию
    super.close();
  }

  // установить слушателей событий
  setEventListeners() {
    super.setEventListeners();

    this._buttonElement.addEventListener('click', (evt) => {
      this._buttonElement.textContent = 'Удаление...';
      this._confirmHendler(evt, this._confirmationObject);
    })

  }
}