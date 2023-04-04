// Подкласс попапа с картинкой
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectors, closeHandler) {
    super(selectors, closeHandler);

    this._image = this._popupElement.querySelector(selectors.imageSelector);  // элемент картинки
    this._title = this._popupElement.querySelector(selectors.titleSelector);  // элемент заголовка

  }

  // открыть попап, установив картинку и заголовок.
  // параметр метода - объект со свойствами:
  // imageSrc - путь к картинке, imageTitle - заголовок.
  open({imageSrc, imageTitle}) {
    this._image.src = imageSrc;
    this._image.alt = imageTitle;
    this._title.textContent = imageTitle;

    super.open();
  }
}