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
