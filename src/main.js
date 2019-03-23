import {createFilter} from './make-filter';
import {getRandomInt, removeAll} from './util';
import {taskList} from './data';
import Task from './task';
import TaskEdit from './task-edit';
import _ from '../node_modules/lodash';

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
    removeAll(document.querySelectorAll(`.board__tasks .card`));
    addRandomCountOfTask(getRandomInt(TASK_COUNT_MIN, TASK_COUNT_MAX));
  }
};

const createTasks = () => {
  let tasks = [];
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i] === `deleted`) {
      tasks[i] = `deleted`;
      continue;
    }
    const task = taskList[i];
    const taskComponent = new Task(_.cloneDeep(task));
    const editTaskComponent = new TaskEdit(_.cloneDeep(task));

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      boardTasksContainerElement.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = (newObject) => {
      const updatedTask = Object.assign({}, task, newObject);

      taskComponent.update(_.cloneDeep(updatedTask));
      taskComponent.render();
      boardTasksContainerElement.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };

    editTaskComponent.onDelete = () => {
      removeAll(document.querySelectorAll(`.board__tasks .card`));
      taskList[i] = `deleted`;
      appendTasks(createTasks());
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

const appendTasks = (tasks) => {
  for (const task of tasks) {
    if (task !== `deleted`) {
      boardTasksContainerElement.appendChild(task);
    }
  }
};

const boardTasksContainerElement = document.querySelector(`.board__tasks`);

const tasks = createTasks();
appendTasks(tasks);

const filters = createFilters();

const filterContainerElement = document.querySelector(`.main__filter`);
filterContainerElement.addEventListener(`click`, filterClickHandler);
filterContainerElement.insertAdjacentHTML(`beforeend`, filters.join(``));
