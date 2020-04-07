import { addTasks } from "./task-presenter";

export class LoadMore {
  constructor(props) {
    this._taskCountMax = props.taskCountMax;
    this._taskList = props.taskList;
    this._taskShownCount = props.taskList.length;

    this._$loadMore = document.querySelector(`.load-more`);
  }

  set taskShownCount(taskCount) {
    this._taskShownCount += taskCount;
  }

  _bind() {
    this._$loadMore.addEventListener(`click`, (evt) => {
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
    this._taskList.length - this._taskShownCount <= 0 && this._hide();
  }

  _hide() {
    this._$loadMore.remove();
  }

  init() {
    this._checkFirstLoad();
    this._bind();
  }
}
