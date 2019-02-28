import {createTask} from './make-task.js';
import {createFilter} from './make-filter.js';

const TASK_COUNT_BEGIN = 7;

const FilterName = {
  ALL: `All`,
  OVERDUE: `Overdue`,
  TODAY: `Today`,
  FAVORITES: `Favorites`,
  REPEATING: `Repeating`,
  TAGS: `Tags`,
  ARCHIVE: `Archive`,
};

for (let i = 0; i < TASK_COUNT_BEGIN; i++) {
  createTask();
}

for (const key in FilterName) {
  if (FilterName.hasOwnProperty(key)) {
    createFilter(FilterName[key]);
  }
}
