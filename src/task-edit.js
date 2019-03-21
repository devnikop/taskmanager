import {Component} from './component';
import flatpickr from '../node_modules/flatpickr';

const Color = new Set([
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
]);

export default class TaskEdit extends Component {
  constructor(data) {
    super(data);
    this._dueDate = data.dueDate;

    this._onSubmit = null;

    this._state.isDate = false;
    this._state.isRepeated = false;

    this._cardFormElement = null;
    this._dateToggleElement = null;
    this._repeatToggleElement = null;

    this._onCardFormSubmit = this._onCardFormSubmit.bind(this);
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
  }

  get template() {
    return `
    <article class='card card--${this._color} card--edit ${this._isRepeated() && `card--repeat`}'>
      <form class='card__form' method='get'>
        <div class='card__inner'>
          ${this._renderControls()}
          ${this._renderColorBar()}
          ${this._renderTextarea()}
          ${this._renderSettings()}
          ${this._renderStatusButtons()}
        </div>
      </form>
    </article>`.trim();
  }

  _renderColors() {
    return `
    <div class='card__colors-inner'>
      <h3 class="card__colors-title">Color</h3>
      <div class='card__colors-wrap'>
        ${Array.from(Color).map((currentColor) => `<input
          type="radio" id="color-${currentColor}-1"
          class="card__color-input card__color-input--${currentColor} visually-hidden"
          name="color" value="${currentColor}"
          ${currentColor === this._color && `checked`}
        />
        <label for="color-${currentColor}-1" class="card__color card__color--${currentColor}">${currentColor}</label>
        `).join(``)}
      </div>
    </div>`;
  }

  _renderSettings() {
    return `
    <div class='card__settings'>
      ${this._renderDetails()}
      ${this._renderImage()}
      ${this._renderColors()}
    </div>`;
  }

  _renderStatusButtons() {
    return `
    <div class= 'card__status-btns'>
      <button class='card__save' type='submit'>save</button>
      <button class='card__delete' type='button'>delete</button>
    </div>`;
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: new Date(),
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false
      }
    };

    const TaskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      TaskEditMapper[property] && TaskEditMapper[property](value);
    }

    return entry;
  }

  _onCardFormSubmit(evt) {
    evt.preventDefault();

    // const formData = new FormData(this._cardFormElement);
    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);
    this.update(newData);

    return typeof this._onSubmit === `function` && this._onSubmit(newData);
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
    // this._element = createElement(this.template);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  bind() {
    this._cardFormElement = this._element.querySelector(`.card__form`);
    this._dateToggleElement = this._element.querySelector(`.card__date-deadline-toggle`);
    this._repeatToggleElement = this._element.querySelector(`.card__repeat-toggle`);

    this._cardFormElement.addEventListener(`submit`, this._onCardFormSubmit);
    this._dateToggleElement.addEventListener(`click`, this._onChangeDate);
    this._repeatToggleElement.addEventListener(`click`, this._onChangeRepeated);

    if (this._state.isDate) {
      const dateInputElement = this._element.querySelector(`.card__date`);
      const timeInputElement = this._element.querySelector(`.card__time`);

      flatpickr(dateInputElement, {altInput: true, altFormat: `j F`, dateFormat: `j F`});
      flatpickr(timeInputElement, {enableTime: true, noCalendar: true, altInput: true, altFormat: `h:i K`, dateFormat: `h:i K`});
    }
  }

  unbind() {
    this._cardFormElement.removeEventListener(`submit`, this._onCardFormSubmit);
    this._dateToggleElement.removeEventListener(`click`, this._onChangeDate);
    this._repeatToggleElement.removeEventListener(`click`, this._onChangeRepeated);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
  }

  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => target.title = value,
      color: (value) => target.color = value,
      repeat: (value) => target.repeatingDays[value] = true,
      date: (value) => target.dueDate[value],
    };
  }
}
