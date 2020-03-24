const getRandomNumber = max => Math.ceil(Math.random() * max);

const getRandomArrayItem = array =>
  array[Math.floor(Math.random() * array.length)];

const getNode = htmlString => {
  const element = document.createElement(`div`);
  element.insertAdjacentHTML(`beforeend`, htmlString);
  const fragment = document.createDocumentFragment();
  fragment.appendChild(element);
  return fragment;
};

const createElement = template => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

const removeChildren = parentNode => {
  while (parentNode.firstChild) {
    parentNode.lastChild.remove();
  }
};

export {
  createElement,
  getNode,
  getRandomArrayItem,
  getRandomNumber,
  removeChildren
};
