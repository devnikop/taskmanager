import { getNode, getRandomNumber, removeChildren } from "./util";
import { getFilterHtml } from "./filter-html";
import { addTasks } from "./task";

const Selector = {
  MAIN_FILTER: `.main__filter`,
  BOARD_TASKS: `.board__tasks`
};

const mainFilterElement = document.querySelector(Selector.MAIN_FILTER);
// if (!mainFilterElement) {
//   return null;
// }
const boardTasksElement = document.querySelector(Selector.BOARD_TASKS);
// if (!boardTasksElement) {
//   return null;
// }

const filterSet = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];

const getFilterNode = filter => {
  const filterHtml = getFilterHtml(filter, getRandomNumber(20));
  const filterNode = getNode(filterHtml);
  return filterNode;
};

const getFilterNodeList = () => {
  const fragment = document.createDocumentFragment();
  filterSet.forEach(filter => {
    fragment.appendChild(getFilterNode(filter));
  });
  return fragment;
};

const addFilters = () => {
  const filterNodes = getFilterNodeList();
  mainFilterElement.appendChild(filterNodes);
};

const onMainFilterClick = evt => {
  if (evt.target.classList.contains(`filter__input`)) {
    // boardTasksElement - module task
    removeChildren(boardTasksElement);

    // addTasks - module task
    addTasks(getRandomNumber(5));
  }
};

mainFilterElement.addEventListener(`click`, onMainFilterClick);

addFilters();

export { boardTasksElement };
