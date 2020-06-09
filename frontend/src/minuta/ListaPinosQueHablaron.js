import React from 'react';
import {TablaPinos, FilaTitulosWrapper, Td} from './Minuta.styled';
import {TiposReaccionAlHablar} from "../cola-de-participantes/TalkingReactions";
import ClockContainer from "../clock/ClockContainer";

export const cantidadReaccionesDelPino = (tipoReaccion,pino) => {
  return pino.reacciones[tipoReaccion].length;
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

const FilaPino = (props) => <tr>
  <td>
    {props.orden}
  </td>
  <Td>
    {props.pino.usuario.nombre}
  </Td>
  <Td>
    <ClockContainer
      secondsElapsed={props.tiempo}
      shouldBeRunning={props.pino.fin == null && props.finTema == null}/>
  </Td>
  <Td>
    {cantidadReaccionesDelPino(TiposReaccionAlHablar.THUMBS_UP,props.pino)}
  </Td>
  <Td>
    {cantidadReaccionesDelPino(TiposReaccionAlHablar.REDONDEAR,props.pino)}
  </Td>
  <Td>
    {cantidadReaccionesDelPino(TiposReaccionAlHablar.THUMBS_DOWN,props.pino)}
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
        tiempo={Math.ceil((pino.fin - pino.inicio) / 1000)}
        />)
    }

    {props.oradores.actual
      ? <FilaPino
          pino={props.oradores.actual}
          orden={props.oradores.pasados.length + 1}
          tiempo={Math.ceil(((Date.parse(props.tema.fin) || Date.now()) - props.oradores.actual.inicio) / 1000)}
          finTema={props.tema.fin}
      />
      : null
    }

    </tbody>
  </TablaPinos>
);

export default ListaPinosQueHablaron;
