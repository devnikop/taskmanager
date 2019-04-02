import Chart from '../node_modules/chart.js';
import ChartDataLabels from '../node_modules/chartjs-plugin-datalabels';
import flatpickr from '../node_modules/flatpickr';
import moment from '../node_modules/moment';


const statisticContainerElement = document.querySelector(`.statistic`);
const statisticInputElement = statisticContainerElement.querySelector(`.statistic__period-input`);

const tagsCtx = document.querySelector(`.statistic__tags`);
const colorsCtx = document.querySelector(`.statistic__colors`);
let taskDataList = [];

export const createStatistics = (serverTasks, selectedDates) => {
  taskDataList = serverTasks;
  let dateStart = ``;
  let dateEnd = ``;
  if (typeof selectedDates === `undefined`) {
    dateStart = moment().startOf(`week`).format(`D MMMM`);
    dateEnd = moment().endOf(`week`).format(`D MMMM`);
  } else {
    dateStart = selectedDates[0];
    dateEnd = selectedDates[1];
  }

  const colors = {};
  const tags = {};
  const filteredData = taskDataList.filter((task) => moment(task.dueDate).isBetween(moment(dateStart, `D MMMM`), moment(dateEnd, `D MMMM`)));
  filteredData.forEach((task) => {
    colors[task.color] = (colors[task.color] || 0) + 1;

    [...task.tags.keys()].forEach((tag) => {
      tags[tag] = (tags[tag] || 0) + 1;
    });
  });

  // В разрезе тегов
  // eslint-disable-next-line no-unused-vars
  const tagsChart = new Chart(tagsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: [...Object.keys(tags)],
      datasets: [{
        data: [...Object.values(tags)],
        backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: TAGS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      },
    }
  });

  // В разрезе цветов
  // eslint-disable-next-line no-unused-vars
  const colorsChart = new Chart(colorsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: [...Object.keys(colors)],
      datasets: [{
        data: [...Object.values(colors)],
        backgroundColor: [...Object.keys(colors)]
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: COLORS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });
};

flatpickr(statisticInputElement, {
  onClose: (selectedDates) => createStatistics(taskDataList, selectedDates),
  mode: `range`,
  defaultDate: [moment().startOf(`week`).format(`D MMMM`), moment().endOf(`week`).format(`D MMMM`)],
  altInput: true,
  altFormat: `j F`,
  dateFormat: `j F`
});
