import { createElement } from "./util";

const COLORS = new Set([`black`, `yellow`, `blue`, `green`, `pink`]);

export class Task {
  constructor(props) {
    this._id = props.id;
    this._title = props.title;
    this._dueDate = props.dueDate;
    this._tags = props.tags;
    this._picture = props.picture;
    this._color = props.color;
    this._repeatingDays = props.repeatingDays;
    this._isFavorite = props.isFavorite;
    this._isDone = props.isDone;

    this._element = null;
    this._onEdit = null;
  }

  _onEditButtonClick() {
    typeof this._onEdit === `function` && this._onEdit();
  }

  get element() {
    return this._element;
  }

  set onEdit(cb) {
    this._onEdit = cb;
  }

  get template() {
    return `
      <article class="card card--${this._color} ${
      Object.values(this._repeatingDays).includes(true) ? `card--repeat` : ``
    }">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit">
                edit
              </button>
              <button type="button" class="card__btn card__btn--archive ${
                this._isDone ? `` : `card__btn--disabled`
              }">
                archive
              </button>
              <button
                type="button"
                class="card__btn card__btn--favorites ${
                  this._isFavorite ? `` : `card__btn--disabled`
                }"
              >
                favorites
              </button>
            </div>

            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >${this._title}</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">no</span>
                  </button>

                  <fieldset class="card__date-deadline" disabled>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder="23 September"
                        name="date"
                        value="${this._dueDate}"
                      />
                    </label>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__time"
                        type="text"
                        placeholder="11:15 PM"
                        name="time"
                      />
                    </label>
                  </fieldset>

                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">no</span>
                  </button>

                  <fieldset class="card__repeat-days" disabled>
                    <div class="card__repeat-days-inner">
                      ${Object.keys(this._repeatingDays).map(
                        day => `
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-${day}-${this._id}"
                            name="repeat"
                            value="${day}"
                            ${this._repeatingDays[day] ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat${
                            this._id
                          }-${day}-5"
                            >${day}</label
                          >
                        `
                      )}
                    </div>
                  </fieldset>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                    ${[...this._tags]
                      .map(
                        tag =>
                          `<span class="card__hashtag-inner">
                            <input
                              type="hidden"
                              name="hashtag"
                              value=${tag}
                              class="card__hashtag-hidden-input"
                            />
                            <button type="button" class="card__hashtag-name">
                              #${tag}
                            </button>
                            <button type="button" class="card__hashtag-delete">
                              delete
                            </button>
                          </span>`
                      )
                      .join(` `)}
                  </div>

                  <label>
                    <input
                      type="text"
                      class="card__hashtag-input"
                      name="hashtag-input"
                      placeholder="Type new hashtag here"
                    />
                  </label>
                </div>
              </div>

              <label class="card__img-wrap ${
                this._picture ? `` : `card__img-wrap--empty`
              }">
                <input
                  type="file"
                  class="card__img-input visually-hidden"
                  name="img"
                />
                <img
                  src=${this._picture}
                  alt="task picture"
                  class="card__img"
                />
              </label>

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  ${[...COLORS]
                    .map(
                      colorName => `
                        <input
                          type="radio"
                          id="color-${colorName}-${this._id}"
                          class="card__color-input card__color-input--${colorName} visually-hidden"
                          name="color"
                          value="${colorName}"
                          ${this._color === colorName ? `checked` : ``}
                        />
                        <label
                          for="color-${colorName}-${this._id}"
                          class="card__color card__color--${colorName}"
                          >${colorName}</label
                        >
                      `
                    )
                    .join(` `)}
                </div>
              </div>
            </div>

            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>
    `;
  }

  _bind() {
    this._element
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  render() {
    this._element = createElement(this.template);
    this._bind();
    return this._element;
  }

  _unbind() {
    // remove event listeners
  }

  unrender() {
    this._unbind();
    this._element = null;
  }
}
