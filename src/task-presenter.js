import {
  boardTasksElement,
  addFilters,
  updateFilters,
} from "./filter-presenter";
import { LoadMore } from "./load-more";
import { Task } from "./components/task";
import { TaskEdit } from "./components/task-edit";
import { defaultData } from "./data";
import cloneDeep from "lodash.clonedeep";
import { API } from "./api";

let taskListCopy = [];

const TASK_COUNT_MAX = 8;

const getTaskElement = (taskData) => {
  const taskComponent = new Task(taskData);
  const taskEditComponent = new TaskEdit(taskData);

  const updateInitialData = (newData) => {
    if (Object.is(newData.id, null)) {
      newData.id = taskListCopy.length;
      api.createTask({ task: newData }).then((newTask) => {
        taskListCopy.push(newTask);
        return newTask;
      });
    }
    taskData = { ...taskData, ...newData };
    return taskData;
  };

  const updateDataInComponents = (data, ...components) => {
    components.forEach((component) => {
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
  taskComponent.onArchiveClickCb = (newData) =>
    refreshComponent(taskComponent, newData);

  taskComponent.onEditClickCb = () => {
    taskEditComponent.render();
    taskComponent.element.parentElement.replaceChild(
      taskEditComponent.element,
      taskComponent.element
    );
    taskComponent.unrender();
  };

  taskComponent.onFavoriteClickCb = (newData) => {
    refreshComponent(taskComponent, newData);
    updateFilters(taskListCopy);
  };

  // taskEditComponent callbacks
  taskEditComponent.onArchiveClickCb = (newData) => {
    refreshComponent(taskEditComponent, newData);
  };

  taskEditComponent.onDeleteClickCb = () => {
    taskListCopy.splice(taskData.id, 1);
    taskEditComponent.element.remove();
    taskEditComponent.unrender();
  };

  taskEditComponent.onFavoriteClickCb = (newData) => {
    refreshComponent(taskEditComponent, newData);
  };

  taskEditComponent.onFormSubmitCb = (newData) => {
    const data = updateInitialData(newData);

    taskComponent.update(data);
    taskComponent.render();
    taskEditComponent.element.parentElement.replaceChild(
      taskComponent.element,
      taskEditComponent.element
    );
    taskEditComponent.unrender();
  };

  taskComponent.render();
  return {
    task: taskComponent.element,
    taskEdit: taskEditComponent,
  };
};

const getTaskNodeList = (taskList) => {
  const fragment = document.createDocumentFragment();
  taskList.forEach((task) => fragment.appendChild(getTaskElement(task).task));
  return fragment;
};

const addTasks = (taskList) => {
  const taskNodes = getTaskNodeList(taskList);
  boardTasksElement.appendChild(taskNodes);
};

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=3234}`;
const END_POINT = `https://es8-demo-srv.appspot.com/task-manager`;

const api = new API({ endPoint: END_POINT, authorization: AUTHORIZATION });

const initTasks = () => {
  api
    .getTasks()
    .then((taskList) => {
      taskListCopy = cloneDeep(taskList);
      addTasks(taskListCopy);
      addFilters(taskListCopy);
      return taskListCopy;
    })
    .then((taskListCopy) => {
      const loadMoreComponent = new LoadMore({
        taskCountMax: TASK_COUNT_MAX,
        taskList: taskListCopy,
      });
      loadMoreComponent.init();
    });
};

const $newTask = document.querySelector(`#control__new-task`);
$newTask.addEventListener(`click`, () => {
  boardTasksElement.insertAdjacentElement(
    `afterbegin`,
    getTaskElement(defaultData).taskEdit.render()
  );
});

export { addTasks, initTasks };
