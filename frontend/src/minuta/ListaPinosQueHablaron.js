import React, {useState} from 'react';
import {TablaPinos, FilaTitulosWrapper, Td, OrdenesTabla} from './Minuta.styled';
import {TiposReaccionAlHablar} from "../cola-de-participantes/TalkingReactions";
import ClockContainer from "../clock/ClockContainer";
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

const FilaPino = (props) => <tr onClick={props.onClick}>
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
    <p>{props.resumen}</p>
    <button>EDITAR</button>
  </td>
</tr>;

const pinoQueHablo = (speaker, indexExposicion)=>{
  return  {
    orador:speaker,
    index:indexExposicion,
  }
}

const ListaPinosQueHablaron = ({oradores, finTema, onSelect}) => {
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
          {(ordenAscendiente)? OradoresEnOrdenAscendiente({oradores,finTema ,onSelect}) : OradoresEnOrdenDescendiente({oradores,finTema ,onSelect})}
        </tbody>
      </TablaPinos>
    </>
  );
}

const OradoresEnOrdenDescendiente = ({oradores, finTema, onSelect}) => {
  return [...oradores.pasados
    .map((orador, index) =>
      <FilaPino
        pino={orador}
        orden={index + 1}
        tiempo={Math.ceil((orador.fin - orador.inicio) / 1000)}
        resumen={orador.resumen || "Sin resumen"}
        onClick={()=>onSelect(pinoQueHablo(orador.usuario.nombre, index))}
      />),
    oradores.actual
      ? <FilaPino
        pino={oradores.actual}
        orden={oradores.pasados.length + 1}
        onClick={(pino, index)=>onSelect(pinoQueHablo(oradores.actual.usuario.nombre, oradores.pasados.length))}
        tiempo={Math.ceil(((Date.parse(finTema) || Date.now()) - oradores.actual.inicio) / 1000)}
        finTema={finTema}
      /> : null];
}

const OradoresEnOrdenAscendiente = (oradores, finTema, onSelect) => {
  return OradoresEnOrdenDescendiente(oradores, finTema, onSelect).reverse();
}

export default ListaPinosQueHablaron;
