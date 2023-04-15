class Card {
  constructor({name, link}, selectors, cardClickHandler) {
    // Селекторы
    this._selectors = selectors;

    this._name = name;
    this._link = link;

    this._cardClickHandler = cardClickHandler;
  }

  _loadTemplate() {
    this._template = document.querySelector(this._selectors.templateSelector).content;  // Шаблон карточки места
  }

  // Хэндлер для удаления карточки
  _handleRemoveCard() {
    this._cardElement.remove();
  }

  // Включает/выключает сердечко
  _handleChangeHeart() {
    this._heartElement.classList.toggle(this._selectors.heartActiveClass);
  }

  // Хэндлер, вызывающий Zoom
  _handleCardClick() {
    this._cardClickHandler(this._name, this._cardElementImg.src);
  }

  // установить слушателей событий
  _setEventListeners() {
    this._basketBtn.addEventListener('click', () => this._handleRemoveCard());    // добавить событие удаления карточки
    this._heartElement.addEventListener('click', () => this._handleChangeHeart());  // добавить событие смены сердечка    
    this._cardElementImg.addEventListener('click', () => this._handleCardClick());  // добавить событие показа Зума
  }
  
  // заполняет карту данными
  _fillCard() {
     // Установить свойства объекта
     this._cardElement = this._template.querySelector(this._selectors.cardElementSelector).cloneNode(true);  // Карточка места
     this._cardElementImg = this._cardElement.querySelector(this._selectors.cardElementImgSelector);         // Фотография места
     this._heartElement =  this._cardElement.querySelector(this._selectors.heartElementSelector);            // Сердечко
     this._basketBtn =  this._cardElement.querySelector(this._selectors.basketBtnSelector);                  // Корзина
 
     // Заполнить title, link, alt
     this._cardElement.querySelector(this._selectors.cardElementTitleSelector).textContent = this._name;
     this._cardElementImg.src = this._link;
     this._cardElementImg.alt = `Фото места: ${this._name}`;
  }

  // Возвращает элемент карточки
  getCard() {

    // загрузка template
    this._loadTemplate();
  
    this._fillCard();
   
    this._setEventListeners();
    
    return this._cardElement;
  }
}


export default Card;