import React from 'react';
import {TablaPinos, FilaTitulosWrapper, Td} from './ListaPinosQueHablaron.styled';
import FilaPinoHablando from "./FilaPinoHablando";

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
    7
  </Td>
  <Td>
    12
  </Td>
  <Td>
    3
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
