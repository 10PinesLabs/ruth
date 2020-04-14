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

  const intervaloEnSRefrescoEjeX = 1;

  const [eventos, setEventos] = useState([]);
  const [puntosEjeX, setPuntosEjeX] = useState(0);

  const [puntosAprobaciones, setPuntosAprobaciones] = useState([{x: 0, y: 0}]);
  const [cantidadAprobaciones, setCantidadAprobaciones] = useState(0);

  const [puntosDesaprobaciones, setPuntosDesaprobaciones] = useState([{x: 0, y: 0}]);
  const [cantidadDesaprobaciones, setCantidadDesaprobaciones] = useState(0);

  const [puntosRedondeos, setPuntosRedondeos] = useState([{x: 0, y: 0}]);
  const [cantidadRedondeos, setCantidadRedondeos] = useState(0);

  const [puntosSlack, setPuntosSlack] = useState([{x: 0, y: 0}]);
  const [cantidadSlack, setCantidadSlack] = useState(0);

  useEffect(() => {
    const idsEventos = eventos.map(evento => evento.ultimoEventoId);
    const eventosNuevos = data.data
      .filter(evento => !idsEventos.includes(evento.ultimoEventoId))
      .map(evento => ({...evento, procesado: false}));
    const newArray = eventos.concat(eventosNuevos);
    setEventos(newArray);
  }, [data.data]);

  const mapaReacciones = {
    [reacciones.THUMBS_UP]: {setterCantidad: setCantidadAprobaciones, setterPuntos: setPuntosAprobaciones, cantidad: cantidadAprobaciones, puntos: puntosAprobaciones},
    [reacciones.THUMBS_DOWN]: {setterCantidad: setCantidadDesaprobaciones, setterPuntos: setPuntosDesaprobaciones, cantidad: cantidadDesaprobaciones, puntos: puntosDesaprobaciones},
    [reacciones.REDONDEAR]: {setterCantidad: setCantidadRedondeos, setterPuntos: setPuntosRedondeos, cantidad: cantidadRedondeos, puntos: puntosRedondeos},
    [reacciones.SLACK]: {setterCantidad: setCantidadSlack, setterPuntos: setPuntosSlack, cantidad: cantidadSlack, puntos: puntosSlack}
  }

  useInterval(() => {
    setPuntosEjeX(puntosEjeX + intervaloEnSRefrescoEjeX);
    const eventosSinProcesar = eventos.filter(evento => !evento.procesado);
    let nuevoValor;
    Object.keys(mapaReacciones).forEach( reaccionKey => {
      let valorASumar = 0;
      eventosSinProcesar.forEach(evento => {
        if(evento.nombre === reaccionKey){
          if(evento.type === 'Reaccionar') valorASumar++;
          if(evento.type === 'Desreaccionar') valorASumar--;
        }
      });
      nuevoValor = mapaReacciones[reaccionKey].cantidad + valorASumar;
      mapaReacciones[reaccionKey].setterPuntos([...mapaReacciones[reaccionKey].puntos, { x: puntosEjeX, y: nuevoValor}]);
      mapaReacciones[reaccionKey].setterCantidad(nuevoValor);
    });
    setEventos(eventos.map(evento => ({...evento, procesado: true})));
  }, intervaloEnSRefrescoEjeX * 1000);

  const ejeX = Array(tiempoTema * 60 / intervaloEnSRefrescoEjeX)
    .fill(0)
    .map((_, index) => index % (3600) === 0 ? index.toString() + "'" : '' );

  const formattedData = () => {

    const datasets = [
      {
        label: reacciones.THUMBS_UP,
        data: puntosAprobaciones,
        backgroundColor: '#68a1ea',
        pointRadius: 0,
        lineTension: 0,
        borderColor: '#68a1ea',
        fill: false
      },
      {
        label: reacciones.THUMBS_DOWN,
        data: puntosDesaprobaciones,
        backgroundColor: '#ffb3ba',
        pointRadius: 0,
        lineTension: 0,
        borderColor: '#ffb3ba',
        fill: false
      },
      {
        label: reacciones.SLACK,
        data: puntosSlack,
        pointRadius: 0,
        lineTension: 0,
        backgroundColor: '#ffdfba',
        borderColor: '#ffdfba',
        fill: false
      },
      {
        label: reacciones.REDONDEAR,
        data: puntosRedondeos,
        pointRadius: 0,
        lineTension: 0,
        backgroundColor: colores.primary,
        borderColor: colores.primary,
        fill: false
      },
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
