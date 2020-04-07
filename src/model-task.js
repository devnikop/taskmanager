import moment from "moment";

const _repeatingDays = (data) => {
  let key;
  const keys = Object.keys(data);
  let n = keys.length;
  const newObj = {};

  while (n--) {
    key = keys[n];
    newObj[key.toLowerCase()] = data[key];
  }
  return newObj;
};

export class ModelTask {
  constructor(data) {
    this.color = data[`color`];
    this.dueDate = data[`due_date`];
    this.id = data[`id`];
    this.isDone = Boolean(data[`is_done`]);
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.picture = data[`picture`] || ``;
    this.repeatingDays = data[`repeating_days`];
    this.tags = new Set(data[`tags`] || []);
    this.title = data[`title`] || ``;
  }

  static toRaw(data) {
    return {
      color: data.color,
      due_date: moment(data.dueDate).valueOf(),
      id: data.id,
      is_done: data.isDone,
      is_favorite: data.isFavorite,
      picture: data.picture,
      repeating_days: _repeatingDays(data.repeatingDays),
      tags: Array(...data.tags),
      title: data.title || `empty`,
    };
  }

  static parseTask(data) {
    return new ModelTask(data);
  }

  static parseTasks(data) {
    return data.map(ModelTask.parseTask);
  }
}
