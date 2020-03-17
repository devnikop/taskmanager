import { getNode } from "./util";
import { boardTasksElement } from "./filter";
import { getTaskHtml } from "./task-html";

const TASK_COUNT = 7;

const getTaskNode = () => {
  const taskHtml = getTaskHtml();
  const taskNode = getNode(taskHtml);
  return taskNode;
};

const getTaskNodeList = taskCount => {
  const fragment = document.createDocumentFragment();
  [...Array(taskCount)].forEach(() => fragment.appendChild(getTaskNode()));
  return fragment;
};

const addTasks = taskCount => {
  const taskNodes = getTaskNodeList(taskCount);
  boardTasksElement.appendChild(taskNodes);
};

const initTasks = () => {
  addTasks(TASK_COUNT);
};

export { addTasks, initTasks };
