const getRandomNumber = max => Math.ceil(Math.random() * max);

const getNode = htmlString => {
  const element = document.createElement(`div`);
  element.insertAdjacentHTML(`beforeend`, htmlString);
  const fragment = document.createDocumentFragment();
  fragment.appendChild(element);
  return fragment;
};

const removeChildren = parentNode => {
  while (parentNode.firstChild) {
    parentNode.lastChild.remove();
  }
};

export { getRandomNumber, getNode, removeChildren };
