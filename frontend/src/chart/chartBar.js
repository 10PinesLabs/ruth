import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartlineContainer } from './Chart.styled';
import { colorForReaccion, colorForReaccionDarker, reaccionesVisibles } from '../mobile/actions';

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
        display: true,
        position: 'bottom',
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
    const reacciones = reaccionesVisibles;
    return {
      labels: ['','', '', ''], //TODO: Sacar este workaround que se hizo para alinear los ejes X de ambos gráficos
      datasets: [{
        data: reacciones.map((reaccion) => (this.props.data.data[reaccion] || []).length),
        backgroundColor: reacciones.map(colorForReaccion),
        borderColor: reacciones.map(colorForReaccion),
        hoverBackgroundColor: reacciones.map(colorForReaccionDarker),
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
