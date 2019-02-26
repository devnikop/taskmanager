'use strict';

const FILTER_COUNT_MIN = 0;
const FILTER_COUNT_MAX = 200;
const TASK_COUNT_BEGIN = 7;
const TASK_COUNT_MIN = 1;
const TASK_COUNT_MAX = 7;

const FilterName = {
  ALL: `All`,
  OVERDUE: `Overdue`,
  TODAY: `Today`,
  FAVORITES: `Favorites`,
  REPEATING: `Repeating`,
  TAGS: `Tags`,
  ARCHIVE: `Archive`,
};

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

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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

const filterLabelClickHandler = () => {
  const cardElements = boardTasksContainerElement.querySelectorAll(`.card`);
  cardElements.forEach((cardElement) => {
    cardElement.remove();
  });

  for (let i = 0; i < getRandomInt(TASK_COUNT_MIN, TASK_COUNT_MAX); i++) {
    createTask();
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


const boardTasksContainerElement = document.querySelector(`.board__tasks`);

for (let i = 0; i < TASK_COUNT_BEGIN; i++) {
  createTask();
}

const filterContainerElement = document.querySelector(`.main__filter`);

for (const key in FilterName) {
  if (FilterName.hasOwnProperty(key)) {
    createFilter(FilterName[key]);
  }
}
