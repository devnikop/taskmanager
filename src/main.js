import {createTask} from './make-task.js';
import {createFilter} from './make-filter.js';
import {getRandomInt} from './util.js';
import {removeAllElementsByClass} from './util.js';
import {task} from './data.js';

const TASK_COUNT = 7;
const TASK_COUNT_MIN = 1;
const TASK_COUNT_MAX = 7;

const FilterName = new Set([
  `All`,
  `Overdue`,
  `Today`,
  `Favorites`,
  `Repeating`,
  `Tags`,
  `Archive`,
]);

const addRandomCountOfTask = (taskCount) => {
  let tempTasksList = [];
  for (let i = 0; i < taskCount; i++) {
    tempTasksList[i] = tasks[i];
  }
  boardTasksContainerElement.insertAdjacentHTML(`beforeend`, tempTasksList.join(``));
};

const filterClickHandler = (evt) => {
  if (evt.target.matches(`.filter__input`)) {
    removeAllElementsByClass(document.querySelectorAll(`.board__tasks .card`));
    addRandomCountOfTask(getRandomInt(TASK_COUNT_MIN, TASK_COUNT_MAX));
  }
};

const createTasks = () => {
  let tasks = [];
  for (let i = 0; i < TASK_COUNT; i++) {
    tasks[i] = createTask(task);
  }
  return tasks;
};

const createFilters = () => {
  let filters = [];
  for (let i = 0; i < FilterName.size; i++) {
    filters[i] = createFilter([...FilterName][i]);
  }
  return filters;
};

const tasks = createTasks();
const filters = createFilters();

const boardTasksContainerElement = document.querySelector(`.board__tasks`);
boardTasksContainerElement.insertAdjacentHTML(`beforeend`, tasks.join(``));

const filterContainerElement = document.querySelector(`.main__filter`);
filterContainerElement.addEventListener(`click`, filterClickHandler);
filterContainerElement.insertAdjacentHTML(`beforeend`, filters.join(``));
