import moment from '../node_modules/moment';

export const task = {
  title: [
    `Learn theory`,
    `Just do homework`,
    `Finish intensive on a hundred points`
  ][Math.floor(Math.random() * 3)],
  dueDate: moment().add(Math.floor(Math.random() * 7), `days`),
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
  ][Math.floor(Math.random() * 3)],
  repeatingDays: {
    'mo': true,
    'tu': false,
    'we': true,
    'th': false,
    'fr': true,
    'sa': false,
    'su': true
  },
  isFavorite: false,
  isDone: false
};
