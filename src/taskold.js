import { taskList } from "./data";
import { boardTasksElement } from "./filter";
import { Task } from "./task";
import { TaskEdit } from "./task-edit";

const TASK_COUNT = 7;

const getTaskNode = taskData => {
  const task = new Task(taskData);
  const taskElement = task.render();
  return taskElement;
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
