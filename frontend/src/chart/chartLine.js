import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartlineContainer } from './Chart.styled';
import { colors as colores } from '../styles/theme';
import { reacciones } from '../mobile/actions';

function calculateDataForReaction(data, inicioSeconds, inicioTema, now, reaccion) {
  const reaccionPoints = data.data.map((dataPoint) => ({
    x: dataPoint.fecha - inicioSeconds,
    y: dataPoint.reacciones[reaccion] || 0,
  }));

  reaccionPoints.unshift({ x: 0, y: 0 });
  const lastValue = reaccionPoints[reaccionPoints.length - 1];
  if (lastValue && lastValue.x < (now - inicioSeconds)) {
    reaccionPoints.push({ x: now - inicioSeconds, y: lastValue.y });
  }
  return reaccionPoints;
}

function colorForReaccion(reaccion) {
  switch (reaccion) {
    case reacciones.THUMBS_UP: {
      return '#68a1ea';
    }
    case reacciones.THUMBS_DOWN: {
      return '#ffb3ba';
    }
    case reacciones.SLACK: {
      return '#ffdfba';
    }
    case reacciones.REDONDEAR: {
      return colores.primary;
    }
    default: {
      return 'black';
    }
  }
}

const REFRESH_RATE = 10000;
const ChartLine = ({ data, inicioTema, tiempoTema = 10 }) => {
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
        fontSize: 20,
      },
    },
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom',
        ticks: {
          callback: (value, index, values) => {
            const minutosDesdeInicio = Math.floor(value / 1000 / 60);
            return `${minutosDesdeInicio}m`;
          },
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

  const inicioSeconds = new Date(inicioTema).valueOf();

  const [now, setNow] = useState(new Date().valueOf());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date().valueOf());
    }, REFRESH_RATE);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const datasets = Object.values(reacciones).map((reaccion) => {
    const rawData = calculateDataForReaction(data, inicioSeconds, inicioTema, now, reaccion);
    const color = colorForReaccion(reaccion);
    return {
      label: reaccion,
      data: rawData,
      backgroundColor: color,
      borderColor: color,
      pointRadius: 0,
      lineTension: 0,
      fill: false,
      steppedLine: 'before',
    };
  });

  const formattedData = {
    datasets,
  };

  return (
    <ChartlineContainer>
      <Line
        data={formattedData}
        options={graphOptions()}
      />
    </ChartlineContainer>
  );
};

export default ChartLine;
