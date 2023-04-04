// Класс секции
export default class Section {
  // конструктор принимает параметры:
  // 1. объект со свойствами items - дефолтные элементы секции для отображения, 
  // renderer - внешний рендерер,
  // 2. объект настроек селекторов
  constructor({items, renderer}, selector){
    this._items = items;        // массив - элементы секции
    this._renderer = renderer;  // колбэк - функция для рендеринга элементов секции
    
    this._container = document.querySelector(selector);  // контейнер

    // создать дефолтные элементы
    this._createDefaultItems();
  }

  // создает дефолтные элементы
  _createDefaultItems() {
    this._items.forEach(item => {
      this.addItem(item);
      this.render(item);
    })
  }

  // рендерит элементы (вызывает внешний рендерер)
  render() {
    this._items.forEach(item => {
      this._renderer(item, this._container);
    });
    
  }

  // добавить элемент 
  addItem(item) {
    this._items.push(item);
  }
}