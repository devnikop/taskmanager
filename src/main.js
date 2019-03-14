import {createFilter} from './make-filter.js';
import {getRandomInt} from './util.js';
import {removeAllElementsByClass} from './util.js';
import {task} from './data.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';

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
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < taskCount; i++) {
    fragment.appendChild(tasks[i]);
  }
  boardTasksContainerElement.appendChild(fragment);
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
    const taskComponent = new Task(task);
    const editTaskComponent = new TaskEdit(task);

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      boardTasksContainerElement.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = () => {
      taskComponent.render();
      boardTasksContainerElement.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };

    tasks[i] = taskComponent.render();
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

const boardTasksContainerElement = document.querySelector(`.board__tasks`);

const tasks = createTasks();
const filters = createFilters();

for (const it of tasks) {
  boardTasksContainerElement.appendChild(it);
}

const filterContainerElement = document.querySelector(`.main__filter`);
filterContainerElement.addEventListener(`click`, filterClickHandler);
filterContainerElement.insertAdjacentHTML(`beforeend`, filters.join(``));
