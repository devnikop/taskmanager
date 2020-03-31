import { boardTasksElement } from "./filter";
import { LoadMore } from "./load-more";
import { Task } from "./components/task";
import { TaskEdit } from "./components/task-edit";
import { taskList } from "./data";

const TASK_COUNT_MAX = 8;

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

const getTaskNodeList = taskList => {
  const fragment = document.createDocumentFragment();
  taskList.forEach(task => fragment.appendChild(getTaskElement(task)));
  return fragment;
};

const addTasks = taskList => {
  const taskNodes = getTaskNodeList(taskList);
  boardTasksElement.appendChild(taskNodes);
};

const initTasks = () => {
  const tasksToShow = [...taskList].slice(0, TASK_COUNT_MAX);
  addTasks(tasksToShow);

  const loadMoreComponent = new LoadMore({
    taskCountMax: TASK_COUNT_MAX,
    taskShownCount: tasksToShow.length
  });
  loadMoreComponent.init();
};

export { addTasks, initTasks };
