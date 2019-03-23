import moment from '../node_modules/moment';

const TASK_COUNT = 7;

const createTaskData = () => {
  return {
    title: [
      `Learn theory`,
      `Just do homework`,
      `Finish intensive on a hundred points`
    ][Math.floor(Math.random() * 3)],
    dueDate: moment().add(Math.floor(Math.random() * 7), `days`).add(Math.floor(Math.random() * 150), `minutes`),
    tags: new Set([
      `cinema`,
      `myself`,
      `homework`,
      `theory`,
      `practice`,
      `intensive`,
      `keks`
    ]),
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    color: [
      `black`,
      `yellow`,
      `blue`,
      `pink`,
      `green`
    ][Math.floor(Math.random() * 5)],
    repeatingDays: {
      'mo': false,
      'tu': false,
      'we': false,
      'th': true,
      'fr': false,
      'sa': false,
      'su': false
    },
    isFavorite: false,
    isDone: false
  };
};

let tasks = [];

for (let i = 0; i < TASK_COUNT; i++) {
  tasks[i] = createTaskData();
}

export const taskList = tasks;
