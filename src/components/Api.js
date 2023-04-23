export class Api {
  // принимает объект данных настроек и коллбэк для вывода ошибок (опционально)
  constructor({baseUrls, headers}, errorCallBack) {
    this._baseUrls = baseUrls;  // базовые url-ы
    this._headers = headers;    // стандартные заголовки запросов
    this._errorCallBack = errorCallBack;  // коллбэк для вывода ошибок
  }

  // вызвать коллбэк для вывода ошибки
  _callError(err) {
    // определить, err - это строка или нет (нет может возникнуть при отсутствии интернета, тогда это будет объект)
    if (typeof(err) != 'string') {
      err = 'Неизвестная ошибка. Проверьте соединение с Интернетом.'
    }
    // если передан коллбэк для вывода ошибки, вызвать его
    if (this._errorCallBack) {
      this._errorCallBack(err);
    }
  }

  // запросить карточки (требует коллбэк для передачи массива объектов-данных карточек)
  getInitialCards(renderCallBack) {
    fetch(this._baseUrls.cardsUrl, {
      method: 'GET',
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка загрузки карточек мест: ${res}`);
    })
    .then((data) => {
      renderCallBack(data);
    })
    .catch((err) => {
      this._callError(err);
    })
  }

  // запросить данные пользователя (требует колбэк для передачи объекта-данных и опциональный колбэк
  // для его вызова в случае успеха запроса данных пользователя)
  getUserInfo(setUserInfoCallback, successCallBack) {
    fetch(this._baseUrls.userInfoUrl, {
      method: 'GET',
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка загрузки информации о пользователе: ${res}`);
    })
    .then((data) => {
      setUserInfoCallback(data);
      if (successCallBack) {
        successCallBack();
      }
    })
    .catch((err) => {
      this._callError(err);
    })
  }

  // запросить пользовательский аватар (требует колбэк для передачи строки аватара)
  getUserAvatar(setUserAvatarCallBack) {
    fetch(this._baseUrls.userAvatarUrl, {
      method: 'GET',
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка загрузки аватара пользователя: ${res}`);
    })
    .then((data) => {
      setUserAvatarCallBack(data.avatar);     
    })
    .catch((err) => {
      this._callError(err);
    }) 
  }

  // отправить изменения в профиле пользователя (требует объект данных профиля пользователя и 
  // коллбэк для отправки нового объекта данных пользователя, полученного от сервера)
  patchUserInfo(data, setUserInfoCallBack) {
    fetch(this._baseUrls.userInfoUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка отправки информации о пользователе: ${res}`);
    })
    .then((data) => {
      setUserInfoCallBack(data);
    })
    .catch((err) => {
      this._callError(err);
    })
  }

  // отправить новый аватар пользователя (требует строку для аватара пользователя и 
  // коллбэк для отправки новой строки объекта данных пользователя, полученного от сервера)
  patchAvatar(avatarLink, setUserAvatarCallBack) {
    fetch(this._baseUrls.userAvatarUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: avatarLink}),
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка отправки аватара пользователя ${res}`);
    })
    .then((data) => {
      setUserAvatarCallBack(data)
    })
    .catch((err) => {
      this._callError(err);
    }); 
  }

  // отправить новую карту места (требует объект данных карты места и 
  // коллбэк для передачи нового объекта карты места, полученного в ответ с сервера)
  postCard(data, postCallBack) {
    fetch(this._baseUrls.cardsUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка отправки информации о новом месте: ${res}`);
    })
    .then((data) => {
      postCallBack(data);
    })
    .catch((err) => {
      this._callError(err);
    }); 
  }

  // удалить карту места (требует Id карты места и коллбэк для вызова в случае успеха)
  deleteCard(cardId, delCardCallBack) {
    // сформировать url запроса
    const cardUrl = `${this._baseUrls.cardsUrl}/${cardId}`;

    fetch(cardUrl, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка удаления карточки: ${res}`);
    })
    .then((data) => {
      delCardCallBack(data);
    })
    .catch((err) => {
      this._callError(err);
    }); 
  } 

  // отправляет лайк карточке (требует Id карты и коллбэк для ответа)
  likeCard(cardId, likeCallBack) {
    // сформировать url запроса
    const cardUrl = `${this._baseUrls.cardsUrl}/${cardId}/likes`;

    fetch(cardUrl, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка отправки лайка для карточки: ${res}`);
    })
    .then((data) => {
      likeCallBack(data.likes);
    })
    .catch((err) => {
      this._callError(err);
    }); 
  }

  // отзывает лайк у карточки (требует Id карты и коллбэк для ответа)
  delLikeCard(cardId, likeCallBack) {
    // сформировать url запроса
    const cardUrl = `${this._baseUrls.cardsUrl}/${cardId}/likes`;

    fetch(cardUrl, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка отзыва лайка для карточки: ${res}`);
    })
    .then((data) => {
      likeCallBack(data.likes);
    })
    .catch((err) => {
      this._callError(err);
    }); 
  }

}


