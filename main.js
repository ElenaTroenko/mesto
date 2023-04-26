(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e,r){for(var n=0;n<r.length;n++){var o=r[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,r){if("object"!==t(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===t(i)?i:String(i)),o)}var i}var r=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._renderer=e,this._container=document.querySelector(r)}var r,n;return r=t,(n=[{key:"renderItems",value:function(t){var e=this;t.forEach((function(t){e._renderer(t)}))}},{key:"addItem",value:function(t){this._container.prepend(t)}}])&&e(r.prototype,n),Object.defineProperty(r,"prototype",{writable:!1}),t}();function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,i=function(t,e){if("object"!==n(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,"string");if("object"!==n(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===n(i)?i:String(i)),o)}var i}const i=function(){function t(e,r,n,o,i,u,l){var c=e.name,a=e.link,s=e._id,f=e.likes,p=void 0===f?[]:f,h=e.owner,m=e.createdAt;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._selectors=r,this._name=c,this._link=a,this._likes=p,this._userProfile=i,this._id=s,this._owner=h,this._createdAt=m,this._cardClickHandler=n,this._removeCardHandler=o,this._setlikeHandler=u,this._delLikeHandler=l,this._showBasket=this._owner._id==this._userProfile._id}var e,r;return e=t,(r=[{key:"_loadTemplate",value:function(){this._template=document.querySelector(this._selectors.templateSelector).content}},{key:"_handleChangeHeart",value:function(){var t=this;this._heartElement.classList.contains(this._selectors.heartActiveClass)?this._delLikeHandler(this._id,(function(e){return t.refreshLikes(e)})):this._setlikeHandler(this._id,(function(e){return t.refreshLikes(e)}))}},{key:"_handleCardClick",value:function(){this._cardClickHandler(this._name,this._cardElementImg.src)}},{key:"_setEventListeners",value:function(){var t=this;this._basketBtn.addEventListener("click",(function(){return t._removeCardHandler(t)})),this._heartElement.addEventListener("click",(function(){return t._handleChangeHeart()})),this._cardElementImg.addEventListener("click",(function(){return t._handleCardClick()}))}},{key:"_fillCard",value:function(){this._cardElement=this._template.querySelector(this._selectors.cardElementSelector).cloneNode(!0),this._likesCounter=this._cardElement.querySelector(this._selectors.likesCounterSelector),this._heartElement=this._cardElement.querySelector(this._selectors.heartElementSelector),this._cardElementImg=this._cardElement.querySelector(this._selectors.cardElementImgSelector),this._basketBtn=this._cardElement.querySelector(this._selectors.basketBtnSelector),this._cardElement.querySelector(this._selectors.cardElementTitleSelector).textContent=this._name,this._cardElementImg.src=this._link,this._cardElementImg.alt="Фото места: ".concat(this._name),this.refreshLikes(this._likes),this._showBasket||this._basketBtn.remove()}},{key:"getCard",value:function(){return this._loadTemplate(),this._fillCard(),this._setEventListeners(),this._cardElement}},{key:"getId",value:function(){return this._id}},{key:"removeCardElement",value:function(){this._cardElement.remove()}},{key:"refreshLikes",value:function(t){var e=this;this._likes=t,this._likesCounter.textContent=this._likes.length,t.filter((function(t){return e._userProfile._id==t._id})).length>0?this._heartElement.classList.add(this._selectors.heartActiveClass):this._heartElement.classList.remove(this._selectors.heartActiveClass)}}])&&o(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function l(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==u(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==u(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===u(o)?o:String(o)),n)}var o}var c=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._selectors=e,this._userNameElement=document.querySelector(e.userNameSelector),this._aboutUserElement=document.querySelector(e.aboutUserSelector),this._userAvatarElement=document.querySelector(e.userAvatarSelector)}var e,r;return e=t,(r=[{key:"getUserInfo",value:function(){return{name:this._userNameElement.textContent,about:this._aboutUserElement.textContent,avatar:this._userAvatarElement.src,cohort:this._cohort,_id:this._id}}},{key:"setUserInfo",value:function(t){var e=t.name,r=t.about,n=t.avatar,o=t.cohort,i=t._id;this._userNameElement.textContent=e,this._aboutUserElement.textContent=r,this._userAvatarElement.src=n,this._cohort=o,this._id=i}}])&&l(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function s(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==a(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==a(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===a(o)?o:String(o)),n)}var o}var f=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._selectors=e,this._popupElement=document.querySelector(this._selectors.pupupElementSelector),this._btnClose=this._popupElement.querySelector(this._selectors.btnCloseSelector),this._handleEscClose=this._handleEscClose.bind(this)}var e,r;return e=t,(r=[{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"_handleClickOnPopupElement",value:function(t){t.target==this._popupElement&&this.close()}},{key:"open",value:function(){this._popupElement.classList.add(this._selectors.popupOpenedClass),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){document.removeEventListener("keydown",this._handleEscClose),this._popupElement.classList.remove(this._selectors.popupOpenedClass)}},{key:"setEventListeners",value:function(){var t=this;this._popupElement.addEventListener("mousedown",(function(e){t._handleClickOnPopupElement(e)})),this._btnClose.addEventListener("click",(function(){t.close()}))}}])&&s(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function p(t){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p(t)}function h(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==p(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==p(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===p(o)?o:String(o)),n)}var o}function m(){return m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=_(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},m.apply(this,arguments)}function y(t,e){return y=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},y(t,e)}function _(t){return _=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},_(t)}var b=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&y(t,e)}(u,t);var e,r,n,o,i=(n=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=_(n);if(o){var r=_(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===p(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=i.call(this,t))._image=e._popupElement.querySelector(t.imageSelector),e._title=e._popupElement.querySelector(t.titleSelector),e}return e=u,(r=[{key:"open",value:function(t){var e=t.imageSrc,r=t.imageTitle;this._image.src=e,this._image.alt=r,this._title.textContent=r,m(_(u.prototype),"open",this).call(this)}}])&&h(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),u}(f);function d(t){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d(t)}function v(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==d(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==d(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===d(o)?o:String(o)),n)}var o}function S(){return S="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=g(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},S.apply(this,arguments)}function E(t,e){return E=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},E(t,e)}function g(t){return g=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},g(t)}var k=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&E(t,e)}(u,t);var e,r,n,o,i=(n=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=g(n);if(o){var r=g(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===d(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(r=i.call(this,t))._submitHendler=e,r._formElement=r._popupElement.querySelector(t.formElementSelector),r._inputElements=r._popupElement.querySelectorAll(t.inputSelector),r._buttonSubmit=r._popupElement.querySelector(t.buttonSubmitSelector),r._defaultTextButtonSubmit=r._buttonSubmit.textContent,r}return e=u,(r=[{key:"_getInputValues",value:function(){var t={};return this._inputElements.forEach((function(e){t[e.name]=e.value})),t}},{key:"setInputValues",value:function(t){this._inputElements.forEach((function(e){e.value=t[e.name]}))}},{key:"setEventListeners",value:function(){var t=this;this._formElement.addEventListener("submit",(function(e){e.preventDefault(),t._buttonSubmit.textContent="Сохранение...",t._submitHendler(t._getInputValues())})),S(g(u.prototype),"setEventListeners",this).call(this)}},{key:"close",value:function(){this._formElement.reset(),S(g(u.prototype),"close",this).call(this)}},{key:"resetButtonText",value:function(){this._buttonSubmit.textContent=this._defaultTextButtonSubmit}}])&&v(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),u}(f);function w(t){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w(t)}function C(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==w(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==w(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===w(o)?o:String(o)),n)}var o}const O=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._formElement=r,this._selectors=e,this._inputList=Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector)),this._buttonSubmit=this._formElement.querySelector(this._selectors.submitButtonSelector)}var e,r;return e=t,(r=[{key:"_setInputEventListeners",value:function(){var t=this;this._inputList.forEach((function(e){e.addEventListener("input",(function(){return t._handleFormValid(e)}))}))}},{key:"resetValidation",value:function(){var t=this;this._inputList.forEach((function(e){t._hideInputError(e)})),this._toggleButton()}},{key:"_showInputError",value:function(t){var e=this._formElement.querySelector(".".concat(t.id,"-error"));e.classList.add(this._selectors.errorClass),t.classList.add(this._selectors.inputErrorClass),e.textContent=t.validationMessage}},{key:"_hideInputError",value:function(t){this._formElement.querySelector(".".concat(t.id,"-error")).classList.remove(this._selectors.errorClass),t.classList.remove(this._selectors.inputErrorClass)}},{key:"_checkInputValid",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(t){return!t.validity.valid}))}},{key:"_toggleButton",value:function(){this._hasInvalidInput()?(this._buttonSubmit.classList.add(this._selectors.inactiveButtonClass),this._buttonSubmit.setAttribute("disabled",!0)):(this._buttonSubmit.classList.remove(this._selectors.inactiveButtonClass),this._buttonSubmit.removeAttribute("disabled"))}},{key:"_handleFormValid",value:function(t){this._checkInputValid(t),this._toggleButton()}},{key:"enableValidation",value:function(){this._setInputEventListeners()}}])&&C(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function j(t){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},j(t)}function P(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==j(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==j(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===j(o)?o:String(o)),n)}var o}function L(){return L="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=I(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},L.apply(this,arguments)}function T(t,e){return T=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},T(t,e)}function I(t){return I=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},I(t)}var U=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&T(t,e)}(u,t);var e,r,n,o,i=(n=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=I(n);if(o){var r=I(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===j(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(r=i.call(this,t))._confirmHendler=e,r._buttonElement=r._popupElement.querySelector(t.buttonElementSelector),r._defaultTextButtonSubmit=r._buttonElement.textContent,r}return e=u,(r=[{key:"open",value:function(t){this._confirmationObject=t,L(I(u.prototype),"open",this).call(this)}},{key:"close",value:function(){L(I(u.prototype),"close",this).call(this)}},{key:"setEventListeners",value:function(){var t=this;L(I(u.prototype),"setEventListeners",this).call(this),this._buttonElement.addEventListener("click",(function(){t._buttonElement.textContent="Удаление...",t._confirmHendler(t._confirmationObject)}))}},{key:"resetButtonText",value:function(){this._buttonElement.textContent=this._defaultTextButtonSubmit}}])&&P(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),u}(f),R={templateSelector:"#template-card",cardElementSelector:".foto-card__item",cardElementImgSelector:".foto-card__img",heartElementSelector:".foto-card__button-heart",basketBtnSelector:".foto-card__basket",cardElementTitleSelector:".foto-card__title",heartActiveClass:"foto-card__button-heart_active",likesCounterSelector:".foto-card__counter"},B={formSelector:".popup-form",inputSelector:".popup-form__input",submitButtonSelector:".popup-form__btn",inactiveButtonClass:"popup-form__btn_disable",inputErrorClass:"popup-form__input_type_error",errorClass:"popup-form__input-error_active"},A="placename",x="placelink",q="name",D="yourself",H="avatarlink";function V(t){return V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},V(t)}function N(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==V(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==V(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===V(o)?o:String(o)),n)}var o}var z=function(){function t(e){var r=e.baseUrls,n=e.headers;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._baseUrls=r,this._headers=n}var e,r;return e=t,(r=[{key:"_callError",value:function(){}},{key:"_getResponseData",value:function(t,e){return t.ok?t.json():Promise.reject("".concat(e,": ").concat(t.status))}},{key:"getInitialCards",value:function(){var t=this;return fetch(this._baseUrls.cardsUrl,{method:"GET",headers:this._headers}).then((function(e){return t._getResponseData(e,"Ошибка загрузки карточек мест")}))}},{key:"getUserInfo",value:function(){var t=this;return fetch(this._baseUrls.userInfoUrl,{method:"GET",headers:this._headers}).then((function(e){return t._getResponseData(e,"Ошибка загрузки информации о пользователе")}))}},{key:"getUserAvatar",value:function(){var t=this;return fetch(this._baseUrls.userAvatarUrl,{method:"GET",headers:this._headers}).then((function(e){return t._getResponseData(e,"Ошибка загрузки аватара пользователя")}))}},{key:"patchUserInfo",value:function(t){var e=this;return fetch(this._baseUrls.userInfoUrl,{method:"PATCH",headers:this._headers,body:JSON.stringify(t)}).then((function(t){return e._getResponseData(t,"Ошибка отправки информации о пользователе")}))}},{key:"patchAvatar",value:function(t){var e=this;return fetch(this._baseUrls.userAvatarUrl,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:t})}).then((function(t){return e._getResponseData(t,"Ошибка отправки аватара пользователя")}))}},{key:"postCard",value:function(t){var e=this;return fetch(this._baseUrls.cardsUrl,{method:"POST",headers:this._headers,body:JSON.stringify(t)}).then((function(t){return e._getResponseData(t,"Ошибка отправки информации о новом месте")}))}},{key:"deleteCard",value:function(t){var e=this,r="".concat(this._baseUrls.cardsUrl,"/").concat(t);return fetch(r,{method:"DELETE",headers:this._headers}).then((function(t){return e._getResponseData(t,"Ошибка удаления карточки")}))}},{key:"likeCard",value:function(t){var e=this,r="".concat(this._baseUrls.cardsUrl,"/").concat(t,"/likes");return fetch(r,{method:"PUT",headers:this._headers}).then((function(t){return e._getResponseData(t,"Ошибка отправки лайка для карточки")}))}},{key:"delLikeCard",value:function(t){var e=this,r="".concat(this._baseUrls.cardsUrl,"/").concat(t,"/likes");return fetch(r,{method:"DELETE",headers:this._headers}).then((function(t){return e._getResponseData(t,"Ошибка отзыва лайка для карточки")}))}}])&&N(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function J(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var G=document.querySelector(".profile__btn-edit"),F=document.querySelector(".profile__btn-place"),M=document.querySelector(".profile__wrap"),$=Array.from(document.querySelectorAll(B.formSelector)),K=new z({baseUrls:{cardsUrl:"https://mesto.nomoreparties.co/v1/cohort-64/cards",userInfoUrl:"https://nomoreparties.co/v1/cohort-64/users/me",userAvatarUrl:"https://nomoreparties.co/v1/cohort-64/users/me/avatar"},headers:{authorization:"7fa7d08a-8e71-4306-afc1-47a65e80e1dc","Content-Type":"application/json"}}),Q=new r(lt,".foto-card"),W={},X=new b({pupupElementSelector:".popup-zoom",popupOpenedClass:"popup_opened",btnCloseSelector:".popup-zoom__btn-close",imageSelector:".popup-zoom__image",titleSelector:".popup-zoom__text"}),Y=new k({pupupElementSelector:".popup_new_place",popupOpenedClass:"popup_opened",btnCloseSelector:".popup__btn-close",formElementSelector:".popup-form",inputSelector:".popup-form__input",buttonSubmitSelector:".popup-form__btn",inactiveButtonClass:"popup-form__btn_disable"},(function(t){var e={name:t[A],link:t[x]};K.postCard(e).then((function(t){lt(t),Y.close()})).catch((function(t){nt(t)})).finally((function(){return Y.resetButtonText()}))})),Z=new k({pupupElementSelector:".popup_edit_profile",popupOpenedClass:"popup_opened",btnCloseSelector:".popup__btn-close",formElementSelector:".popup-form",inputSelector:".popup-form__input",inputProfileNameClass:"popup-form__input_profile_name",inputProfileJobClass:"popup-form__input_profile_activity",buttonSubmitSelector:".popup-form__btn",inactiveButtonClass:"popup-form__btn_disable"},(function(t){var e={name:t[q],about:t[D]};K.patchUserInfo(e).then((function(t){ut(t),Z.close()})).catch((function(t){nt(t)})).finally((function(){return Z.resetButtonText()}))})),tt=new k({pupupElementSelector:".popup_update_avatar",popupOpenedClass:"popup_opened",btnCloseSelector:".popup__btn-close",formElementSelector:".popup-form",inputSelector:".popup-form__input",buttonSubmitSelector:".popup-form__btn",inactiveButtonClass:"popup-form__btn_disable"},(function(t){var e=t[H];K.patchAvatar(e).then((function(t){ut(t),tt.close()})).catch((function(t){nt(t)})).finally((function(){return tt.resetButtonText()}))})),et=new U({pupupElementSelector:".popup_class_confirmation",popupOpenedClass:"popup_opened",btnCloseSelector:".popup__btn-close",buttonElementSelector:".popup-form__btn"},(function(t){K.deleteCard(t.getId()).then((function(){t.removeCardElement(),et.close()})).catch((function(t){nt(t)})).finally((function(){return et.resetButtonText()}))})),rt=new c({userNameSelector:".profile__name",aboutUserSelector:".profile__about-yourself",userAvatarSelector:".profile__foto"});function nt(t){"string"!=typeof t&&(t="Неизвестная ошибка. Проверьте соединение с Интернетом."),console.log(t)}function ot(t){et.open(t)}function it(t,e){X.open({imageSrc:e,imageTitle:t})}function ut(t){rt.setUserInfo(t)}function lt(t){var e=function(t){var e=new i(t,R,it,ot,rt.getUserInfo(),(function(t,e){return function(t,e){K.likeCard(t).then((function(t){e(t.likes)})).catch((function(t){nt(t)}))}(t,e)}),(function(t,e){return function(t,e){K.delLikeCard(t).then((function(t){e(t.likes)})).catch((function(t){nt(t)}))}(t,e)}));return e.getCard()}(t);Q.addItem(e)}X.setEventListeners(),Y.setEventListeners(),Z.setEventListeners(),et.setEventListeners(),tt.setEventListeners(),G.addEventListener("click",(function(){var t=rt.getUserInfo(),e={};e[q]=t.name,e[D]=t.about,Z.setInputValues(e),Z.open(),W.profile.resetValidation()})),F.addEventListener("click",(function(){Y.open(),W.newplace.resetValidation()})),M.addEventListener("click",(function(){tt.open(),W.avatar.resetValidation()})),$.forEach((function(t){var e=new O(B,t),r=t.getAttribute("name");W[r]=e,e.enableValidation()})),Promise.all([K.getUserInfo(),K.getInitialCards()]).then((function(t){var e,r,n=(r=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i,u,l=[],c=!0,a=!1;try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=i.call(r)).done)&&(l.push(n.value),l.length!==e);c=!0);}catch(t){a=!0,o=t}finally{try{if(!c&&null!=r.return&&(u=r.return(),Object(u)!==u))return}finally{if(a)throw o}}return l}}(e,r)||function(t,e){if(t){if("string"==typeof t)return J(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?J(t,e):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],i=n[1];ut(o),i.reverse(),Q.renderItems(i)})).catch((function(t){nt(t)}))})();