import React from 'react';
import {TablaPinos, FilaTitulosWrapper, Td} from './Minuta.styled';
import {TiposReaccionAlHablar} from "../cola-de-participantes/TalkingReactions";
import ParticipantCounter from "../cola-de-participantes/ParticipantCounter";

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
const generarEstadoPara = (pino, finTema) => {
  if (estaEncolado(pino)) {
    return {detalle: 'encolado'};
  }
  if (hablo(pino)) {
    return {detalle: 'hablo', seconds: Math.ceil((pino.fin - pino.inicio) / 1000)};
  }
  return {detalle: finTema? 'hablo' : 'hablando', seconds: Math.ceil(((Date.parse(finTema) || Date.now()) - pino.inicio) / 1000)};
};

const hablo = (pino) => {
  return pino.fin !== null;
}

const estaEncolado = (pino) => {
  return pino.inicio === null;
};

const FilaPino = (props) => <tr>
  <td>
    {props.orden}
  </td>
  <Td>
    {props.pino.usuario.nombre}
  </Td>
  <Td>
    <ParticipantCounter estadoOrador={generarEstadoPara(props.pino, props.tema.finTema)}/>
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
        tema={props.tema}
        />)
    }

    {props.oradores.actual
      ? <FilaPino
          pino={props.oradores.actual}
          orden={props.oradores.pasados.length + 1}
          tema={props.tema}/>
      : null
    }

    </tbody>
  </TablaPinos>
);

export default ListaPinosQueHablaron;
