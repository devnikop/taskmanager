import { TaskComponent } from "./task-component";

const Selector = {
  CARD_ARCHIVE: `.card__btn--archive`,
  CARD_EDIT: `.card__btn--edit`,
  CARD_FAVORITES: `.card__btn--favorites`
};

export class Task extends TaskComponent {
  constructor(props) {
    super(props);

    // dom elements
    this._$cardArchive = null;
    this._$cardEdit = null;
    this._$cardFavorites = null;

    // outer callback
    this._onArchiveClickCb = null;
    this._onEditClickCb = null;
    this._onFavoriteClickCb = null;

    // inner event handlers
    this._onArchiveClick = this._onArchiveClick.bind(this);
    this._onEditClick = this._onEditClick.bind(this);
    this._onFavoritesClick = this._onFavoritesClick.bind(this);
  }

  get template() {
    return `
      <article class="card ${this._getColor()} ${this._isRepeated() &&
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

  set onArchiveClickCb(cb) {
    this._onArchiveClickCb = cb;
  }

  set onEditClickCb(cb) {
    this._onEditClickCb = cb;
  }

  set onFavoriteClickCb(cb) {
    this._onFavoriteClickCb = cb;
  }

  _initDomElements() {
    this._$cardArchive = this.element.querySelector(Selector.CARD_ARCHIVE);
    this._$cardEdit = this.element.querySelector(Selector.CARD_EDIT);
    this._$cardFavorites = this.element.querySelector(Selector.CARD_FAVORITES);
  }

  _bind() {
    this._initDomElements();

    this._$cardArchive.addEventListener(`click`, this._onArchiveClick);
    this._$cardEdit.addEventListener(`click`, this._onEditClick);
    this._$cardFavorites.addEventListener(`click`, this._onFavoritesClick);
  }

  _unbind() {
    this._$cardArchive.removeEventListener(`click`, this._onArchiveClick);
    this._$cardEdit.removeEventListener(`click`, this._onEditClick);
    this._$cardFavorites.removeEventListener(`click`, this._onFavoritesClick);
  }

  update(data) {
    this._color = data.color;
    this._isDone = data.isDone;
    this._isFavorite = data.isFavorite;
    this._repeatingDays = data.repeatingDays;
    this._tags = data.tags;
    this._title = data.title;
  }

  _onArchiveClick() {
    this._isDone = !this._isDone;

    typeof this._onArchiveClickCb === `function` &&
      this._onArchiveClickCb({
        isDone: this._isDone
      });
  }

  _onEditClick() {
    typeof this._onEditClickCb === `function` && this._onEditClickCb();
  }

  _onFavoritesClick() {
    this._isFavorite = !this._isFavorite;

    typeof this._onFavoriteClickCb === `function` &&
      this._onFavoriteClickCb({ isFavorite: this._isFavorite });
  }
}
