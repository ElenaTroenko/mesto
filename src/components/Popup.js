// Класс для попапа
export default class Popup {
  constructor(selectors, closeHandler) {
    this._selectors = selectors;        // объект селекторов
    this._closeHandler = closeHandler;  // колбэк - хэндлер закрытия попапа

    // сам попап-элемент
    this._popupElement = document.querySelector(this._selectors.pupupElementSelector);

    // кнопка закрытия попапа
    this._btnClose = this._popupElement.querySelector(this._selectors.btnCloseSelector);
  }

  // хэндлер клавиши esc
  _handleEscClose(evt) {
    const keyEscape = 'Escape';
    // если нажата клавиша Escape
    if (evt.key === keyEscape) {
      this.close()      
    }
  }
 
  // хендлер нажатия кнопки "закрыть"
  _handleClickOnPopupElement(evt) {
    if (evt.target == this._popupElement) {
      this.close();
    }
  }

  // открыть (показать) попап
  open() {
    this._popupElement.classList.add(this._selectors.popupOpenedClass);
    this._popupElement.focus();
  }

  // закрыть попап
  close() {
    this._popupElement.classList.remove(this._selectors.popupOpenedClass);
    this._closeHandler();
  }

  // добавляет слушателей событий
  setEventListeners() {
      // клик мышью по popup
      this._popupElement.addEventListener('mousedown', (evt) => {
        this._handleClickOnPopupElement(evt);
      });
      // клавиша
      this._popupElement.addEventListener('keydown', (evt) => {
        this._handleEscClose(evt)
      });
      // клик мышью по кнопке закрытия
      this._btnClose.addEventListener('mousedown', () => {
        this.close()
      });
  }
  
}