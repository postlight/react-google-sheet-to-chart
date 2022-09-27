import { randomColor } from 'randomcolor';
import options from '../utils/pieOptions';

/**
 * Returns chart data specific for Pie chart type
 *
 * @param {object} data chart data
 * @param {boolean} semi true or false
 * @param {array} colors array of colors used to present data
 */
const getPieChartData = (data, semi, colors) => {
  const chartData = {
    data: {
      datasets: [],
      labels: [],
    },
    options,
    colors: [],
  };

  if (semi) {
    chartData.options.circumference = Math.PI;
    chartData.options.rotation = -Math.PI;
  } else {
    chartData.options.circumference = 2 * Math.PI;
    chartData.options.rotation = 0;
  }

  let colorIndex = 0;
  data.forEach((element, rowindex) => {
    element.forEach((value, colindex) => {
      const numericalValue = value.replace(/[^\d.-]/g, '');
      if (rowindex === 0) {
        if (value && value.length > 0) {
          const object = { data: [], backgroundColor: [], label: '' };
          object.label = value;
          chartData.data.datasets.push(object);
        }
      } else if (colindex === 0) {
        chartData.data.labels.push(value);
      } else {
        let color = colors[colorIndex];
        if (!colors || colorIndex >= colors.length) {
          color = randomColor();
        }
        colorIndex += 1;
        if (chartData.data.datasets[colindex - 1]) {
          chartData.data.datasets[colindex - 1].backgroundColor.push(color);
          chartData.data.datasets[colindex - 1].data.push(numericalValue);
        }
        chartData.colors.push(color);
      }
    });
  });

  const finalDatasets = [];
  chartData.data.datasets.forEach(dataset => {
    if (dataset.data.length > 0) {
      finalDatasets.push(dataset);
    }
  });

  chartData.data.datasets = finalDatasets;

  return chartData;
};

export default getPieChartData;
