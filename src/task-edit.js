import { Component } from "./component";

const COLORS_MAP = new Map([
  [`black`, `card--black`],
  [`yellow`, `card--yellow`],
  [`blue`, `card--blue`],
  [`green`, `card--green`],
  [`pink`, `card--pink`]
]);

const Selector = {
  CARD_DATE_DEADLINE_TOGGLE: `.card__date-deadline-toggle`,
  CARD_FORM: `.card__form`,
  CARD_REPEAT_TOGGLE: `.card__repeat-toggle`
};

export class TaskEdit extends Component {
  constructor(props) {
    super();

    this._id = props.id;
    this._color = props.color;
    this._dueDate = props.dueDate;
    this._isDone = props.isDone;
    this._isFavorite = props.isFavorite;
    this._picture = props.picture;
    this._repeatingDays = props.repeatingDays;
    this._tags = props.tags;
    this._title = props.title;

    this._state = {
      isDate: false,
      isRepeated: false
    };

    this._onDateClickCb = null;
    this._onFormSubmitCb = null;
    this._onRepeatToggleClickCb = null;

    this._onDateClick = this._onDateClick.bind(this);
    this._onFormSumbit = this._onFormSumbit.bind(this);
    this._onRepeatToggleClick = this._onRepeatToggleClick.bind(this);
  }

  get template() {
    return `
      <article class="card card--edit ${this._getColor()} ${this._isRepeated() &&
      `card--repeat`}">
        <form class="card__form">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit">
                edit
              </button>
              <button type="button" class="card__btn card__btn--archive ${!this
                ._isDone && `card__btn--disabled`}">
                archive
              </button>
              <button
                type="button"
                class="card__btn card__btn--favorites ${!this._isFavorite &&
                  `card__btn--disabled`}"
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
                            ${this._repeatingDays[day] && `checked`}
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

              <label class="card__img-wrap card__img-wrap--empty">
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
                  ${[...COLORS_MAP.keys()]
                    .map(
                      colorName => `
                        <input
                          type="radio"
                          id="color-${colorName}-${this._id}"
                          class="card__color-input card__color-input--${colorName} visually-hidden"
                          name="color"
                          value="${colorName}"
                          ${this._color === colorName && `checked`}
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

  set onDateClickCb(cb) {
    this._onDateClickCb = cb;
  }

  set onFormSubmitCb(cb) {
    this._onFormSubmitCb = cb;
  }

  set onRepeatToggleClickCb(cb) {
    this._onRepeatToggleClickCb = cb;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).includes(true);
  }

  _getColor() {
    return COLORS_MAP.get(this._color);
  }

  _bind() {
    this.element
      .querySelector(Selector.CARD_DATE_DEADLINE_TOGGLE)
      .addEventListener(`click`, this._onDateClick);
    this.element
      .querySelector(Selector.CARD_FORM)
      .addEventListener(`submit`, this._onFormSumbit);
    this.element
      .querySelector(Selector.CARD_REPEAT_TOGGLE)
      .addEventListener(`click`, this._onRepeatToggleClick);
  }

  _unbind() {
    this.element
      .querySelector(Selector.CARD_DATE_DEADLINE_TOGGLE)
      .removeEventListener(`click`, this._onDateClick);
    this.element
      .querySelector(Selector.CARD_FORM)
      .removeEventListener(`submit`, this._onFormSumbit);
    this.element
      .querySelector(Selector.CARD_REPEAT_TOGGLE)
      .removeEventListener(`click`, this._onRepeatToggleClick);
  }

  update(data) {
    this._color = data.color;
    this._dueDate = props.dueDate;
    this._repeatingDays = data.repeatingDays;
    this._tags = data.tags;
    this._title = data.title;
  }

  _onDateClick() {
    typeof this._onDateClickCb === `function` && this._onDateClickCb();
  }

  _onFormSumbit(evt) {
    typeof this._onFormSubmitCb === `function` && this._onFormSubmitCb();
    evt.preventDefault();
  }

  _onRepeatToggleClick() {
    typeof this._onRepeatToggleClickCb === `function` &&
      this._onRepeatToggleClickCb;
  }
}
