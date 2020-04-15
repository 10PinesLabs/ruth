import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartlineContainer } from './Chart.styled';
import { reacciones, coloresReacciones } from '../mobile/actions';

const ChartLine = ({data, inicioTema}) => {
  const graphOptions = () => ({
    layout: {
      padding: {
        left: 50,
        right: 50,
        top: 10,
        bottom: 10,
      },
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontSize: 20
      },
    },
    scales: {
      xAxes: [{
        ticks: {
          fontSize: 20,
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

  const intervalos = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const intervaloAlQuePertenece = (nombreDeReaccion) => {
    const dataCasiCompleta = data.data
      .filter(reaccion => reaccion.nombre === nombreDeReaccion)
      .map(reaccion => reaccion.fecha)
      .reduce((acc, fecha) => {
        const intervaloReal = (fecha - Date.parse(inicioTema))/60000;
        const intervalo = intervalos.find(int => int >= intervaloReal);
        acc[intervalo] = (acc[intervalo] || 0) + 1;
        return acc;
      }, {});
    return intervalos.map(intervalo => dataCasiCompleta[intervalo] || 0);
  };

  const formattedData = () => {

    const datasets = [
      {
        label: reacciones.THUMBS_UP,
        data: intervaloAlQuePertenece(reacciones.THUMBS_UP),
        backgroundColor: coloresReacciones.THUMBS_UP,
        borderColor: coloresReacciones.THUMBS_UP,
        fill: false
      },
      {
        label: reacciones.THUMBS_DOWN,
        data: Object.values(intervaloAlQuePertenece(reacciones.THUMBS_DOWN)),
        backgroundColor: coloresReacciones.THUMBS_DOWN,
        borderColor: coloresReacciones.THUMBS_DOWN,
        fill: false
      },
      {
        label: reacciones.SLACK,
        data: intervaloAlQuePertenece(reacciones.SLACK),
        backgroundColor: coloresReacciones.SLACK,
        borderColor: coloresReacciones.SLACK,
        fill: false
      },
      {
        label: reacciones.REDONDEAR,
        data: intervaloAlQuePertenece(reacciones.REDONDEAR),
        backgroundColor: coloresReacciones.REDONDEAR,
        borderColor: coloresReacciones.REDONDEAR,
        fill: false
      },
    ];
    return ({
      labels: intervalos.map(intervalo => intervalo + `'`),
      datasets
    })
  };

  return (
    <ChartlineContainer>
      <Line
        data={formattedData()}
        options={graphOptions()}
      />
    </ChartlineContainer>
  );
};

export default ChartLine;
