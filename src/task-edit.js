/* eslint-disable no-return-assign */
import {Component} from './component';
import flatpickr from '../node_modules/flatpickr';
import moment from '../node_modules/moment';

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

    this._onSubmit = null;
    this._onDelete = null;

    this._state.isDate = this._hasDate();
    this._state.isRepeated = this._isRepeated();

    this._cardFormElement = null;
    this._deleteButtonElement = null;
    this._dateToggleElement = null;
    this._repeatToggleElement = null;

    this._onCardFormSubmit = this._onCardFormSubmit.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
    this._dataUpdate = this._dataUpdate.bind(this);
  }

  get template() {
    return `
    <article class='card card--${this._color} card--edit ${this._isRepeated() ? `card--repeat` : ``}'>
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

  _renderDates() {
    return `
    <div class="card__dates">
      <button class="card__date-deadline-toggle"
        type="button">date:<span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
      </button>
      <fieldset class="card__date-deadline" ${!this._state.isDate ? `hidden` : ``}>
        <label class="card__input-deadline-wrap">
          <input class="card__date"
            type="text"
            placeholder="5 March"
            name="date"
            value = "${moment(this._dueDate).format(`D MMMM`)}"
            />
        </label>
        <label class="card__input-deadline-wrap">
          <input class="card__time"
            type="text"
            placeholder="6 PM"
            name="time"
            value = "${moment(this._dueDate).format(`k:mm`)}"
            />
        </label>
      </fieldset>
      <button class="card__repeat-toggle"
        type="button">repeat:<span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
      </button>
      <fieldset class="card__repeat-days" ${!this._state.isRepeated ? `disabled` : ``}>
        <div class="card__repeat-days-inner">
          ${Object.entries(this._repeatingDays).map(([day, value]) => `<input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-${day}-1"
            name="repeat"
            value=${day}
            ${value ? `checked` : ``}
          />
          <label class="card__repeat-day" for="repeat-${day}-1">${day}</label>
          `).join(``)}
        </div>
      </fieldset>
    </div>`;
  }

  _renderDetails() {
    return `
    <div class='card__details'>
      ${this._renderDates()}
      ${this._renderHashtag()}
    </div>`;
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
          ${currentColor === this._color ? `checked` : ``}
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

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: ``,
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
      // eslint-disable-next-line no-unused-expressions
      TaskEditMapper[property] && TaskEditMapper[property](value);
    }

    return entry;
  }

  _onCardFormSubmit(evt) {
    evt.preventDefault();
    const newData = this._dataUpdate();
    return typeof this._onSubmit === `function` && this._onSubmit(newData);
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    return typeof this._onDelete === `function` && this._onDelete();
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.unbind();
    this._dataUpdate();
    this._partialUpdate();
    this.bind();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.unbind();
    this._dataUpdate();
    this._partialUpdate();
    this.bind();
  }

  _dataUpdate() {
    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);
    this.update(newData);
    return newData;
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  bind() {
    this._cardFormElement = this._element.querySelector(`.card__form`);
    this._deleteButtonElement = this.element.querySelector(`.card__delete`);
    this._dateToggleElement = this._element.querySelector(`.card__date-deadline-toggle`);
    this._repeatToggleElement = this._element.querySelector(`.card__repeat-toggle`);

    this._cardFormElement.addEventListener(`submit`, this._onCardFormSubmit);
    this._deleteButtonElement.addEventListener(`click`, this._onDeleteButtonClick);
    this._dateToggleElement.addEventListener(`click`, this._onChangeDate);
    this._repeatToggleElement.addEventListener(`click`, this._onChangeRepeated);

    if (this._state.isDate) {
      const dateInputElement = this._element.querySelector(`.card__date`);
      const timeInputElement = this._element.querySelector(`.card__time`);

      flatpickr(dateInputElement, {onChange: this._dataUpdate, altInput: true, altFormat: `j F`, dateFormat: `j F`});
      // eslint-disable-next-line camelcase
      flatpickr(timeInputElement, {onChange: this._dataUpdate, time_24hr: true, enableTime: true, noCalendar: true, altInput: true, altFormat: `H:i`, dateFormat: `H:i`});
    }
  }

  unbind() {
    this._cardFormElement.removeEventListener(`submit`, this._onCardFormSubmit);
    this._deleteButtonElement.removeEventListener(`click`, this._onDeleteButtonClick);
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
      date: (value) => target.dueDate = moment(value).format(`D MMMM`),
      time: (value) => target.dueDate += value,
    };
  }
}
