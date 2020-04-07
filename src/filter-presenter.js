import { addTasks } from "./task-presenter";
import { removeChildren } from "./util";
import Filter from "./filter";
import moment from "moment";

const Selector = {
  MAIN_FILTER: `.main__filter`,
  BOARD_TASKS: `.board__tasks`,
};

const mainFilterElement = document.querySelector(Selector.MAIN_FILTER);
const boardTasksElement = document.querySelector(Selector.BOARD_TASKS);

const filterSet = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`,
];

const getFilteredTaskList = (taskList, filter) => {
  let taskListFiltered = [];
  switch (filter) {
    case `all`:
      taskListFiltered = taskList;
      break;
    case `overdue`:
      taskListFiltered = taskList.filter((task) =>
        moment(task.dueDate).isBefore(moment(), "day")
      );
      break;
    case `today`:
      taskListFiltered = taskList.filter((task) =>
        moment(task.dueDate).isSame(moment(), "day")
      );
      break;
    case `favorites`:
      taskListFiltered = taskList.filter((task) => task.isFavorite);
      break;
    case `repeating`:
      taskListFiltered = taskList.filter((task) =>
        Object.values(task.repeatingDays).includes(true)
      );
      break;
    case `tags`:
      taskListFiltered = taskList;
      break;
    case `archive`:
      taskListFiltered = taskList.filter((task) => task.isDone);
    default:
      break;
  }

  return taskListFiltered;
};

const getFilterElement = (taskList, filter) => {
  const filterComponent = new Filter({
    text: filter,
    count: getFilteredTaskList(taskList, filter).length,
  });

  filterComponent.onChangeCb = (filterTitle) => {
    removeChildren(boardTasksElement);
    addTasks(getFilteredTaskList(taskList, filterTitle));
  };

  filterComponent.render();
  return filterComponent.element;
};

const getFilterList = (taskList) => {
  const fragment = document.createDocumentFragment();
  filterSet.forEach((filter) => {
    fragment.appendChild(getFilterElement(taskList, filter));
  });
  return fragment;
};

const addFilters = (taskList) => {
  const filterNodes = getFilterList(taskList);
  mainFilterElement.appendChild(filterNodes);
};

const clearFilters = () => {
  removeChildren(mainFilterElement);
};

const updateFilters = (taskList) => {
  clearFilters();
  addFilters(taskList);
};

export { addFilters, boardTasksElement, updateFilters };
