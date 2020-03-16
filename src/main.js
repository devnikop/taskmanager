"use strict";

(function() {
  // util START

  const getRandomNumber = max => Math.ceil(Math.random() * max);

  const getNode = htmlString => {
    const element = document.createElement(`div`);
    element.insertAdjacentHTML(`beforeend`, htmlString);
    const fragment = document.createDocumentFragment();
    fragment.appendChild(element);
    return fragment;
  };

  // util END

  // filter START
  const getElement = {
    Selector: {
      MAIN_FILTER: `.main__filter`
    },

    get mainFilter() {
      return document.querySelector(this.Selector.MAIN_FILTER);
    }
  };

  const filterSet = [
    `all`,
    `overdue`,
    `today`,
    `favorites`,
    `repeating`,
    `tags`,
    `archive`
  ];

  const getFilterHtml = (text, count) => `
    <input
      type="radio"
      id="filter__${text}"
      class="filter__input visually-hidden"
      name="filter"
      checked
      />
      <label for="filter__${text}" class="filter__label">
      ${text.toUpperCase()} <span class="filter__${text}-count">${count}</span></label
    >
  `;

  const getFilterNode = (filter) => {
    const filterHmtl = getFilterHtml(filter, getRandomNumber(20));
    const filterNode = getNode(filterHmtl);
    return filterNode;
  };

  const getFilterNodeList = () => {
    const fragment = document.createDocumentFragment();
    filterSet.forEach(filter => {
      fragment.appendChild(getFilterNode(filter));
    });
    return fragment;
  };

  const addFilters = () => {
    const mainFilter = getElement.mainFilter;
    const filterNodes = getFilterNodeList();

    mainFilter.appendChild(filterNodes);
  };

  addFilters();

  // filter END

  // task START

  

  // task END
})();
