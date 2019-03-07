const Color = new Set([
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
]);

const renderControls = (task) =>
  `<div class='card__control'>
      <button class='card__btn card__btn--edit'>edit</button>
      <button class='card__btn card__btn--archive'>archive</button>
      <button class='card__btn card__btn--favorites ${task.isFavorite ? `` : `card__btn--disabled`}'>favorites</button>
  </div>`;

const renderColorBar = () =>
  `<div class='card__color-bar'>
      <svg width="100%" height="10">
        <use xlink:href="#wave"></use>
      </svg>
  </div>`;

const renderTextarea = (task) =>
  `<div class='card__textarea-wrap'>
      <label>
        <textarea class="card__text" placeholder="Start typing your text here..."
          name="text">${task.title}</textarea>
      </label>
  </div>`;

const renderDates = (task) => {
  const date = new Date(task.dueDate);
  return `<div class="card__dates">
    <button class="card__date-deadline-toggle"
      type="button">date:<span class="card__date-status">no</span>
    </button>
    <fieldset class="card__date-deadline" disabled>
      <label class="card__input-deadline-wrap">
        <input class="card__date"
          type="text"
          placeholder="${date.getDay() + 1} ${date.toLocaleString(`en-us`, {month: `long`})}"
          name="date"
          />
      </label>
      <label class="card__input-deadline-wrap">
        <input class="card__time"
          type="text"
          placeholder="${date.toLocaleString(`en-US`, {hour: `numeric`, hour12: true})}"
          name="time"
          />
      </label>
    </fieldset>
    <button class="card__repeat-toggle"
      type="button">repeat:<span class="card__repeat-status">no</span>
    </button>
    <fieldset class="card__repeat-days" disabled>
      <div class="card__repeat-days-inner">
        ${Object.entries(task.repeatingDays).map(([day, value]) => `<input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${day}-1"
          name="repeat"
          value=${day}
          ${value ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${day}-1">${day}</label>
        `).join(``)}
      </div>
    </fieldset>
  </div>`;
};

const renderHashtag = (task) =>
  `<div class="card__hashtag">
    <div class="card__hashtag-list">
      ${[...task.tags].map((currentTag) => `<span class='card__hashtag-inner'>
        <input class='card__hashtag-hidden-input' type='hidden' name='hashtag' value='${currentTag}'>
        <button class='card__hashtag-name' type='button'>#${currentTag}</button>
        <button class='card__hashtag-delete'></button>
      </span>`).join(``)}
    </div>
    <label>
      <input
        type="text"
        class="card__hashtag-input"
        name="hashtag-input"
        placeholder="Type new hashtag here"
      />
    </label>
  </div>`;

const renderDetails = (task) =>
  `<div class='card__details'>
    ${renderDates(task)}
    ${renderHashtag(task)}
  </div>`;

const renderImage = (task) =>
  `<label class="card__img-wrap card__img-wrap--empty">
    <input
      type="file"
      class="card__img-input visually-hidden"
      name="img"
    />
    <img
      src="${task.picture}"
      alt="task picture"
      class="card__img"
    />
  </label>`;

const renderColors = (task) =>
  `<div class='card__colors-inner'>
    <h3 class="card__colors-title">Color</h3>
    <div class='card__colors-wrap'>
      ${[...Color].map((currentColor) => `<input
        type="radio" id="color-${currentColor}-1"
        class="card__color-input card__color-input--${currentColor} visually-hidden"
        name="color" value="${currentColor}"
        ${currentColor === task.color ? `checked` : ``}
      />
      <label for="color-${currentColor}-1" class="card__color card__color--${currentColor}">${currentColor}</label>
      `).join(``)}
    </div>
  </div>`;

const renderSettings = (task) =>
  `<div class='card__settings'>
    ${renderDetails(task)}
    ${renderImage(task)}
    ${renderColors(task)}
  </div>`;

const renderStatusButtons = () =>
  `<div class= 'card__status-btns'>
    <button class='card__save' type='button'>save</button>
    <button class='card__delete' type='button'>delete</button>
  </div>`;

export const createTask = (task) =>
  `<article class='card card--repeat card--black'>
    <form class='card__form' method='get'>
      <div class='card__inner'>
        ${renderControls(task)}
        ${renderColorBar()}
        ${renderTextarea(task)}
        ${renderSettings(task)}
        ${renderStatusButtons()}
      </div>
    </form>
  </article>`;

