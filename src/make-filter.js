import {createTask} from './make-task.js';
import {boardTasksContainerElement} from './make-task.js';
import {getRandomInt} from './util.js';

const FILTER_COUNT_MIN = 0;
const FILTER_COUNT_MAX = 200;
const TASK_COUNT_MIN = 1;
const TASK_COUNT_MAX = 7;

const filterInputClickHandler = (evt) => {
  if (evt.target.matches(`.filter__input`)) {
    const cardElements = boardTasksContainerElement.querySelectorAll(`.card`);
    for (const value of cardElements) {
      value.remove();
    }

    for (let i = 0; i < getRandomInt(TASK_COUNT_MIN, TASK_COUNT_MAX); i++) {
      createTask();
    }
  }
};

const filterContainerElement = document.querySelector(`.main__filter`);
filterContainerElement.addEventListener(`click`, filterInputClickHandler);

export const createFilter = (filterId) => {
  filterContainerElement.insertAdjacentHTML(`beforeend`, `<input
    class='filter__input visually-hidden'
    type='radio'
    id='filter__${filterId.toLowerCase()}'
    name='filter'
    checked>
    <label class='filter__label' for='filter__${filterId.toLowerCase()}'> ${filterId}
      <span class="filter__${filterId.toLowerCase()}-count">${getRandomInt(FILTER_COUNT_MIN, FILTER_COUNT_MAX)}</span>
    </label>
  `);
};
