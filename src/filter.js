import {BaseComponent} from './base-component';

export default class Filter extends BaseComponent {
  constructor(data) {
    super();
    this._name = data;

    this._onFilter = null;

    this._filterInputElement = null;

    this._onFilterClick = this._onFilterClick.bind(this);
  }

  get template() {
    return `
    <div>
      <input
        class='filter__input visually-hidden'
        type='radio'
        id='filter__${this._name.toLowerCase()}'
        name='filter'
        >
      <label class='filter__label' for='filter__${this._name.toLowerCase()}'> ${this._name}
        <span class="filter__${this._name.toLowerCase()}-count">(12)</span>
      </label>
    </div>`.trim();
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilterClick() {
    return typeof this._onFilter === `function` && this._onFilter(this._name);
  }

  bind() {
    this._filterInputElement = this.element.querySelector(`.filter__input`);

    this._filterInputElement.addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this._filterInputElement.removeEventListener(`click`, this._onFilterClick);
  }
}
