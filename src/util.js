export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const removeAll = (elements) => {
  for (const value of elements) {
    value.remove();
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.insertAdjacentHTML(`beforeend`, template);
  return newElement.firstChild;
};

export const generateId = () => Math.random().toString(36).substr(2, 5);

export const objectToArray = (object) => {
  return Object.keys(object).map((id) => object[id]);
};
