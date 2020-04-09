import React, {useEffect, useRef, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {ChartlineContainer} from './Chart.styled';
import {reacciones} from "../mobile";
import {colors as colores} from "../styles/theme";

const ChartLine = ({data, inicioTema, tiempoTema = 10}) => {

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

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

  const intervaloEnSRefrescoEjeX = 5;

  const [puntosEjeX, setPuntosEjeX] = useState(0);
  const [puntosEjeY, setValorPuntosEjeY] = useState(0);
  const [puntosThumbsUp, setPuntosThumbsUp] = useState([{x: 0, y: 0}]);

  useInterval(() => {
    setPuntosEjeX(puntosEjeX + intervaloEnSRefrescoEjeX);
    puntosEjeX % 100 === 0 && setValorPuntosEjeY(puntosEjeY + 1);
    setPuntosThumbsUp([...puntosThumbsUp, { x: puntosEjeX, y: puntosEjeY }]);
    console.log(puntosThumbsUp);
  }, intervaloEnSRefrescoEjeX * 1000);

  const ejeX = Array(tiempoTema * 60 / intervaloEnSRefrescoEjeX)
    .fill(0)
    .map((_, index) => index % (3600) === 0 ? index.toString() + "'" : '' );

  const formattedData = () => {

    const datasets = [
      {
        label: reacciones.THUMBS_UP,
        data: puntosThumbsUp,
        backgroundColor: '#68a1ea',
        pointRadius: 0,
        lineTension: 0,
        borderColor: '#68a1ea',
        fill: false
      }
    ];
    return ({
      labels: ejeX,
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
