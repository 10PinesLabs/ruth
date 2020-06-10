import React, {useState} from 'react';
import {TablaPinos, FilaTitulosWrapper, Td, OrdenesTabla} from './Minuta.styled';
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

const FilaPino = (props) => <tr onClick={props.onClick}>
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
    <p>{props.minuta}</p>
    <button>EDITAR</button>
  </td>
</tr>;

const pinoQueHablo = (speaker, expositionNumber)=>{
  return  {
    speaker:speaker,
    number:expositionNumber,
  }
}

const ListaPinosQueHablaron = ({oradores, onSelect}) => {
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
          {(ordenAscendiente)? OradoresEnOrdenAscendiente({oradores,onSelect}) : OradoresEnOrdenDescendiente({oradores,onSelect})}
        </tbody>
      </TablaPinos>
    </>
  );
}

const OradoresEnOrdenDescendiente = ({oradores, onSelect}) => {
  return [...oradores.pasados
    .map((orador, index) =>
      <FilaPino
        pino={orador}
        orden={index + 1}
        tiempo={getMinutes(orador.fin - orador.inicio)}
        minuta={orador.minuta || "Sin resumen"}
        onClick={()=>onSelect(pinoQueHablo(orador.usuario.nombre, index))}
      />),
    oradores.actual
      ? <FilaPinoHablando
        pino={oradores.actual}
        orden={oradores.pasados.length + 1}
        onClick={(pino, index)=>onSelect(pinoQueHablo(oradores.actual.usuario.nombre, oradores.pasados.length))}
      /> : null];
}

const OradoresEnOrdenAscendiente = ({oradores, onSelect}) => {
  return OradoresEnOrdenDescendiente({oradores, onSelect}).reverse();
}

export default ListaPinosQueHablaron;
