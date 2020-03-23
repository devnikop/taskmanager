import { getRandomArrayItem, getRandomNumber } from "./util";

const mockData = {
  titleList: [
    `Learn theory`,
    `Do homework`,
    `Finish workshop for hundread score`
  ],
  tagsList: new Set([`homework`, `theory`, `practice`, `intensive`, `keks`]),
  colorList: new Set([`black`, `yellow`, `blue`, `green`, `pink`]),

  get title() {
    return getRandomArrayItem(this.titleList);
  },
  get date() {
    return Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000;
  },
  get tag() {
    const TAG_COUNT_MAX = 3;

    const randomNumber = getRandomNumber(this.tagsList.size);
    const tagsCount =
      randomNumber <= TAG_COUNT_MAX ? randomNumber : TAG_COUNT_MAX;

    const randomTags = new Set();
    for (let i = 0; i < tagsCount; i++) {
      randomTags.add(getRandomArrayItem([...this.tagsList]));
    }

    return randomTags;
  },
  get picture() {
    return `http://picsum.photos/100/100?r=${Math.random()}`;
  },
  get color() {
    return getRandomArrayItem([...this.colorList]);
  },

  get repeatingDays() {
    return {
      Mo: true,
      Tu: false,
      We: true,
      Th: true,
      Fr: false,
      Sa: false,
      Su: false
    };
  }
};

const getTaskData = index => ({
  id: index,
  title: mockData.title,
  dueDate: mockData.date,
  tags: mockData.tag,
  picture: mockData.picture,
  color: mockData.color,
  repeatingDays: mockData.repeatingDays,
  isFavorite: true,
  isDone: false
});

const taskList = Array.from({ length: 20 }, (item, index) =>
  getTaskData(index)
);

export { taskList };
