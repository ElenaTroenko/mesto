class Card {
  // к конструктор передаются позиционные аргументы:
  //
  // объект данных карточки, селекторы, хэндлер клика по карточке, хэндлер удаления карточки,
  // объект данных просматривающего пользователя, хэндлер установки лайка, хэндлер удаления лайка
  constructor({name, link, _id, likes=[], owner, createdAt},
    selectors, cardClickHandler, removeCardHandler, userProfile, setlikeHandler, delLikeHandler) {
    // Селекторы
    this._selectors = selectors;

    this._name = name;
    this._link = link;
    
    this._likes = likes;
    
    this._userProfile = userProfile;

    this._id = _id;
    this._owner = owner;
    this._createdAt = createdAt;

    this._cardClickHandler = cardClickHandler;
    this._removeCardHandler = removeCardHandler;
    this._setlikeHandler = setlikeHandler;
    this._delLikeHandler = delLikeHandler;

    // показать корзину или не показывать (определяется сравнением id владельца и текущего пользователя)
    this._showBasket = this._owner._id == this._userProfile._id;
  }

  _loadTemplate() {
    this._template = document.querySelector(this._selectors.templateSelector).content;  // Шаблон карточки места
  }

  // Включает/выключает сердечко
  _handleChangeHeart() {
    if (this._heartElement.classList.contains(this._selectors.heartActiveClass)) {
      this._delLikeHandler(this._id, (likes)=>this.refreshLikes(likes));
    } else {
      this._setlikeHandler(this._id, (likes)=>this.refreshLikes(likes));
    } 
  }

  // Хэндлер, вызывающий Zoom
  _handleCardClick() {
    this._cardClickHandler(this._name, this._cardElementImg.src);
  }

  // установить слушателей событий
  _setEventListeners() {
    this._basketBtn.addEventListener('click', () => this._removeCardHandler(this));    // добавить событие удаления карточки
    this._heartElement.addEventListener('click', () => this._handleChangeHeart());  // добавить событие смены сердечка    
    this._cardElementImg.addEventListener('click', () => this._handleCardClick());  // добавить событие показа Зума
  }
  
  // заполняет карту данными
  _fillCard() {
     // Установить свойства объекта
     this._cardElement = this._template.querySelector(this._selectors.cardElementSelector).cloneNode(true);  // Карточка места
     this._likesCounter = this._cardElement.querySelector(this._selectors.likesCounterSelector);  // Счетчик лайков
     this._heartElement = this._cardElement.querySelector(this._selectors.heartElementSelector);            // Сердечко
     this._cardElementImg = this._cardElement.querySelector(this._selectors.cardElementImgSelector);         // Фотография места
     this._basketBtn =  this._cardElement.querySelector(this._selectors.basketBtnSelector);                  // Корзина
 
     // Заполнить title, link, alt
     this._cardElement.querySelector(this._selectors.cardElementTitleSelector).textContent = this._name;
     this._cardElementImg.src = this._link;
     this._cardElementImg.alt = `Фото места: ${this._name}`;
     
     this.refreshLikes(this._likes);

     if (!this._showBasket) {
      this._basketBtn.remove();
     }
  }

  // Возвращает элемент карточки
  getCard() {
    // загрузка template
    this._loadTemplate();
  
    this._fillCard();
   
    this._setEventListeners();
    
    return this._cardElement;
  }

  // получить id карты
  getId() {
    return this._id;
  }

  // удалить карточку
  removeCardElement() {
    this._cardElement.remove();
  }

  // обновить информацию о лайках
  refreshLikes(likes)  {
    this._likes = likes;  // массив объектов-данных лайков (содержит данные пользователей)
    this._likesCounter.textContent = this._likes.length;  // счетчик лайков

    // отфильтровать массив лайков и определить, есть ли среди них лайк текущего пользователя
    if (likes.filter((like)=>{return this._userProfile._id == like._id}).length > 0) {
      this._heartElement.classList.add(this._selectors.heartActiveClass);  // включить сердеяко
    } else {
      this._heartElement.classList.remove(this._selectors.heartActiveClass);  // выключить сердеяко
    }
  }

}


export default Card;