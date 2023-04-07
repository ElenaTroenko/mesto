// Класс для попапа
export default class Popup {
  constructor(selectors) {
    this._selectors = selectors;        // объект селекторов

    // сам попап-элемент
    this._popupElement = document.querySelector(this._selectors.pupupElementSelector);

    // кнопка закрытия попапа
    this._btnClose = this._popupElement.querySelector(this._selectors.btnCloseSelector);

    // привязка контекста
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // хэндлер клавиши esc
  _handleEscClose(evt) {
    const keyEscape = 'Escape';
    // если нажата клавиша Escape
    if (evt.key === keyEscape) {
      this.close();
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
        
    // добавить слушателей событий Esc
    this._popupElement.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  // закрыть попап
  close() {
    // удалить слушателей событий Esc
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.removeEventListener('keydown', this._handleEscClose);
    
    this._popupElement.classList.remove(this._selectors.popupOpenedClass);
  }

  // добавляет слушателей событий
  setEventListeners() {
      // клик мышью по popup
      this._popupElement.addEventListener('mousedown', (evt) => {
        this._handleClickOnPopupElement(evt);
      });
      // клик мышью по кнопке закрытия
      this._btnClose.addEventListener('click', () => {
        this.close();
      });
  }
  
}