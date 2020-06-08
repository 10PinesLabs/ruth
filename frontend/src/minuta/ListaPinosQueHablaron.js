import React from 'react';
import {TablaPinos, FilaTitulosWrapper, Td} from './ListaPinosQueHablaron.styled';
import FilaPinoHablando from "./FilaPinoHablando";
import {TiposReaccionAlHablar} from "../cola-de-participantes/TalkingReactions";

export const cantidadReaccionesDelPino = (tipoReaccion,props) => {
  return props.pino.reacciones[tipoReaccion].length;
}

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

const FilaPino = (props) => <tr>
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
    {cantidadReaccionesDelPino(TiposReaccionAlHablar.THUMBS_UP,props)}
  </Td>
  <Td>
    {cantidadReaccionesDelPino(TiposReaccionAlHablar.REDONDEAR,props)}
  </Td>
  <Td>
    {cantidadReaccionesDelPino(TiposReaccionAlHablar.THUMBS_DOWN,props)}
  </Td>
  <td>
    <p>Un resumen</p>
    <button>EDITAR</button>
  </td>
</tr>;


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
