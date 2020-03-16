/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _make_task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./make-task.js */ "./src/make-task.js");
/* harmony import */ var _make_filter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./make-filter.js */ "./src/make-filter.js");



const FilterName = {
  ALL: `All`,
  OVERDUE: `Overdue`,
  TODAY: `Today`,
  FAVORITES: `Favorites`,
  REPEATING: `Repeating`,
  TAGS: `Tags`,
  ARCHIVE: `Archive`,
};

const TASK_COUNT_BEGIN = 7;

for (let i = 0; i < TASK_COUNT_BEGIN; i++) {
  Object(_make_task_js__WEBPACK_IMPORTED_MODULE_0__["createTask"])();
}


for (const key in FilterName) {
  if (FilterName.hasOwnProperty(key)) {
    Object(_make_filter_js__WEBPACK_IMPORTED_MODULE_1__["createFilter"])(FilterName[key]);
  }
}


/***/ }),

/***/ "./src/make-filter.js":
/*!****************************!*\
  !*** ./src/make-filter.js ***!
  \****************************/
/*! exports provided: createFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilter", function() { return createFilter; });
/* harmony import */ var _make_task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./make-task.js */ "./src/make-task.js");


const FILTER_COUNT_MIN = 0;
const FILTER_COUNT_MAX = 200;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const filterLabelClickHandler = () => {
  const cardElements = boardTasksContainerElement.querySelectorAll(`.card`);
  cardElements.forEach((cardElement) => {
    cardElement.remove();
  });

  for (let i = 0; i < getRandomInt(TASK_COUNT_MIN, TASK_COUNT_MAX); i++) {
    Object(_make_task_js__WEBPACK_IMPORTED_MODULE_0__["createTask"])();
  }
};

const filterLabelGenerate = (filterId) => {
  const filterLabelElement = document.createElement(`label`);
  filterLabelElement.addEventListener(`click`, filterLabelClickHandler);
  filterLabelElement.classList.add(`filter__label`);
  filterLabelElement.htmlFor = `filter__${filterId.toLowerCase()} `;
  filterLabelElement.insertAdjacentHTML(`beforeend`, `${filterId}
    <span class="filter__${filterId.toLowerCase()}-count">${getRandomInt(FILTER_COUNT_MIN, FILTER_COUNT_MAX)}</span>`);
  return filterLabelElement;
};

const createFilter = (filterId) => {
  filterContainerElement.insertAdjacentHTML(`beforeend`, `<input
    class='filter__input visually-hidden'
    type='radio'
    id='filter__${filterId.toLowerCase()}'
    name='filter'
    checked>`);
  filterContainerElement.appendChild(filterLabelGenerate(filterId));
};

const filterContainerElement = document.querySelector(`.main__filter`);


/***/ }),

/***/ "./src/make-task.js":
/*!**************************!*\
  !*** ./src/make-task.js ***!
  \**************************/
/*! exports provided: createTask */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTask", function() { return createTask; });
const TASK_COUNT_MIN = 1;
const TASK_COUNT_MAX = 7;

