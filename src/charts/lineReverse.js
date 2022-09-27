import randomColor from 'randomcolor';
import options from '../utils/lineOptions';

/**
 * Returns chart data specific for Line chart type with reversed axis processing
 *
 * @param {object} data chart data
 * @param {array} colors array of colors used to present data
 */
const getLineReverseChartData = (data, colors) => {
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
          chartData.labels.push(value);
        }
      } else if (colindex === 0) {
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
          object.fill = false;
          object.label = value;
          chartData.datasets.push(object);

          chartData.colors.push(color);
        }
      } else if (chartData.datasets[rowindex - 1]) {
        chartData.datasets[rowindex - 1].data.push(numericalValue);
      }
    });
  });

  chartData.options.scales.xAxes[0].labels = chartData.labels;
  return chartData;
};

export default getLineReverseChartData;
