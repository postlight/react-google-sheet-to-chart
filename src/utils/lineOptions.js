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
  title: {
    display: true,
    text: '',
    fontSize: 20,
    padding: 20,
  },
  legend: {
    position: 'bottom',
  },
  tooltips: {
    mode: 'x',
    intersect: false,
    callbacks: {},
  },
  scales: {
    xAxes: [
      {
        stacked: false,
        display: true,
        gridLines: { display: false },
        labels: [],
        id: 'x-axis-1',
        ticks: {
          beginAtZero: true,
          min: 0,
        },
      },
    ],
    yAxes: [
      {
        stacked: false,
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
        ticks: {
          beginAtZero: true,
        },
        gridLines: {
          zeroLineColor: '#888',
          zeroLineWidth: 2,
          display: true,
        },
        labels: {
          show: true,
        },
      },
    ],
  },
};

export default options;