const Color = {
  BLACK: `black`,
  YELLOW: `yellow`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`
};

const Day = {
  MONDAY: `mo`,
  TUESDAY: `tu`,
  WEDNESDAY: `we`,
  THURSDAY: `th`,
  FRIDAY: `fr`,
  SATURDAY: `sa`,
  SUNDAY: `su`
};

const cardControlGenerate = () =>
  `<div class='card__control'>
      <button class='card__btn card__btn--edit'>edit</button>
      <button class='card__btn card__btn--archive'>archive</button>
      <button class='card__btn card__btn--favorites card__btn--disabled'>favorites</button>
  </div>`;

const cardColorBarGenerate = () =>
  `<div class='card__color-bar'>
      <svg width="100%" height="10">
        <use xlink:href="#wave"></use>
      </svg>
  </div>`;

const cardTextareaGenerate = () =>
  `<div class='card__textarea-wrap'>
      <label>
        <textarea class="card__text" placeholder="Start typing your text here..."
          name="text">This is example of new task, you can add picture, set date and time, add tags.</textarea>
      </label>
  </div>`;

const cardDatesGenerate = () =>
  `<div class="card__dates">
    <button class="card__date-deadline-toggle"
      type="button">date:<span class="card__date-status">no</span>
    </button>
    <fieldset class="card__date-deadline" disabled>
      <label class="card__input-deadline-wrap">
        <input class="card__date"
          type="text"
          placeholder="23 September"
          name="date"
          />
      </label>
      <label class="card__input-deadline-wrap">
        <input class="card__time"
          type="text"
          placeholder="11:15 PM"
          name="time"
          />
      </label>
    </fieldset>
    <button class="card__repeat-toggle"
      type="button">repeat:<span class="card__repeat-status">no</span>
    </button>
    <fieldset class="card__repeat-days" disabled>
      <div class="card__repeat-days-inner">
        ${Object.values(Day).map((day) => `<input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${day}-1"
          name="repeat"
          value=${day}
        />
        <label
          class="card__repeat-day"
          for="repeat-${day}-1"
          >${day}
        </label>
        `)}
      </div>
    </fieldset>
  </div>`;

const cardHashtagGenerate = () =>
  `<div class="card__hashtag">
    <div class="card__hashtag-list"></div>
    <label>
      <input
        type="text"
        class="card__hashtag-input"
        name="hashtag-input"
        placeholder="Type new hashtag here"
      />
    </label>
  </div>`;

const cardDetailsGenerate = () => {
  const cardDetailsElement = document.createElement(`div`);
  cardDetailsElement.classList.add(`card__details`);

  cardDetailsElement.insertAdjacentHTML(`beforeend`, cardDatesGenerate());
  cardDetailsElement.insertAdjacentHTML(`beforeend`, cardHashtagGenerate());
  return cardDetailsElement;
};

const cardSettingsGenerate = () => {
  const cardSettingsElement = document.createElement(`div`);
  cardSettingsElement.classList.add(`card__settings`);
  cardSettingsElement.appendChild(cardDetailsGenerate());
  cardSettingsElement.insertAdjacentHTML(`beforeend`, `<label
    class="card__img-wrap card__img-wrap--empty">
      <input
        type="file"
        class="card__img-input visually-hidden"
        name="img"
      />
      <img
        src="img/add-photo.svg"
        alt="task picture"
        class="card__img"
      />
    </label>
    <div class='card__colors-inner'>
      <h3 class="card__colors-title">Color</h3>
      <div class='card__colors-wrap'>
        ${Object.values(Color).map((color) => `<input
          type="radio"
          id="color-${color}-1"
          class="card__color-input card__color-input--${color} visually-hidden"
          name="color"
          value="${color}"
          checked
        />
        <label
          for="color-${color}-1"
          class="card__color card__color--${color}"
          >${color}
        </label>
        `)}
      </div>
    </div>`);

  return cardSettingsElement;
};

const cardStatusButtonsGenerate = () =>
  `<div class= 'card__status-btns'>
      <button class='card__save' type='button'>save</button>
      <button class='card__delete' type='button'>delete</button>
  </div>`;

const createTask = () => {
  const cardElement = document.createElement(`article`);
  cardElement.classList.add(`card`, `card--repeat`, `card--black`);

  const cardFormElement = document.createElement(`form`);
  cardFormElement.classList.add(`card__form`);
  cardFormElement.method = `get`;

  const cardInnerElement = document.createElement(`div`);
  cardInnerElement.classList.add(`card__inner`);
  cardInnerElement.insertAdjacentHTML(`beforeend`, cardControlGenerate());
  cardInnerElement.insertAdjacentHTML(`beforeend`, cardColorBarGenerate());
  cardInnerElement.insertAdjacentHTML(`beforeend`, cardTextareaGenerate());
  cardInnerElement.appendChild(cardSettingsGenerate());
  cardInnerElement.insertAdjacentHTML(`beforeend`, cardStatusButtonsGenerate());

  cardFormElement.appendChild(cardInnerElement);
  cardElement.appendChild(cardFormElement);
  boardTasksContainerElement.appendChild(cardElement);
};

const boardTasksContainerElement = document.querySelector(`.board__tasks`);



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map