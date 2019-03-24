import {taskList as taskDataList} from './data';
import Task from './task';
import TaskEdit from './task-edit';
import Filter from './filter';
import {removeAll} from './util';
import _ from '../node_modules/lodash';
import moment from '../node_modules/moment';

const FilterName = new Set([
  `All`,
  `Overdue`,
  `Today`,
  `Favorites`,
  `Repeating`,
  `Tags`,
  `Archive`,
]);

const clearTaskBoard = () => {
  removeAll(document.querySelectorAll(`.board__tasks .card`));
};

const createTasks = (taskList) => {
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
      const updatedTask = Object.assign(taskDataList[i], newObject);

      taskComponent.update(_.cloneDeep(updatedTask));
      taskComponent.render();
      boardTasksContainerElement.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };

    editTaskComponent.onDelete = () => {
      clearTaskBoard();
      taskList[i] = `deleted`;
      appendTasks(createTasks(taskDataList));
    };

    tasks[i] = taskComponent.render();
  }
  return tasks;
};

const getOverdueTasks = () => taskDataList.map((task) => moment().isAfter(moment(task.dueDate)) ? task : `deleted`);
const getTodayTasks = () => taskDataList.map((task) => moment(task.dueDate).isSame(moment(), `day`) ? task : `deleted`);
const getRepeatingTasks = () => taskDataList.map((task) => Object.values(task.repeatingDays).some((it) => it) ? task : `deleted`);

const filterTasks = (filterName) => {
  let filteredTasks = [];
  switch (filterName) {
    case `All`:
      filteredTasks = createTasks(taskDataList);
      break;
    case `Overdue`:
      filteredTasks = createTasks(getOverdueTasks());
      break;
    case `Today`:
      filteredTasks = createTasks(getTodayTasks());
      break;
    case `Repeating`:
      filteredTasks = createTasks(getRepeatingTasks());
      break;
    default:
      break;
  }
  appendTasks(filteredTasks);
};

const createFilters = () => {
  let filters = [];
  for (let i = 0; i < FilterName.size; i++) {
    const filterComponent = new Filter([...FilterName][i]);

    filterComponent.onFilter = (filterName) => {
      clearTaskBoard();
      filterTasks(filterName);
    };

    filters[i] = filterComponent.render();
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

const appendFilters = (filters) => {
  for (const filter of filters) {
    filterContainerElement.appendChild(filter);
  }
};

const boardTasksContainerElement = document.querySelector(`.board__tasks`);
const tasks = createTasks(taskDataList);
appendTasks(tasks);

const filterContainerElement = document.querySelector(`.main__filter`);
const filters = createFilters();
appendFilters(filters);
