import flatpickr from "flatpickr";

import { TaskComponent } from "./task-component";
import moment from "moment";

const Selector = {
  CARD_ARCHIVE: `.card__btn--archive`,
  CARD_DATE_DEADLINE_TOGGLE: `.card__date-deadline-toggle`,
  CARD_DATE: `.card__date`,
  CARD_DELETE: `.card__delete`,
  CARD_FAVORITES: `.card__btn--favorites`,
  CARD_FORM: `.card__form`,
  CARD_REPEAT_TOGGLE: `.card__repeat-toggle`,
  CARD_SAVE: `.card__save`,
  CARD_TIME: `.card__time`,
};

export class TaskEdit extends TaskComponent {
  constructor(props) {
    super(props);

    this._dueDate = props.dueDate;
    this._picture = props.picture;

    this._state = {
      isDate: false,
      isRepeated: false,
    };

    // dom elements
    this._$cardArchive = null;
    this._$cardDelete = null;
    this._$cardFavorites = null;

    // outer callback
    this._onArchiveClickCb = null;
    this._onDateClickCb = null;
    this._onDeleteClickCb = null;
    this._onFavoriteClickCb = null;
    this._onFormSubmitCb = null;
    this._onRepeatToggleClickCb = null;

    // inner event handlers
    this._onArchiveClick = this._onArchiveClick.bind(this);
    this._onDateClick = this._onDateClick.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
    this._onFavoritesClick = this._onFavoritesClick.bind(this);
    this._onFormSumbit = this._onFormSumbit.bind(this);
    this._onRepeatToggleClick = this._onRepeatToggleClick.bind(this);
  }

