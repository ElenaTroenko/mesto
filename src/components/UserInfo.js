// Класс пользовательского профиля
export default class UserInfo {
  constructor(selectors) {
    this._selectors = selectors;  // Объект селекторов

    this._userNameElement = document.querySelector(selectors.userNameSelector);    // элемент "имя"
    this._aboutUserElement = document.querySelector(selectors.aboutUserSelector);  // элемент "о себе"
  }

  // получить информацию из пользовательского профиля (объект данных)
  getUserInfo() {
    // вернет объект данных
    return {
      userName: this._userNameElement.textContent,
      aboutUser: this._aboutUserElement.textContent
    }
  }

  // установить информацию из пользовательского профиля (требует объект данных)
  setUserInfo({userName, aboutUser}) {
    this._userNameElement.textContent = userName;
    this._aboutUserElement.textContent = aboutUser;
  }
}