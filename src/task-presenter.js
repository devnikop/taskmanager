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
import API from "./api";
import Stats from "./stats";
import Provider from "./provider";
import Store from "./store";

let taskListCopy = [];

const TASK_COUNT_MAX = 8;

const getTaskElement = (taskData) => {
  const taskComponent = new Task(taskData);
  const taskEditComponent = new TaskEdit(taskData);

  const updateInitialData = (newData) => {
    if (Object.is(newData.id, null)) {
      newData.id = taskListCopy.length;
      return provider.createTask({ task: newData }).then((newTask) => {
        taskListCopy.push(newTask);
        return newTask;
      });
    } else {
      taskData = { ...taskData, ...newData };
      return provider.updateTask({ id: taskData.id, data: taskData });
    }
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

  taskEditComponent.onDeleteClickCb = (id) => {
    taskListCopy.splice(taskData.id, 1);
    provider.deleteTask({ id }).then(() => {
      taskEditComponent.element.remove();
      taskEditComponent.unrender();
    });
  };

  taskEditComponent.onFavoriteClickCb = (newData) => {
    refreshComponent(taskEditComponent, newData);
  };

  taskEditComponent.onFormSubmitCb = (newData, button) => {
    const blockButton = () => {
      button.textContent = `Saving`;
      button.disabled = true;
    };

    const unblockButton = () => {
      button.textContent = `Save`;
      button.disabled = false;
    };

    blockButton();
    updateInitialData(newData)
      .then((data) => {
        unblockButton();
        updateDataInComponents(data, taskComponent, taskEditComponent);
        taskComponent.render();
        taskEditComponent.element.parentElement.replaceChild(
          taskComponent.element,
          taskEditComponent.element
        );
        taskEditComponent.unrender();
      })
      .catch(() => {
        taskEditComponent.shake();
        unblockButton();
      });
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

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=3234`;
const END_POINT = `https://es8-demo-srv.appspot.com/task-manager`;
const TASKS_STORE_KEY = `tasks-store-key`;

const api = new API({ endPoint: END_POINT, authorization: AUTHORIZATION });
const store = new Store({ key: TASKS_STORE_KEY, storage: localStorage });
const provider = new Provider({
  api,
  store,
  generateId: () => String(Date.now()),
});

window.addEventListener(
  `offline`,
  () => (document.title = `${document.title}[OFFLINE]`)
);
window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncTasks();
});

const initTasks = () => {
  provider
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
      return taskListCopy;
    })
    .then((taskListCopy) => {
      new Stats({ data: taskListCopy });
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
