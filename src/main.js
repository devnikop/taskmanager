'use strict';

const FILTER_COUNT_MIN = 0;
const FILTER_COUNT_MAX = 200;
const TASK_COUNT_BEGIN = 7;
const TASK_COUNT_MIN = 1;
const TASK_COUNT_MAX = 7;

const FilterName = {
  ALL: `All`,
  OVERDUE: `Overdue`,
  TODAY: `Today`,
  FAVORITES: `Favorites`,
  REPEATING: `Repeating`,
  TAGS: `Tags`,
  ARCHIVE: `Archive`,
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createTask = () => {
  const taskFragment = document.createDocumentFragment();

  const cardElement = document.createElement(`article`);
  cardElement.classList.add(`card`, `card--repeat`, `card--black`);

  const cardFormElement = document.createElement(`form`);
  cardFormElement.classList.add(`card__form`);
  cardFormElement.method = `get`;

  const cardInnerElement = document.createElement(`div`);
  cardInnerElement.classList.add(`card__inner`);

  const cardControlGenerate = () => {
    const cardControlButtonsGenerate = () => {
      const createControlButton = (buttonType, disable = false) => {
        const controlButton = document.createElement(`button`);
        controlButton.classList.add(`card__btn`, `card__btn--${buttonType}`);
        if (disable) {
          controlButton.classList.add(`card__btn--disabled`);
        }
        controlButton.textContent = buttonType;
        return controlButton;
      };

      const controlButtonsFragment = document.createDocumentFragment();

      controlButtonsFragment.appendChild(createControlButton(`edit`));
      controlButtonsFragment.appendChild(createControlButton(`archive`));
      controlButtonsFragment.appendChild(createControlButton(`favorites`, true));

      return controlButtonsFragment;
    };

    const cardControlElement = document.createElement(`div`);
    cardControlElement.classList.add(`card__control`);
    cardControlElement.appendChild(cardControlButtonsGenerate());
    return cardControlElement;
  };

  const cardColorBarGenerate = () => {
    const cardColorBarElement = document.createElement(`div`);
    cardColorBarElement.classList.add(`card__color-bar`);

    cardColorBarElement.insertAdjacentHTML(`afterbegin`, `<svg width="100%" height="10">
      <use xlink:href="#wave"></use></svg>`);
    return cardColorBarElement;
  };

  const cardTextareaGenerate = () => {
    const cardTextElement = document.createElement(`div`);
    cardTextElement.classList.add(`card__textarea-wrap`);
    cardTextElement.insertAdjacentHTML(`afterbegin`, `<label><textarea class="card__text"
      placeholder="Start typing your text here..." name="text">This is example of new task, you can add picture, set date and time, add tags.</textarea></label>`);
    return cardTextElement;
  };

  const cardSettingsGenerate = () => {
    const cardDatesGenerate = () => {
      const deadlineToggleGenerate = () => {
        const deadlineToggleElement = document.createElement(`button`);
        deadlineToggleElement.classList.add(`card__date-deadline-toggle`);
        deadlineToggleElement.type = `button`;
        deadlineToggleElement.insertAdjacentHTML(`beforeend`, `date: <span
          class="card__date-status">no</span>`);
        return deadlineToggleElement;
      };

      const dateDeadlineGenerate = () => {
        const dateDeadlineElement = document.createElement(`fieldset`);
        dateDeadlineElement.classList.add(`card__date-deadline`);
        dateDeadlineElement.disabled = true;

        dateDeadlineElement.insertAdjacentHTML(`beforeend`, `<label class="card__input-deadline-wrap">
          <input class="card__date" type="text" placeholder="23 September" name="date"></label>`);
        dateDeadlineElement.insertAdjacentHTML(`beforeend`, `<label class="card__input-deadline-wrap">
          <input class="card__time" type="text" placeholder="11:15 PM" name="time"></label>`);
        return dateDeadlineElement;
      };

      const repeatToggleGenerate = () => {
        const repeatToggleElement = document.createElement(`button`);
        repeatToggleElement.classList.add(`card__repeat-toggle`);
        repeatToggleElement.type = `button`;
        repeatToggleElement.insertAdjacentHTML(`beforeend`, `repeat: <span
          class="card__repeat-status">no</span>`);
        return repeatToggleElement;
      };

      const repeatDaysWrapperGenerate = () => {
        const Day = {
          MONDAY: `mo`,
          TUESDAY: `tu`,
          WEDNESDAY: `we`,
          THURSDAY: `th`,
          FRIDAY: `fr`,
          SATURDAY: `sa`,
          SUNDAY: `su`
        };

        const repeatDayGenerate = (day) => {
          const fragment = document.createDocumentFragment();

          const repeatDayInputElement = document.createElement(`input`);
          repeatDayInputElement.classList.add(`visually-hidden`, `card__repeat-day-input`);
          repeatDayInputElement.type = `checkbox`;
          repeatDayInputElement.id = `repeat-${day}-1`;
          repeatDayInputElement.name = `repeat`;
          repeatDayInputElement.value = day;

          const repeatDayLabelElement = document.createElement(`label`);
          repeatDayLabelElement.classList.add(`card__repeat-day`);
          repeatDayLabelElement.htmlFor = `repeat-${day}-1`;
          repeatDayLabelElement.textContent = day;

          fragment.appendChild(repeatDayInputElement);
          fragment.appendChild(repeatDayLabelElement);
          return fragment;
        };

        const repeatDaysElement = document.createElement(`fieldset`);
        repeatDaysElement.classList.add(`card__repeat-days`);
        repeatDaysElement.disabled = true;

        const repeatDaysInnerElement = document.createElement(`div`);
        repeatDaysInnerElement.classList.add(`card__repeat-days-inner`);

        for (const key in Day) {
          if (Day.hasOwnProperty(key)) {
            repeatDaysInnerElement.appendChild(repeatDayGenerate(Day[key]));
          }
        }
        repeatDaysElement.appendChild(repeatDaysInnerElement);

        return repeatDaysElement;
      };

      const cardDatesElement = document.createElement(`div`);
      cardDatesElement.classList.add(`card__dates`);

      cardDatesElement.appendChild(deadlineToggleGenerate());
      cardDatesElement.appendChild(dateDeadlineGenerate());
      cardDatesElement.appendChild(repeatToggleGenerate());
      cardDatesElement.appendChild(repeatDaysWrapperGenerate());

      return cardDatesElement;
    };

    const cardHashtagGenerate = () => {
      const hashtagElement = document.createElement(`div`);
      hashtagElement.classList.add(`card__hashtag`);

      const hashtagListElement = document.createElement(`div`);
      hashtagListElement.classList.add(`card__hashtag-list`);

      hashtagElement.appendChild(hashtagListElement);
      hashtagElement.insertAdjacentHTML(`beforeend`, `<label><input class="card__hashtag-input"
        type="text" name="hashtag-input" placeholder="Type new hashtag here"></label>`);
      return hashtagElement;
    };

    const cardSettingsElement = document.createElement(`div`);
    cardSettingsElement.classList.add(`card__settings`);

    const cardDetailsGenerate = () => {
      const cardDetailsElement = document.createElement(`div`);
      cardDetailsElement.classList.add(`card__details`);

      cardDetailsElement.appendChild(cardDatesGenerate());
      cardDetailsElement.appendChild(cardHashtagGenerate());
      return cardDetailsElement;
    };

    const cardImgWrapGenerate = () => {
      const imgInputGenerate = () => {
        const imgInputElement = document.createElement(`input`);
        imgInputElement.classList.add(`card__img-input`, `visually-hidden`);
        imgInputElement.type = `file`;
        imgInputElement.name = `img`;
        return imgInputElement;
      };

      const cardImgGenerate = () => {
        const cardImgElement = document.createElement(`img`);
        cardImgElement.classList.add(`card__img`);
        cardImgElement.src = `img/add-photo.svg`;
        cardImgElement.alt = `task picture`;
        return cardImgElement;
      };

      const cardImgWrapElement = document.createElement(`label`);
      cardImgWrapElement.classList.add(`card__img-wrap`, `card__img-wrap--empty`);
      cardImgWrapElement.appendChild(imgInputGenerate());
      cardImgWrapElement.appendChild(cardImgGenerate());
      return cardImgWrapElement;
    };

    const cardColorsInnerGenerate = () => {
      const Color = {
        BLACK: `black`,
        YELLOW: `yellow`,
        BLUE: `blue`,
        GREEN: `green`,
        PINK: `pink`
      };

      const cardColorsTitleGenerate = () => {
        const cardColorsTitleElement = document.createElement(`h3`);
        cardColorsTitleElement.classList.add(`card__colors-title`);
        cardColorsTitleElement.textContent = `Color`;
        return cardColorsTitleElement;
      };

      const cardColorsWrapGenerate = (color) => {
        const cardColorGenerate = () => {
          const colorInputGenerate = () => {
            const colorInputElement = document.createElement(`input`);
            colorInputElement.classList.add(`card__color-input`, `card__color-input--${color}`, `visually-hidden`);
            colorInputElement.type = `radio`;
            colorInputElement.id = `color-${color}-1`;
            colorInputElement.name = `color`;
            colorInputElement.value = color;
            colorInputElement.checked = true;
            return colorInputElement;
          };

          const colorLabelGenerate = () => {
            const colorLabelElement = document.createElement(`label`);
            colorLabelElement.classList.add(`card__color`, `card__color--${color}`);
            colorLabelElement.htmlFor = `color-${color}-1`;
            colorLabelElement.textContent = color;
            return colorLabelElement;
          };

          const colorFragment = document.createDocumentFragment();
          colorFragment.appendChild(colorInputGenerate());
          colorFragment.appendChild(colorLabelGenerate());

          return colorFragment;
        };

        const cardColorsWrap = document.createElement(`div`);
        cardColorsWrap.classList.add(`card__colors-wrap`);
        cardColorsWrap.appendChild(cardColorGenerate());
        return cardColorsWrap;
      };

      const colorsInner = document.createElement(`div`);
      colorsInner.classList.add(`card__colors-inner`);

      colorsInner.appendChild(cardColorsTitleGenerate());
      for (const key in Color) {
        if (Color.hasOwnProperty(key)) {
          colorsInner.appendChild(cardColorsWrapGenerate(Color[key]));
        }
      }
      return colorsInner;
    };

    cardSettingsElement.appendChild(cardDetailsGenerate());
    cardSettingsElement.appendChild(cardImgWrapGenerate());
    cardSettingsElement.appendChild(cardColorsInnerGenerate());

    return cardSettingsElement;
  };

  const cardStatusButtonsGenerate = () => {
    const saveButtonGenerate = () => {
      const saveButtonElement = document.createElement(`button`);
      saveButtonElement.classList.add(`card__save`);
      saveButtonElement.type = `button`;
      saveButtonElement.textContent = `save`;
      return saveButtonElement;
    };

    const deleteButtonGenerate = () => {
      const deleteButtonElement = document.createElement(`button`);
      deleteButtonElement.classList.add(`card__delete`);
      deleteButtonElement.type = `button`;
      deleteButtonElement.textContent = `delete`;
      return deleteButtonElement;
    };

    const statusButtonElement = document.createElement(`div`);
    statusButtonElement.classList.add(`card__status-btns`);
    statusButtonElement.appendChild(saveButtonGenerate());
    statusButtonElement.appendChild(deleteButtonGenerate());
    return statusButtonElement;
  };

  cardInnerElement.appendChild(cardControlGenerate());
  cardInnerElement.appendChild(cardColorBarGenerate());
  cardInnerElement.appendChild(cardTextareaGenerate());
  cardInnerElement.appendChild(cardSettingsGenerate());
  cardInnerElement.appendChild(cardStatusButtonsGenerate());

  cardFormElement.appendChild(cardInnerElement);
  cardElement.appendChild(cardFormElement);
  taskFragment.appendChild(cardElement);
  boardTasksContainerElement.appendChild(taskFragment);
};

const createFilter = (filterId) => {
  const filterInputGenerate = () => {
    const filterInputElement = document.createElement(`input`);
    filterInputElement.classList.add(`filter__input`, `visually-hidden`);
    filterInputElement.type = `radio`;
    filterInputElement.id = `filter__${filterIdLowerCase}`;
    filterInputElement.name = `filter`;
    filterInputElement.checked = true;
    return filterInputElement;
  };

  const filterLabelGenerate = () => {
    const filterLabelElementClickHandler = () => {
      const cardElements = boardTasksContainerElement.querySelectorAll(`.card`);
      cardElements.forEach((cardElement) => {
        cardElement.remove();
      });

      for (let i = 0; i < getRandomInt(TASK_COUNT_MIN, TASK_COUNT_MAX); i++) {
        createTask();
      }
    };

    const filterLabelElement = document.createElement(`label`);
    filterLabelElement.addEventListener(`click`, filterLabelElementClickHandler);
    filterLabelElement.classList.add(`filter__label`);
    filterLabelElement.htmlFor = `filter__${filterIdLowerCase}`;
    filterLabelElement.insertAdjacentHTML(`afterbegin`, `${filterId} <span
      class="filter__${filterIdLowerCase}-count">${getRandomInt(FILTER_COUNT_MIN, FILTER_COUNT_MAX)}</span>`);
    return filterLabelElement;
  };

  const filterIdLowerCase = filterId.toLowerCase();
  const filterFragment = document.createDocumentFragment();
  filterFragment.appendChild(filterInputGenerate());
  filterFragment.appendChild(filterLabelGenerate());
  filterContainerElement.appendChild(filterFragment);
};


const boardTasksContainerElement = document.querySelector(`.board__tasks`);

for (let i = 0; i < TASK_COUNT_BEGIN; i++) {
  createTask();
}

const filterContainerElement = document.querySelector(`.main__filter`);

for (const key in FilterName) {
  if (FilterName.hasOwnProperty(key)) {
    createFilter(FilterName[key]);
  }
}
