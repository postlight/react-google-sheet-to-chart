import { randomColor } from 'randomcolor';
import options from '../utils/horizontalBarOptions';

/**
 * Returns chart data specific for Horizontal Bar chart type with reversed axis processing
 *
 * @param {object} data chart data
 * @param {array} colors array of colors used to present data
 */
const getHorizontalBarReverseChartData = (data, colors) => {
  const chartData = {
    labels: [],
    datasets: [],
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
          object.borderWidth = 1;
          object.label = value;
          object.hoverBackgroundColor = color;
          object.hoverBorderColor = color;
          chartData.datasets.push(object);

          chartData.colors.push(color);
        }
      } else if (colindex === 0) {
        if (value && value.length > 0) {
          chartData.labels.push(value);
        }
      } else if (chartData.datasets[colindex - 1]) {
        chartData.datasets[colindex - 1].data.push(numericalValue);
      }
    });
  });
  return chartData;
};

export default getHorizontalBarReverseChartData;