  get template() {
    this._dueDate && (this._state.isDate = true);
    this._isRepeated() && (this._state.isRepeated = true);

    return `
      <article class="card card--edit ${this._getColor()} ${
      this._isRepeated() && `card--repeat`
    }">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit">
                edit
              </button>
              <button type="button" class="card__btn card__btn--archive ${
                !this._isDone && `card__btn--disabled`
              }">
                archive
              </button>
              <button
                type="button"
                class="card__btn card__btn--favorites ${
                  !this._isFavorite && `card__btn--disabled`
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
                    date: <span class="card__date-status">${
                      this._state.isDate ? `yes` : `no`
                    }</span>
                  </button>

                  <fieldset class="card__date-deadline" ${
                    !this._state.isDate && `disabled`
                  }>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder="23 September"
                        name="date"
                        value="${moment(this._dueDate).format("D MMMM")}"
                      />
                    </label>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__time"
                        type="text"
                        placeholder="11:15 PM"
                        name="time"
                        value="${moment(this._dueDate).format("h:m A")}"
                      />
                    </label>
                  </fieldset>

                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${
                      this._state.isRepeated ? `yes` : `no`
                    }</span>
                  </button>

                  <fieldset class="card__repeat-days" ${
                    !this._state.isRepeated && `disabled`
                  }>
                    <div class="card__repeat-days-inner">
                      ${Object.keys(this._repeatingDays)
                        .map(
                          (day) => `
                            <input
                              class="visually-hidden card__repeat-day-input"
                              type="checkbox"
                              id="repeat-${day}-${this._id}"
                              name="repeat"
                              value="${day}"
                              ${this._repeatingDays[day] && `checked`}
                            />
                            <label
                              class="card__repeat-day"
                              for="repeat-${day}-${this._id}"
                            >${day}</label>
                          `
                        )
                        .join(``)}
                    </div>
                  </fieldset>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                    ${[...this._tags]
                      .map(
                        (tag) =>
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
                  src="${this._picture}"
                  alt="task picture"
                  class="card__img"
                />
              </label>

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  ${[...this._getColorMap().keys()]
                    .map(
                      (colorName) => `
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

  set onArchiveClickCb(cb) {
    this._onArchiveClickCb = cb;
  }

  set onDateClickCb(cb) {
    this._onDateClickCb = cb;
  }

  set onDeleteClickCb(cb) {
    this._onDeleteClickCb = cb;
  }

  set onFavoriteClickCb(cb) {
    this._onFavoriteClickCb = cb;
  }

  set onFormSubmitCb(cb) {
    this._onFormSubmitCb = cb;
  }

  set onRepeatToggleClickCb(cb) {
    this._onRepeatToggleClickCb = cb;
  }

  _partialUpdate() {
    this._unbind();
    this.element.innerHTML = this.template;
    this._bind();
  }

  _processForm(formData) {
    const entry = {
      color: ``,
      dueDate: 0,
      id: this._id,
      isFavorite: false,
      isDone: false,
      repeatingDays: {
        mo: false,
        tu: false,
        we: false,
        th: false,
        fr: false,
        sa: false,
        su: false,
      },
      tags: new Set(),
      title: ``,
    };

    const taskEditMapper = TaskEdit.createMapper(entry);
    for (const pair of formData.entries()) {
      const [prop, value] = pair;
      taskEditMapper[prop] && taskEditMapper[prop](value);
    }

    return entry;
  }

  _initDomElements() {
    this._$cardArchive = this.element.querySelector(Selector.CARD_ARCHIVE);
    this._$cardDelete = this.element.querySelector(Selector.CARD_DELETE);
    this._$cardEdit = this.element.querySelector(Selector.CARD_EDIT);
    this._$cardFavorites = this.element.querySelector(Selector.CARD_FAVORITES);
  }

  _bind() {
    this._initDomElements();

    this._$cardArchive.addEventListener(`click`, this._onArchiveClick);
    this._$cardDelete.addEventListener(`click`, this._onDeleteClick);
    this._$cardFavorites.addEventListener(`click`, this._onFavoritesClick);

    this.element
      .querySelector(Selector.CARD_DATE_DEADLINE_TOGGLE)
      .addEventListener(`click`, this._onDateClick);
    this.element
      .querySelector(Selector.CARD_FORM)
      .addEventListener(`submit`, this._onFormSumbit);
    this.element
      .querySelector(Selector.CARD_REPEAT_TOGGLE)
      .addEventListener(`click`, this._onRepeatToggleClick);

    if (this._state.isDate) {
      flatpickr(".card__date", {
        altInput: true,
        altFormat: "j F",
        dateFormat: "j F",
      });
      flatpickr(".card__time", {
        enableTime: true,
        noCalendar: true,
        altInput: true,
        altFormat: "h:i K",
        dateFormat: "h:i K",
      });
    }
  }

  _unbind() {
    this._$cardArchive.removeEventListener(`click`, this._onArchiveClick);
    this._$cardDelete.removeEventListener(`click`, this._onDeleteClick);
    this._$cardFavorites.removeEventListener(`click`, this._onFavoritesClick);
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
    this._dueDate = data.dueDate;
    this._isDone = data.isDone;
    this._isFavorite = data.isFavorite;
    this._repeatingDays = data.repeatingDays;
    this._tags = data.tags;
    this._title = data.title;
  }

  shake() {
    const ANIMATION_TIMEOUT = 600;
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

  // inner event handlers
  _onArchiveClick() {
    this._isDone = !this._isDone;

    typeof this._onArchiveClickCb === `function` &&
      this._onArchiveClickCb({
        isDone: this._isDone,
      });
  }

  _onDateClick() {
    this._state.isDate = !this._state.isDate;
    this._partialUpdate();

    typeof this._onDateClickCb === `function` && this._onDateClickCb();
  }

  _onDeleteClick() {
    this._onDeleteClickCb(this._id);
  }

  _onFormSumbit(evt) {
    evt.preventDefault();
    const formData = new FormData(
      this.element.querySelector(Selector.CARD_FORM)
    );
    const newData = this._processForm(formData);
    typeof this._onFormSubmitCb === `function` &&
      this._onFormSubmitCb(
        newData,
        this.element.querySelector(Selector.CARD_SAVE)
      );
  }

  _onRepeatToggleClick() {
    this._state.isRepeated = !this._state.isRepeated;
    this._partialUpdate();

    typeof this._onRepeatToggleClickCb === `function` &&
      this._onRepeatToggleClickCb;
  }

  _onFavoritesClick() {
    this._isFavorite = !this._isFavorite;

    typeof this._onFavoriteClickCb === `function` &&
      this._onFavoriteClickCb({ isFavorite: this._isFavorite });
  }

  static createMapper(target) {
    return {
      color: (value) => (target.color = value),
      date: (value) => (target.dueDate = moment(value, "D MMMM").unix()),
      time: (value) => (target.dueDate = moment(value, "h:m A").unix()),
      repeat: (value) => (target.repeatingDays[value] = true),
      hashtag: (value) => target.tags.add(value),
      text: (value) => (target.title = value),
    };
  }
}
