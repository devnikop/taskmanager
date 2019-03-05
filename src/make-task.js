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

const renderControls = () =>
  `<div class='card__control'>
      <button class='card__btn card__btn--edit'>edit</button>
      <button class='card__btn card__btn--archive'>archive</button>
      <button class='card__btn card__btn--favorites card__btn--disabled'>favorites</button>
  </div>`;

const renderColorBar = () =>
  `<div class='card__color-bar'>
      <svg width="100%" height="10">
        <use xlink:href="#wave"></use>
      </svg>
  </div>`;

const renderTextarea = () =>
  `<div class='card__textarea-wrap'>
      <label>
        <textarea class="card__text" placeholder="Start typing your text here..."
          name="text">This is example of new task, you can add picture, set date and time, add tags.</textarea>
      </label>
  </div>`;

const renderDates = () =>
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

const renderHashtag = () =>
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

const renderDetails = () => {
  const cardDetailsElement = document.createElement(`div`);
  cardDetailsElement.classList.add(`card__details`);

  cardDetailsElement.insertAdjacentHTML(`beforeend`, renderDates());
  cardDetailsElement.insertAdjacentHTML(`beforeend`, renderHashtag());
  return cardDetailsElement;
};

const renderSettings = () => {
  const cardSettingsElement = document.createElement(`div`);
  cardSettingsElement.classList.add(`card__settings`);
  cardSettingsElement.appendChild(renderDetails());
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

const renderStatusButtons = () =>
  `<div class= 'card__status-btns'>
      <button class='card__save' type='button'>save</button>
      <button class='card__delete' type='button'>delete</button>
  </div>`;

export const createTask = () => {
  const cardElement = document.createElement(`article`);
  cardElement.classList.add(`card`, `card--repeat`, `card--black`);

  const cardFormElement = document.createElement(`form`);
  cardFormElement.classList.add(`card__form`);
  cardFormElement.method = `get`;

  const cardInnerElement = document.createElement(`div`);
  cardInnerElement.classList.add(`card__inner`);
  cardInnerElement.insertAdjacentHTML(`beforeend`, renderControls());
  cardInnerElement.insertAdjacentHTML(`beforeend`, renderColorBar());
  cardInnerElement.insertAdjacentHTML(`beforeend`, renderTextarea());
  cardInnerElement.appendChild(renderSettings());
  cardInnerElement.insertAdjacentHTML(`beforeend`, renderStatusButtons());

  cardFormElement.appendChild(cardInnerElement);
  cardElement.appendChild(cardFormElement);
  boardTasksContainerElement.appendChild(cardElement);
};

export const boardTasksContainerElement = document.querySelector(`.board__tasks`);
