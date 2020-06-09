import React, {useState} from 'react';
import {TablaPinos, FilaTitulosWrapper, Td,  OrdenesTabla} from './ListaPinosQueHablaron.styled';
import FilaPinoHablando from "./FilaPinoHablando";
import {TiposReaccionAlHablar} from "../cola-de-participantes/TalkingReactions";
import Button from "@material-ui/core/Button";
import {ExpandMore, Timer} from "@material-ui/icons";

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

function ListaPinosQueHablaron({oradores}) {

  let [ordenAscendiente, setOrdenAscendiente] = useState(true);
  
  return (
    <>
      <OrdenesTabla>
        <Button
          variant="outlined"
          color="primary"
          startIcon={(ordenAscendiente)? <Timer/> : <ExpandMore/>}
          onClick={() => setOrdenAscendiente(!ordenAscendiente)}
        >
          {(ordenAscendiente)? "Orden cronolgico" :"Mas recientes"}
        </Button>
      </OrdenesTabla>
      <TablaPinos>
        <FilaTitulos/>
        <tbody>
          {(ordenAscendiente)? OradoresEnOrdenAscendiente({oradores}) : OradoresEnOrdenDescendiente({oradores})}
        </tbody>
      </TablaPinos>
    </>
  );
}

const OradoresEnOrdenDescendiente = ({oradores}) => {
  return [...oradores.pasados
    .map((pino, index) =>
      <FilaPino
        pino={pino}
        orden={index + 1}
        tiempo={getMinutes(pino.fin - pino.inicio)}
      />),
    oradores.actual
      ? <FilaPinoHablando
        pino={oradores.actual}
        orden={oradores.pasados.length + 1}
      /> : null];
}

const OradoresEnOrdenAscendiente = ({oradores}) => {
  return OradoresEnOrdenDescendiente({oradores}).reverse();
}


export default ListaPinosQueHablaron;
