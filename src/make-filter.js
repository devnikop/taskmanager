import {getRandomInt} from './util.js';

const FILTER_COUNT_MIN = 0;
const FILTER_COUNT_MAX = 200;

export const createFilter = (filter) =>
  `<input
    class='filter__input visually-hidden'
    type='radio'
    id='filter__${filter.toLowerCase()}'
    name='filter'
    checked>
    <label class='filter__label' for='filter__${filter.toLowerCase()}'> ${filter}
      <span class="filter__${filter.toLowerCase()}-count">${getRandomInt(FILTER_COUNT_MIN, FILTER_COUNT_MAX)}</span>
    </label>
  `;
