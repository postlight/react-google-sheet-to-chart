/* eslint-disable no-param-reassign */
/**
 * Update chartjs options object with the following arguments
 *
 * @param {object} options
 * @param {boolean} maintainAspectRatio
 * @param {string} chartTitle
 * @param {number} startFrom
 * @param {string} xsuffix
 * @param {string} ysuffix
 */
const handleOptions = (
  options,
  maintainAspectRatio,
  chartTitle,
  startFrom,
  xsuffix,
  ysuffix,
) => {
  options.maintainAspectRatio = maintainAspectRatio;
  options.title.text = chartTitle;
  if (startFrom !== 0) {
    options.scales.xAxes[0].ticks.beginAtZero = false;
    options.scales.yAxes[0].ticks.beginAtZero = false;
    options.scales.xAxes[0].ticks.min = parseFloat(startFrom);
    options.scales.yAxes[0].ticks.min = parseFloat(startFrom);
  } else {
    options.scales.xAxes[0].ticks = { beginAtZero: true };
    options.scales.yAxes[0].ticks = { beginAtZero: true };
  }

  options.scales.xAxes[0].ticks.callback = value => {
    return `${value}${xsuffix}`;
  };
  options.scales.yAxes[0].ticks.callback = value => {
    return `${value}${ysuffix}`;
  };
};

export default handleOptions;
