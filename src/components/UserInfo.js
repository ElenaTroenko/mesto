// Класс пользовательского профиля
export default class UserInfo {
  constructor(selectors) {
    this._selectors = selectors;  // Объект селекторов

    this._userNameElement = document.querySelector(selectors.userNameSelector);      // элемент "имя"
    this._aboutUserElement = document.querySelector(selectors.aboutUserSelector);    // элемент "о себе"
    this._userAvatarElement = document.querySelector(selectors.userAvatarSelector);  // элемент Аватара
  }

  // получить информацию из пользовательского профиля (объект данных)
  getUserInfo() {
    // вернет объект данных
    return {
      name: this._userNameElement.textContent,
      about: this._aboutUserElement.textContent,
      avatar: this._userAvatarElement.src,
      cohort: this._cohort,
      _id: this._id,
    }
  }

  // установить информацию из пользовательского профиля (требует объект данных)
  setUserInfo({name, about, avatar, cohort, _id}) {
    this._userNameElement.textContent = name;
    this._aboutUserElement.textContent = about;
    this._userAvatarElement.src = avatar;
    this._cohort = cohort;
    this._id = _id;
  }
}