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
  scales: {
    x: {
      stacked: false,
      display: true,
      grid: { display: false },
      labels: [],
      id: 'x-axis-1',
      ticks: {
        beginAtZero: true,
        min: 0,
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
        borderColor: '#888',
        borderWidth: 2,
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
