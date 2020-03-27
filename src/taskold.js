import { taskList } from "./data";
import { boardTasksElement } from "./filter";
import { Task } from "./components/task";
import { TaskEdit } from "./components/task-edit";

const TASK_COUNT = 7;

const getTaskElement = taskData => {
  const taskComponent = new Task(taskData);
  const taskEditComponent = new TaskEdit(taskData);

  taskComponent.onEdit = () => {
    taskEditComponent.render();
    boardTasksElement.replaceChild(
      taskEditComponent.element,
      taskComponent.element
    );
    taskComponent.unrender();
  };

  taskEditComponent.onFormSubmitCb = newData => {
    taskData = { ...taskData, ...newData };

    taskComponent.update(taskData);
    taskComponent.render();
    boardTasksElement.replaceChild(
      taskComponent.element,
      taskEditComponent.element
    );
    taskEditComponent.unrender();
  };

  taskComponent.render();
  return taskComponent.element;
};

const getTaskNodeList = () => {
  const fragment = document.createDocumentFragment();
  [...taskList]
    .slice(0, TASK_COUNT)
    .forEach(task => fragment.appendChild(getTaskElement(task)));
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
