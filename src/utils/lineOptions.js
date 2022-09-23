import { Chart } from 'chart.js';

// predefined chart options for line charts
const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    },
  },
  hover: {
    mode: 'x',
    intersect: false,
  },
  elements: {
    line: {
      tension: 0.4,
    },
  },
  scales: {
    x: {
      stacked: false,
      display: true,
      grid: {
        display: false,
      },
      labels: [],
      id: 'x-axis-1',
      min: 0,
      ticks: {
        beginAtZero: true,
      },
    },
    y: {
      stacked: false,
      type: 'linear',
      display: true,
      position: 'left',
      id: 'y-axis-1',
      ticks: {
        beginAtZero: true,
      },
      grid: {
        color: (context) =>
          context.tick.value === 0 ? '#888' : Chart.defaults.borderColor,
        lineWidth: (context) => (context.tick.value === 0 ? 2 : 1),
        display: true,
      },
      labels: {
        show: true,
      },
    },
  },
  plugins: {
    title: {
      display: true,
      text: '',
      fontSize: 20,
      padding: 20,
    },
    legend: {
      position: 'bottom',
    },
    tooltip: {
      mode: 'x',
      intersect: false,
      callbacks: {},
    },
  },
};

export default options;
