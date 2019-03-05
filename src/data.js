export const task = {
  title: [
    `Learn theory`,
    `Just do homework`,
    `Finish intensive on a hundred points`
  ][Math.floor(Math.round() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  tags: new Set([
    `cinema`,
    `entartainment`,
    `myself`,
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`
  ]),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: {
    'black': false,
    'yellow': false,
    'blue': false,
    'green': true,
    'pink': false
  },
  repeatingDays: {
    'mo': true,
    'tu': false,
    'we': true,
    'th': false,
    'fr': true,
    'sa': false,
    'su': true
  },
  isFavorite: true,
  isDone: false
};
