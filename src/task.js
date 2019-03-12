import {createElement} from './util.js';

export default class Task {
  constructor(data) {
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._isFavorite = data.isFavorite;
    this._isDone = data.isDone;

    this._element = null;
    this._state = {
    };

    this._onEdit = null;
    this._editButtonEventBind = null;
  }

  get template() {
    return `
    <article class='card card--black ${this._isRepeated() ? `card--repeat` : ``}'>
      <form class='card__form' method='get'>
        <div class='card__inner'>
          ${this._renderControls()}
          ${this._renderColorBar()}
          ${this._renderTextarea()}
          ${this._renderSettings()}
        </div>
      </form>
    </article>`.trim();
  }

  _renderControls() {
    return `
    <div class='card__control'>
      <button class='card__btn card__btn--edit'>edit</button>
      <button class='card__btn card__btn--archive'>archive</button>
      <button class='card__btn card__btn--favorites ${this._isFavorite ? `` : `card__btn--disabled`}'>favorites</button>
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

  _renderSettings() {
    return `
    <div class='card__settings'>
      ${this._renderDetails()}
      ${this._renderImage()}
    </div>`;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it);
  }

  _onEditButtonClick(evt) {
    evt.preventDefault();
    return typeof this._onEdit === `function` && this._onEdit();
  }

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  bind() {
    this._editButtonEventBind = this._onEditButtonClick.bind(this);
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._editButtonEventBind);
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`).removeEventListener(`click`, this._editButtonEventBind);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}
