// Класс секции
export default class Section {
  // конструктор принимает параметры:
  // 1. объект со свойствами items - дефолтные 
  // объекты данных секции для отображения, 
  // renderer - внешний рендерер,
  // 2. объект настроек селекторов
  constructor({items, renderer}, selector){
    this._renderedItemsData = items;
    this._renderer = renderer;  // колбэк - функция для рендеринга элементов секции
    this._container = document.querySelector(selector);  // контейнер
  }

  // рендерит элементы (вызывает внешний рендерер)
  render() {
    this._renderedItemsData.forEach(data => {
      this._renderer(data);
    })
  }

  // добавить элемент 
  addItem(item) {
    this._container.prepend(item);
  }

}