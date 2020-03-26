import { Component } from "./component";

export class Task extends Component {
  constructor(props) {
    super();

    this._title = props.title;
    this._tags = props.tags;
    this._color = props.color;
    this._repeatingDays = props.repeatingDays;
    this._isFavorite = props.isFavorite;
    this._isDone = props.isDone;

    this._onEdit = null;
  }

  get template() {
    return `
      <article class="card card--${this._color} ${this._isRepeated() &&
      `card--repeat`}">
        <form class="card__form" method="get">
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
                </div>
              </div>
            </div>
          </div>
        </form>
      </article>
    `;
  }

  set onEdit(cb) {
    this._onEdit = cb;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).includes(true);
  }

  _bind() {
    this._element
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  _unbind() {
    this._element
      .querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
  }

  _onEditButtonClick() {
    typeof this._onEdit === `function` && this._onEdit();
  }
}
