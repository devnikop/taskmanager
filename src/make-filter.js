import {createTask} from './make-task.js';
import {boardTasksContainerElement} from './make-task.js';

const FILTER_COUNT_MIN = 0;
const FILTER_COUNT_MAX = 200;
const TASK_COUNT_MIN = 1;
const TASK_COUNT_MAX = 7;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const filterLabelClickHandler = () => {
  const cardElements = boardTasksContainerElement.querySelectorAll(`.card`);
  cardElements.forEach((cardElement) => {
    cardElement.remove();
  });

  for (let i = 0; i < getRandomInt(TASK_COUNT_MIN, TASK_COUNT_MAX); i++) {
    createTask();
  }
};

const filterLabelGenerate = (filterId) => {
  const filterLabelElement = document.createElement(`label`);
  filterLabelElement.addEventListener(`click`, filterLabelClickHandler);
  filterLabelElement.classList.add(`filter__label`);
  filterLabelElement.htmlFor = `filter__${filterId.toLowerCase()} `;
  filterLabelElement.insertAdjacentHTML(`beforeend`, `${filterId}
    <span class="filter__${filterId.toLowerCase()}-count">${getRandomInt(FILTER_COUNT_MIN, FILTER_COUNT_MAX)}</span>`);
  return filterLabelElement;
};

const filterContainerElement = document.querySelector(`.main__filter`);

export const createFilter = (filterId) => {
  filterContainerElement.insertAdjacentHTML(`beforeend`, `<input
    class='filter__input visually-hidden'
    type='radio'
    id='filter__${filterId.toLowerCase()}'
    name='filter'
    checked>`);
  filterContainerElement.appendChild(filterLabelGenerate(filterId));
};
