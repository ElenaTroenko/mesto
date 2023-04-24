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
    super.close();
  }

  // установить слушателей событий
  setEventListeners() {
    super.setEventListeners();

    this._buttonElement.addEventListener('click', () => {
      this._buttonElement.textContent = 'Удаление...';
      this._confirmHendler(this._confirmationObject);
    })
  }

  // ставит текст на кнопке по-умолчанию
  resetButtonText() {
    this._buttonElement.textContent = this._defaultTextButtonSubmit;
  }
}