const Time = new Map([
  [`HOURS`, 24],
  [`MINUTES`, 60],
  [`SECONDS`, 60],
  [`MILLISECONDS`, 1000],
]);

export const task = {
  title: [
    `Learn theory`,
    `Just do homework`,
    `Finish intensive on a hundred points`
  ][Math.floor(Math.random() * 3)],
  dueDate: +Date.now() + 1 + Math.floor(Math.random() * 7)
    * Time.get(`HOURS`) * Time.get(`MINUTES`) * Time.get(`SECONDS`) * Time.get(`MILLISECONDS`),
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
  color: `green`,
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
