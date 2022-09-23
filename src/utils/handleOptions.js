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
  options.plugins.title.text = chartTitle;
  if (startFrom !== 0) {
    options.scales.y.beginAtZero = false;
    options.scales.x.beginAtZero = false;
    options.scales.x.min = parseFloat(startFrom);
    options.scales.y.min = parseFloat(startFrom);
  } else {
    options.scales.x.ticks = { beginAtZero: true };
    options.scales.y.ticks = { beginAtZero: true };
  }

  options.scales.x.ticks.callback = function (value) {
    const label = this.chart.scales.x.getLabelForValue(value);
    return `${label}${xsuffix}`;
  };
  options.scales.y.ticks.callback = function (value) {
    const label = this.chart.scales.y.getLabelForValue(value);
    return `${label}${xsuffix}`;
  };
};

export default handleOptions;
