import {createTask} from './make-task.js';
import {createFilter} from './make-filter.js';
import {task} from './data.js';

const TASK_COUNT_BEGIN = 7;

const FilterName = new Set([
  `All`,
  `Overdue`,
  `Today`,
  `Favorites`,
  `Repeating`,
  `Tags`,
  `Archive`,
]);


let tasks = [];
for (let i = 0; i < TASK_COUNT_BEGIN; i++) {
  tasks[i] = task;
}

tasks.forEach((currentTask) => createTask(currentTask));

FilterName.forEach((key) => {
  createFilter(key);
});
