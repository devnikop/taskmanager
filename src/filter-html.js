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

export { getFilterHtml };
