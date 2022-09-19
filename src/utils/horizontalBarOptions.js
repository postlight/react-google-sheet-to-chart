// predefined chart options for horizontal bar charts
const options = {
  indexAxis: 'y',
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
  title: {
    display: false,
    text: '',
    fontSize: 20,
    padding: 20,
  },
  legend: {
    position: 'bottom',
  },
  scales: {
    x: {
      display: true,
      grid: { display: false },
      labels: [],
      id: 'x-axis-1',
      ticks: {
        beginAtZero: true,
      },
    },
    y: {
      display: true,
      position: 'left',
      id: 'y-axis-1',
      ticks: {
        beginAtZero: true,
      },
    },
  },
};

export default options;
