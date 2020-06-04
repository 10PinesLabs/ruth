import React from 'react';
import {TablaPinos, FilaTitulosWrapper, Td} from './ListaPinosQueHablaron.styled';
import FilaPinoHablando from "./FilaPinoHablando";
import {TiposReaccionAlHablar} from "../cola-de-participantes/TalkingReactions";
import {tipoDeEvento} from "../store/oradores";

const FilaTitulos = () => {
  return <FilaTitulosWrapper>
    <th>
      Nº
    </th>
    <th>
      Pino
    </th>
    <th>
      Tiempo
    </th>
    <th>
      De acuerdo
    </th>
    <th>
      Redondeando
    </th>
    <th>
      No de acuerdo
    </th>
    <th>
      Resumen
    </th>
  </FilaTitulosWrapper>;
};

function getMinutes(timestamp) {
  const date = new Date(timestamp);
  return `${date.getMinutes()}:${date.getSeconds()}`;
}

const FilaPino = (props) => {

  function reaccionesDelPino(filtro) {
    return props.pino.reacciones.filter((reaccion) =>
      reaccion.reaccion === filtro &&
      reaccion.tipo === tipoDeEvento.REACCIONAR_A_ORADOR).length;
  }

  return <tr>
    <td>
      {props.orden}
    </td>
    <Td>
      {props.pino.usuario.nombre}
    </Td>
    <Td>
      {props.tiempo}
    </Td>
    <Td>
      {reaccionesDelPino(TiposReaccionAlHablar.THUMBS_UP)}
    </Td>
    <Td>
      {reaccionesDelPino(TiposReaccionAlHablar.THUMBS_DOWN)}
    </Td>
    <Td>
      {reaccionesDelPino(TiposReaccionAlHablar.REDONDEAR)}
    </Td>
    <td>
      <p>Un resumen</p>
      <button>EDITAR</button>
    </td>
  </tr>
};


const ListaPinosQueHablaron = (props) => (
  <TablaPinos>
    <FilaTitulos/>
    <tbody>

    {props.oradores.pasados
      .map((pino, index) => <FilaPino
        pino={pino}
        orden={index + 1}
        tiempo={getMinutes(pino.fin - pino.inicio)}/>)
    }

    {props.oradores.actual
      ? <FilaPinoHablando pino={props.oradores.actual} orden={props.oradores.pasados.length + 1}/> : null
    }

    </tbody>
  </TablaPinos>
);

export default ListaPinosQueHablaron;
