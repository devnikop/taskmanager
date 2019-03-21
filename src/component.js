import {createElement} from "./util";

export class Component {
  constructor(data) {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }

    this._title = data.title;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._isFavorite = data.isFavorite;
    this._isDone = data.isDone;

    this._element = null;
    this._state = {};
  }

  _renderControls() {
    return `
    <div class='card__control'>
      <button class='card__btn card__btn--edit'>edit</button>
      <button class='card__btn card__btn--archive'>archive</button>
      <button class='card__btn card__btn--favorites ${this._isFavorite || `card__btn--disabled`}'>favorites</button>
    </div>`;
  }

  _renderColorBar() {
    return `
    <div class='card__color-bar'>
      <svg width="100%" height="10">
        <use xlink:href="#wave"></use>
      </svg>
    </div>`;
  }

  _renderTextarea() {
    return `
    <div class='card__textarea-wrap'>
      <label>
        <textarea class="card__text" placeholder="Start typing your text here..."
          name="text">${this._title}</textarea>
      </label>
    </div>`;
  }

  _renderDates() {
    const date = new Date(this._dueDate);
    return `
    <div class="card__dates">
      <button class="card__date-deadline-toggle"
        type="button">date:<span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
      </button>
      <fieldset class="card__date-deadline" ${!this._state.isDate && `disabled`}>
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
        type="button">repeat:<span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
      </button>
      <fieldset class="card__repeat-days" ${!this._state.isRepeated && `disabled`}>
        <div class="card__repeat-days-inner">
          ${Object.entries(this._repeatingDays).map(([day, value]) => `<input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-${day}-1"
            name="repeat"
            value=${day}
            ${value && `checked`}
          />
          <label class="card__repeat-day" for="repeat-${day}-1">${day}</label>
          `).join(``)}
        </div>
      </fieldset>
    </div>`;
  }

  _renderHashtag() {
    return `
    <div class="card__hashtag">
      <div class="card__hashtag-list">
        ${Array.from(this._tags).map((currentTag) => `
          <span class='card__hashtag-inner'>
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
  }

  _renderDetails() {
    return `
    <div class='card__details'>
      ${this._renderDates()}
      ${this._renderHashtag()}
    </div>`;
  }

  _renderImage() {
    return `
    <label class="card__img-wrap card__img-wrap--empty">
      <input
        type="file"
        class="card__img-input visually-hidden"
        name="img"
      />
      <img
        src="${this._picture}"
        alt="task picture"
        class="card__img"
      />
    </label>`;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it);
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  bind() {}

  unbind() {}

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }

  update() {}
}
