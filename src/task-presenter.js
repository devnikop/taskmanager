import { taskList } from "./data";
import { boardTasksElement } from "./filter";
import { Task } from "./components/task";
import { TaskEdit } from "./components/task-edit";

const TASK_COUNT = 7;

const getTaskElement = taskData => {
  const taskComponent = new Task(taskData);
  const taskEditComponent = new TaskEdit(taskData);

  const updateInitialData = newData => {
    taskData = { ...taskData, ...newData };
  };

  const updateDataInComponents = (data, ...components) => {
    components.forEach(component => {
      component.update(data);
    });
  };

  const refreshComponent = (component, newData) => {
    const oldTaskElement = component.element;
    updateInitialData(newData);
    updateDataInComponents(taskData, taskComponent, taskEditComponent);
    component.render();
    oldTaskElement.parentElement.replaceChild(
      component.element,
      oldTaskElement
    );
  };

  // taskComponent callbacks
  taskComponent.onArchiveClickCb = newData =>
    refreshComponent(taskComponent, newData);

  taskComponent.onEditClickCb = () => {
    taskEditComponent.render();
    taskComponent.element.parentElement.replaceChild(
      taskEditComponent.element,
      taskComponent.element
    );
    taskComponent.unrender();
  };

  taskComponent.onFavoriteClickCb = newData =>
    refreshComponent(taskComponent, newData);

  // taskEditComponent callbacks
  taskEditComponent.onArchiveClickCb = newData =>
    refreshComponent(taskEditComponent, newData);

  taskEditComponent.onFavoriteClickCb = newData =>
    refreshComponent(taskEditComponent, newData);

  taskEditComponent.onFormSubmitCb = newData => {
    taskData = { ...taskData, ...newData };

    taskComponent.update(taskData);
    taskComponent.render();
    taskEditComponent.element.parentElement.replaceChild(
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
