import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartlineContainer } from './Chart.styled';

class ChartBar extends React.Component {
  graphOptions = () => ({
    layout: {
      padding: {
        left: 50,
        right: 50,
        top: 10,
        bottom: 10,
      },
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        ticks: {
          fontSize: 30,
        },
      }],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
            suggestedMax: 10,
            precision: 0,
            suggestedMin: 0,
            fontSize: 20,
          },
        },
      ],
    },
  });

  formattedData = () => {
    const reacciones = Object.keys(this.props.data.data);

    return {
      labels: reacciones,
      datasets: [{
        data: reacciones.map((reaccion) => this.props.data.data[reaccion].length),
        backgroundColor: '#68a1ea',
        borderColor: '#68a1ea',
        hoverBackgroundColor: '#ffdfba',
      },
      ],
    };
  };

  render() {
    return (
      <ChartlineContainer>
        <Bar
          data={this.formattedData()}
          options={this.graphOptions()}
        />
      </ChartlineContainer>
    );
  }
}

export default ChartBar;
