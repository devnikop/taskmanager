import API from './api';
import Task from './task';
import TaskEdit from './task-edit';
import Filter from './filter';
import {createStatistics} from './statistic';
import {removeAll} from './util';
import _ from '../node_modules/lodash';
import moment from '../node_modules/moment';

const END_POINT = `https://es8-demo-srv.appspot.com/task-manager`;
const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;

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

const blockForm = (editTaskComponent) => {
  cardFormElement = editTaskComponent.element.querySelector(`.card__inner`);
  cardFormElement.style.border = `1px solid black`;
  cardFormElement.classList.remove(`shake`);
  saveButtonElement = editTaskComponent.element.querySelector(`.card__save`);
  deleteButtonElement = editTaskComponent.element.querySelector(`.card__delete`);
  saveButtonElement.disabled = true;
  deleteButtonElement.disabled = true;
};

const unblockForm = () => {
  cardFormElement.classList.add(`shake`);
  cardFormElement.style.border = `1px solid red`;
  saveButtonElement.disabled = false;
  deleteButtonElement.disabled = false;
};

let cardFormElement = ``;
let saveButtonElement = ``;
let deleteButtonElement = ``;

const createTasks = (taskList) => {
  let tasks = [];
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i] === ``) {
      tasks[i] = ``;
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
      blockForm(editTaskComponent);
      saveButtonElement.textContent = `Saving...`;


      api.updateTask({id: updatedTask.id, data: updatedTask.toRAW()})
        .then((newTask) => {
          taskComponent.update(_.cloneDeep(newTask));
          taskComponent.render();
          boardTasksContainerElement.replaceChild(taskComponent.element, editTaskComponent.element);
          editTaskComponent.unrender();
        })
        .catch(() => {
          unblockForm();
          saveButtonElement.textContent = `Save`;
        });
    };

    editTaskComponent.onDelete = (id) => {
      blockForm(editTaskComponent);
      deleteButtonElement.textContent = `Deleting...`;

      api.deleteTask({id})
      // must try to refactor for deleting only 1 task from DOM
        .then(clearTaskBoard)
        .then(() => api.getTasks())
        .then((serverTasks) => {
          taskDataList = serverTasks;
          appendTasks(createTasks(taskDataList));
        })
        .catch(() => {
          unblockForm();
          deleteButtonElement.textContent = `Delete`;
        });
    };

    tasks[i] = taskComponent.render();
  }
  return tasks;
};

const getOverdueTasks = () => {
  const isDueDate = (task) => moment().isAfter(moment(task.dueDate));
  return taskDataList.filter((task) => isDueDate(task));
};
const getTodayTasks = () => {
  const isToday = (task) => moment(task.dueDate).isSame(moment(), `day`);
  return taskDataList.filter((task) => isToday(task));
};
const getRepeatingTasks = () => {
  const isRepeating = (task) => Object.values(task.repeatingDays).some((it) => it);
  return taskDataList.filter((task) => isRepeating(task));
};

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
    boardTasksContainerElement.appendChild(task);
  }
};

const appendFilters = (filters) => {
  for (const filter of filters) {
    filterContainerElement.appendChild(filter);
  }
};

const onStatisticButtonClick = () => {
  boardContainerElement.classList.add(`visually-hidden`);
  statisticContainerElement.classList.remove(`visually-hidden`);
};

const onTaskButtonClick = () => {
  statisticContainerElement.classList.add(`visually-hidden`);
  boardContainerElement.classList.remove(`visually-hidden`);
};

const onError = () => {
  noTasksElement.classList.remove(`visually-hidden`);
  noTasksElement.textContent = `Something went wrong while loading your tasks. Check your connection or try again later`;
};

const boardTasksContainerElement = document.querySelector(`.board__tasks`);
const noTasksElement = document.querySelector(`.board__no-tasks`);
noTasksElement.textContent = `Loading tasks...`;
noTasksElement.classList.remove(`visually-hidden`);

let taskDataList = [];

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
api.getTasks()
  .then((serverTasks) => {
    taskDataList = serverTasks;
    createStatistics(taskDataList);
    return taskDataList;
  })
  .then((serverTasks) => {
    taskDataList = serverTasks;
    noTasksElement.classList.add(`visually-hidden`);
    appendTasks(createTasks(taskDataList));
  })
  .catch((onError));

const filterContainerElement = document.querySelector(`.main__filter`);
const filters = createFilters();
appendFilters(filters);

const boardContainerElement = document.querySelector(`.board.container`);
const statisticContainerElement = document.querySelector(`.statistic`);
const statisticButtonElement = document.querySelector(`#control__statistic`);
const taskButtonElement = document.querySelector(`#control__task`);

statisticButtonElement.addEventListener(`click`, onStatisticButtonClick);
taskButtonElement.addEventListener(`click`, onTaskButtonClick);
