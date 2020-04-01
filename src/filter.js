import { Component } from "./components/component";

const Selector = {
  FILTER_INPUT: `.filter__input`
};

export default class Filter extends Component {
  constructor(props) {
    super(props);

    this._text = props.text;
    this._count = props.count;

    // dom elements
    this._$filterInput = null;

    // outer callback
    this._onChangeCb = null;

    // inner event handlers
    this._onChange = this._onChange.bind(this);

    this._state = {
      checked: false
    };
  }

  get template() {
    return `
      <div>
        <input
          type="radio"
          id="filter__${this._text}"
          class="filter__input visually-hidden"
          name="filter"
          ${this._state.checked ? `checked` : ``}
          ${!this._count ? `disabled` : ``}
        />
        <label for="filter__${this._text}" class="filter__label">
          ${this._text.toUpperCase()} <span class="filter__${this._text}-count">
          ${this._count}</span>
        </label>
      </div>
    `;
  }

  set onChangeCb(cb) {
    this._onChangeCb = cb;
  }

  _initDOMElements() {
    this._$filterInput = this.element.querySelector(Selector.FILTER_INPUT);
  }

  _bind() {
    this._initDOMElements();

    this._$filterInput.addEventListener(`change`, this._onChange);
  }

  _onChange(evt) {
    evt.preventDefault();
    this._state.checked = !this._state.checked;
    this._onChangeCb(this._text);
  }
}
