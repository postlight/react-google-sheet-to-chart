import { randomColor } from 'randomcolor';
import options from '../utils/lineOptions';

/**
 * Returns chart data specific for Bar chart type
 *
 * @param {object} data chart data
 * @param {boolean} stacked true or false
 * @param {array} colors array of colors used to present data
 */
const getBarChartData = (data, stacked, colors) => {
  const chartData = {
    labels: [],
    datasets: [],
    info: [],
    annotations: [],
    options,
    colors: [],
  };

  let columnCount = 0;
  let colorIndex = 0;
  data.forEach((element, rowindex) => {
    if (columnCount === 0) {
      columnCount = element.length;
    }
    element.forEach((value, colindex) => {
      const numericalValue = value.replace(/[^\d.-]/g, '');

      if (rowindex === 0) {
        if (value && value.length > 0) {
          const object = { data: [] };
          let color = colors[colorIndex];
          if (!colors || colorIndex >= colors.length) {
            color = randomColor();
          }
          colorIndex += 1;
          object.borderColor = color;
          object.backgroundColor = color;
          object.pointBorderColor = color;
          object.pointBackgroundColor = color;
          object.pointHoverBackgroundColor = color;
          object.pointHoverBorderColor = color;
          object.label = value;
          chartData.datasets.push(object);

          chartData.colors.push(color);
        }
      } else if (colindex === 0) {
        chartData.labels.push(value);
      } else if (chartData.datasets[colindex - 1]) {
        chartData.datasets[colindex - 1].data.push(numericalValue);
      }
    });
    let i = element.length;
    for (; i < columnCount; ) {
      if (chartData.datasets[i - 1]) {
        chartData.datasets[i - 1].data.push(0);
      }
      i += 1;
    }
  });

  chartData.options.scales.xAxes[0].labels = chartData.labels;
  chartData.options.scales.xAxes[0].stacked = stacked;
  chartData.options.scales.yAxes[0].ticks = {
    beginAtZero: true,
  };
  chartData.options.scales.xAxes[0].ticks = {
    beginAtZero: true,
  };

  return chartData;
};

export default getBarChartData;
