import { addTasks } from "./task-presenter";
import { taskList } from "./data";

export class LoadMore {
  constructor(props) {
    this._taskCountMax = props.taskCountMax;
    this._taskShownCount = props.taskShownCount;

    this._$loadMore = document.querySelector(`.load-more`);
  }

  set taskShownCount(taskCount) {
    this._taskShownCount += taskCount;
  }

  _bind() {
    this._$loadMore.addEventListener(`click`, evt => {
      evt.preventDefault();

      const tasksToShow = [...taskList].slice(
        this._taskShownCount,
        this._taskShownCount + this._taskCountMax
      );
      this.taskShownCount = tasksToShow.length;
      this._taskShownCount === taskList.length && this._hide();

      addTasks(tasksToShow);
    });
  }

  _checkFirstLoad() {
    taskList.length - this._taskShownCount <= 0 && this._hide();
  }

  _hide() {
    this._$loadMore.remove();
  }

  init() {
    this._checkFirstLoad();
    this._bind();
  }
}
