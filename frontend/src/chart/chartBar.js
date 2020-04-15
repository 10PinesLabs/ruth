import React from 'react';
import {Bar} from 'react-chartjs-2';
import {ChartlineContainer} from './Chart.styled';
import {reaccionesIniciales, coloresReacciones, coloresReaccionesHover} from '../mobile/actions';
import {assign, keys, values} from 'lodash';

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
    const reaccionesPorItem = this.props.data.data
      .map((data) => data.nombre)
      .reduce((map, reaccion) => {
        map[reaccion] = (map[reaccion] || 0) + 1;
        return map;
      }, {});

    return {
      labels: keys(assign({}, reaccionesIniciales, reaccionesPorItem)),
      datasets: [{
        data: values(assign({}, reaccionesIniciales, reaccionesPorItem)),
        backgroundColor: values(coloresReacciones),
        borderColor: values(coloresReacciones),
        hoverBackgroundColor: values(coloresReaccionesHover)
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
