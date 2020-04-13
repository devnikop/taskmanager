import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { boardTasksElement } from "./filter-presenter";
import flatpickr from "flatpickr";
import moment from "moment";

const Selector = {
  CONTROL_STATISTIC: `#control__statistic`,
  STATISTIC_PERIOD_INPUT: `.statistic__period-input`,
  STATISTIC_TAGS: `.statistic__tags`,
  STATISTIC: `.statistic`,
  STATISTIC_COLORS: `.statistic__colors`,
};

const Classname = {
  VISUALLY_HIDDEN: `visually-hidden`,
};

const COLOR_LIST = [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`];

export default class Stats {
  constructor(props) {
    this._data = props.data;

    // ctx's
    this._tagsChart = null;
    this._colorsChart = null;

    this._$controlStatistic = document.querySelector(
      Selector.CONTROL_STATISTIC
    );
    this._$statistic = document.querySelector(Selector.STATISTIC);
    this._$statisticPeriodInput = this._$statistic.querySelector(
      Selector.STATISTIC_PERIOD_INPUT
    );

    this._colorsCtx = this._$statistic.querySelector(Selector.STATISTIC_COLORS);
    this._tagsCtx = this._$statistic.querySelector(Selector.STATISTIC_TAGS);

    this._attachListeners();
    this._createCharts();
  }

  _attachListeners() {
    this._$controlStatistic.addEventListener(`click`, () => {
      boardTasksElement.classList.add(Classname.VISUALLY_HIDDEN);
      this._$statistic.classList.remove(Classname.VISUALLY_HIDDEN);
    });

    const self = this;

    flatpickr(this._$statisticPeriodInput, {
      mode: "range",
      defaultDate: [
        moment().startOf("week").format(),
        moment().endOf("week").format(),
      ],
      onClose(selectedDates) {
        const filteredData = self._data.filter((task) => {
          if (
            moment(task.dueDate).isBetween(selectedDates[0], selectedDates[1])
          ) {
            return true;
          }
        });
        self._tagsChart.data = self._getTagsData(filteredData);
        self._tagsChart.update();

        self._colorsChart.data = self._getColorsData(filteredData);
        self._colorsChart.update();
      },
    });
  }

  _getUniqueColors() {
    const colorSet = new Set();
    this._data.map((task) => {
      colorSet.add(task.color);
    });
    return [...colorSet];
  }

  _getUniqueTags(data) {
    const tagSet = new Set();
    data.map((task) => {
      [...task.tags].map((tag) => tagSet.add(tag));
    });
    return [...tagSet];
  }

  _getTagsData(data) {
    const uniqueTags = this._getUniqueTags(data);

    return {
      labels: uniqueTags.map((tag) => `#${tag}`),
      datasets: [
        {
          data: uniqueTags.map((tag) =>
            data.reduce(
              (acc, task) => ([...task.tags].includes(tag) ? ++acc : acc),
              0
            )
          ),
          backgroundColor: COLOR_LIST.slice(0, uniqueTags.length),
        },
      ],
    };
  }

  _getColorsData() {
    const uniqueColors = this._getUniqueColors();

    return {
      labels: uniqueColors.map((color) => `#${color}`),
      datasets: [
        {
          data: uniqueColors.map((color) =>
            this._data.reduce(
              (acc, task) => (task.color === color ? ++acc : acc),
              0
            )
          ),
          backgroundColor: uniqueColors,
        },
      ],
    };
  }

  _createCharts() {
    this._tagsChart = new Chart(this._tagsCtx, {
      plugins: [ChartDataLabels],
      type: `pie`,
      data: this._getTagsData(this._data),
      options: {
        plugins: {
          datalabels: {
            display: false,
          },
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const allData = data.datasets[tooltipItem.datasetIndex].data;
              const tooltipData = allData[tooltipItem.index];
              const total = allData.reduce((acc, it) => acc + parseFloat(it));
              const tooltipPercentage = Math.round((tooltipData / total) * 100);
              return `${tooltipData} TASKS — ${tooltipPercentage}%`;
            },
          },
          displayColors: false,
          backgroundColor: `#ffffff`,
          bodyFontColor: `#000000`,
          borderColor: `#000000`,
          borderWidth: 1,
          cornerRadius: 0,
          xPadding: 15,
          yPadding: 15,
        },
        title: {
          display: true,
          text: `DONE BY: TAGS`,
          fontSize: 16,
          fontColor: `#000000`,
        },
        legend: {
          position: `left`,
          labels: {
            boxWidth: 15,
            padding: 25,
            fontStyle: 500,
            fontColor: `#000000`,
            fontSize: 13,
          },
        },
      },
    });

    this._colorsChart = new Chart(this._colorsCtx, {
      plugins: [ChartDataLabels],
      type: `pie`,
      data: this._getColorsData(this._data),
      options: {
        plugins: {
          datalabels: {
            display: false,
          },
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const allData = data.datasets[tooltipItem.datasetIndex].data;
              const tooltipData = allData[tooltipItem.index];
              const total = allData.reduce((acc, it) => acc + parseFloat(it));
              const tooltipPercentage = Math.round((tooltipData / total) * 100);
              return `${tooltipData} TASKS — ${tooltipPercentage}%`;
            },
          },
          displayColors: false,
          backgroundColor: `#ffffff`,
          bodyFontColor: `#000000`,
          borderColor: `#000000`,
          borderWidth: 1,
          cornerRadius: 0,
          xPadding: 15,
          yPadding: 15,
        },
        title: {
          display: true,
          text: `DONE BY: COLORS`,
          fontSize: 16,
          fontColor: `#000000`,
        },
        legend: {
          position: `left`,
          labels: {
            boxWidth: 15,
            padding: 25,
            fontStyle: 500,
            fontColor: `#000000`,
            fontSize: 13,
          },
        },
      },
    });
  }
}
