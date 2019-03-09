export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const removeAllElementsByClass = (elements) => {
  for (const value of elements) {
    value.remove();
  }
};
