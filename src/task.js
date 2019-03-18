import {Component} from './component.js';

export default class Task extends Component {
  constructor(data) {
    super(data);

    this._buttonEditElement = null;
    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
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

  _renderDetails() {
    return `
    <div class='card__details'>
      ${this._renderHashtag()}
    </div>`;
  }

  _renderSettings() {
    return `
    <div class='card__settings'>
      ${this._renderDetails()}
      ${this._renderImage()}
    </div>`;
  }

  _onEditButtonClick(evt) {
    evt.preventDefault();
    return typeof this._onEdit === `function` && this._onEdit();
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  bind() {
    this._buttonEditElement = this._element.querySelector(`.card__btn--edit`);
    this._buttonEditElement.addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._buttonEditElement.removeEventListener(`click`, this._onEditButtonClick);
  }
}
