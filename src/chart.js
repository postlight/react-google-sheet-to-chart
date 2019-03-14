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

const getChart = (data, maintainAspectRatio, props) => {
  const { sheet } = props;
  let { startFrom, flipAxis, stacked, type, title, colors } = props;

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

  const chartKey = `${type} ${title} ${startFrom} ${flipAxis} ${stacked}`;
  let chart;
  switch (type) {
    case 'line':
      if (rowCount > columnCount) {
        if (flipAxis) {
          chartData = getLineReverseChartData(data, colors);
        } else {
          chartData = getLineChartData(data, colors);
        }
      } else if (flipAxis) {
        chartData = getLineChartData(data, colors);
      } else {
        chartData = getLineReverseChartData(data, colors);
      }

      datasets = {
        datasets: chartData.datasets,
        labels: chartData.labels
      };
      chartData.options.maintainAspectRatio = maintainAspectRatio;
      chartData.options.title.text = title;
      if (startFrom !== 0) {
        chartData.options.scales.xAxes[0].ticks.beginAtZero = false;
        chartData.options.scales.yAxes[0].ticks.beginAtZero = false;
        chartData.options.scales.xAxes[0].ticks.min = parseFloat(startFrom);
        chartData.options.scales.yAxes[0].ticks.min = parseFloat(startFrom);
      } else {
        chartData.options.scales.xAxes[0].ticks = {
          beginAtZero: true
        };
        chartData.options.scales.yAxes[0].ticks = {
          beginAtZero: true
        };
      }
      chart = (
        <Line key={chartKey} data={datasets} options={chartData.options} />
      );
      break;
    case 'bar':
      if (rowCount > columnCount) {
        if (flipAxis) {
          chartData = getBarReverseChartData(data, stacked, colors);
        } else {
          chartData = getBarChartData(data, stacked, colors);
        }
      } else if (flipAxis) {
        chartData = getBarChartData(data, stacked, colors);
      } else {
        chartData = getBarReverseChartData(data, stacked, colors);
      }
      datasets = {
        datasets: chartData.datasets,
        labels: chartData.labels
      };
      chartData.options.maintainAspectRatio = maintainAspectRatio;
      chartData.options.title.text = title;
      if (startFrom !== 0) {
        chartData.options.scales.xAxes[0].ticks.beginAtZero = false;
        chartData.options.scales.yAxes[0].ticks.beginAtZero = false;
        chartData.options.scales.xAxes[0].ticks.min = parseFloat(startFrom);
        chartData.options.scales.yAxes[0].ticks.min = parseFloat(startFrom);
      } else {
        chartData.options.scales.xAxes[0].ticks = {
          beginAtZero: true
        };
        chartData.options.scales.yAxes[0].ticks = {
          beginAtZero: true
        };
      }
      chart = (
        <Bar key={chartKey} data={datasets} options={chartData.options} />
      );
      break;
    case 'horizontalBar':
      if (rowCount > columnCount) {
        if (flipAxis) {
          chartData = getHorizontalBarReverseChartData(data, colors);
        } else {
          chartData = getHorizontalBarChartData(data, colors);
        }
      } else if (flipAxis) {
        chartData = getHorizontalBarChartData(data, colors);
      } else {
        chartData = getHorizontalBarReverseChartData(data, colors);
      }
      datasets = {
        datasets: chartData.datasets,
        labels: chartData.labels
      };
      chartData.options.maintainAspectRatio = maintainAspectRatio;
      chartData.options.title.text = title;
      if (startFrom !== 0) {
        chartData.options.scales.xAxes[0].ticks.beginAtZero = false;
        chartData.options.scales.yAxes[0].ticks.beginAtZero = false;
        chartData.options.scales.xAxes[0].ticks.min = parseFloat(startFrom);
        chartData.options.scales.yAxes[0].ticks.min = parseFloat(startFrom);
      } else {
        chartData.options.scales.xAxes[0].ticks = {
          beginAtZero: true
        };
        chartData.options.scales.yAxes[0].ticks = {
          beginAtZero: true
        };
      }
      chart = (
        <HorizontalBar
          key={chartKey}
          data={datasets}
          options={chartData.options}
        />
      );
      break;
    case 'pie':
      if (rowCount > columnCount) {
        if (!flipAxis) {
          chartData = getPieChartData(data, false, colors);
        } else {
          chartData = getPieReverseChartData(data, false, colors);
        }
      } else if (!flipAxis) {
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
      if (rowCount > columnCount) {
        if (!flipAxis) {
          chartData = getPieChartData(data, true, colors);
        } else {
          chartData = getPieReverseChartData(data, true, colors);
        }
      } else if (!flipAxis) {
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
      if (rowCount > columnCount) {
        if (!flipAxis) {
          chartData = getPieChartData(data, false, colors);
        } else {
          chartData = getPieReverseChartData(data, false, colors);
        }
      } else if (!flipAxis) {
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
      if (rowCount > columnCount) {
        if (!flipAxis) {
          chartData = getPieChartData(data, true, colors);
        } else {
          chartData = getPieReverseChartData(data, true, colors);
        }
      } else if (!flipAxis) {
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
