import React from 'react';
import { Line, Bar, HorizontalBar, Pie, Doughnut } from 'react-chartjs-2';
import getLineChartData from './charts/line';
import getLineReverseChartData from './charts/lineReverse';
import getHorizontalBarChartData from './charts/horizontalBar';
import getHorizontalBarReverseChartData from './charts/horizontalBarReverse';
import getBarChartData from './charts/bar';
import getBarReverseChartData from './charts/barReverse';
import getPieChartData from './charts/pie';
import getPieReverseChartData from './charts/pieReverse';
import handleOptions from './utils/handleOptions';

const getChart = (data, maintainAspectRatio, props) => {
  const { sheet } = props;
  let {
    startFrom,
    flipAxis,
    stacked,
    type,
    title,
    colors,
    xsuffix,
    ysuffix,
  } = props;

  let chartData = {};
  let datasets = {};
  const columnCount = data[0].length;
  const rowCount = data.length;

  if (!colors) {
    colors = [];
  }
  if (!flipAxis) {
    flipAxis = false;
  }
  if (!stacked) {
    stacked = false;
  }
  if (!startFrom) {
    startFrom = 0;
  }
  if (!type) {
    type = 'line';
  }
  if (!title) {
    title = sheet;
  }
  if (!xsuffix) {
    xsuffix = '';
  }
  if (!ysuffix) {
    ysuffix = '';
  }

  const flip =
    (rowCount > columnCount && flipAxis) ||
    (rowCount <= columnCount && !flipAxis);
  const chartKey = `${type} ${title} ${startFrom} ${flipAxis} ${stacked} ${xsuffix} ${ysuffix}`;
  let chart;
  switch (type) {
    case 'line':
      if (flip) {
        chartData = getLineReverseChartData(data, colors);
      } else {
        chartData = getLineChartData(data, colors);
      }

      handleOptions(
        chartData.options,
        maintainAspectRatio,
        title,
        startFrom,
        xsuffix,
        ysuffix,
      );

      datasets = { datasets: chartData.datasets, labels: chartData.labels };
      chart = (
        <Line key={chartKey} data={datasets} options={chartData.options} />
      );
      break;
    case 'bar':
      if (flip) {
        chartData = getBarReverseChartData(data, stacked, colors);
      } else {
        chartData = getBarChartData(data, stacked, colors);
      }

      handleOptions(
        chartData.options,
        maintainAspectRatio,
        title,
        startFrom,
        xsuffix,
        ysuffix,
      );

      datasets = { datasets: chartData.datasets, labels: chartData.labels };
      chart = (
        <Bar key={chartKey} data={datasets} options={chartData.options} />
      );
      break;
    case 'horizontalBar':
      if (flip) {
        chartData = getHorizontalBarReverseChartData(data, colors);
      } else {
        chartData = getHorizontalBarChartData(data, colors);
      }

      handleOptions(
        chartData.options,
        maintainAspectRatio,
        title,
        startFrom,
        xsuffix,
        ysuffix,
      );

      datasets = { datasets: chartData.datasets, labels: chartData.labels };
      chart = (
        <HorizontalBar
          key={chartKey}
          data={datasets}
          options={chartData.options}
        />
      );
      break;
    case 'pie':
      if (flip) {
        chartData = getPieReverseChartData(data, false, colors);
      } else {
        chartData = getPieChartData(data, false, colors);
      }

      chartData.options.maintainAspectRatio = maintainAspectRatio;
      chartData.options.title.text = title;
      chart = (
        <Pie key={chartKey} data={chartData.data} options={chartData.options} />
      );
      break;
    case 'semi-pie':
      if (flip) {
        chartData = getPieReverseChartData(data, true, colors);
      } else {
        chartData = getPieChartData(data, true, colors);
      }

      chartData.options.maintainAspectRatio = maintainAspectRatio;
      chartData.options.title.text = title;
      chart = (
        <Pie key={chartKey} data={chartData.data} options={chartData.options} />
      );
      break;
    case 'doughnut':
      if (flip) {
        chartData = getPieReverseChartData(data, false, colors);
      } else {
        chartData = getPieChartData(data, false, colors);
      }

      chartData.options.maintainAspectRatio = maintainAspectRatio;
      chartData.options.title.text = title;
      chart = (
        <Doughnut
          key={chartKey}
          data={chartData.data}
          options={chartData.options}
        />
      );
      break;
    case 'semi-doughnut':
      if (flip) {
        chartData = getPieReverseChartData(data, true, colors);
      } else {
        chartData = getPieChartData(data, true, colors);
      }

      chartData.options.maintainAspectRatio = maintainAspectRatio;
      chartData.options.title.text = title;
      chart = (
        <Doughnut
          key={chartKey}
          data={chartData.data}
          options={chartData.options}
        />
      );
      break;

    default:
      break;
  }

  return chart;
};

export default getChart;
