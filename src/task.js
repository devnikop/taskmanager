import { taskList } from "./data";
import { getNode } from "./util";
import { boardTasksElement } from "./filter";
import { renderTaskHtml } from "./render-task";

const TASK_COUNT = 7;

const getTaskNode = task => {
  const taskHtml = renderTaskHtml(task);
  const taskNode = getNode(taskHtml);
  return taskNode;
};

const getTaskNodeList = () => {
  const fragment = document.createDocumentFragment();
  [...taskList]
    .slice(0, TASK_COUNT)
    .forEach(task => fragment.appendChild(getTaskNode(task)));
  return fragment;
};

const addTasks = () => {
  const taskNodes = getTaskNodeList();
  boardTasksElement.appendChild(taskNodes);
};

const initTasks = () => {
  addTasks();
};

export { addTasks, initTasks };
