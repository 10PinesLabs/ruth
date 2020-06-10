import React, {useState} from "react";
import {TiposReaccionAlHablar} from "../cola-de-participantes/TalkingReactions";
import {TableRow} from "@material-ui/core";
import {OradorActualContainer, StyledTableCell} from "./TablaOradores.styled";
import {RecordVoiceOver} from "@material-ui/icons";
import {colors} from "../styles/theme";
import ClockContainer from "../clock/ClockContainer";

export const cantidadReaccionesDelPino = (tipoReaccion,pino) => {
  return pino.reacciones[tipoReaccion].length;
}

const pinoQueHablo = (speaker, indexExposicion)=>{
  return  {
    orador:speaker,
    index:indexExposicion,
  }
}

export const FilaPino = ({orden,tiempo,pino,finTema, isTalking=false, pinoSeleccionado, onSelect}) => {
  
  const [pointerCursor, setPointerCursor] = useState(false);
  
  const rowStyle = {
      ...pinoSeleccionado && pinoSeleccionado.index === orden - 1 ? 
        {backgroundColor: "#B0FFD5"} : 
        {backgroundColor: "#F2F2F2"},
      ...(pointerCursor) ?
        {cursor: "pointer"}:
        {cursor: "auto"}
  };
  
  return (<TableRow
        style={rowStyle}
        onMouseEnter={() => setPointerCursor(true)}
        onClick={onOrdenSeleccionado}
      >
    <StyledTableCell align={"center"}>{orden}</StyledTableCell>
    <StyledTableCell>
        {(isTalking)?<>
        <OradorActualContainer>
          <RecordVoiceOver style={{ color: colors.viridian, marginRight: "10px"}}/>
          <strong>
            {pino.usuario.nombre}
          </strong>
        </OradorActualContainer>
          </> : <strong>{pino.usuario.nombre}</strong>}
    </StyledTableCell>
    <StyledTableCell align={"center"}>
      <ClockContainer
        secondsElapsed={tiempo}
        shouldBeRunning={pino.fin == null && finTema == null}/>
    </StyledTableCell>
    <StyledTableCell
      align={"center"}>{cantidadReaccionesDelPino(TiposReaccionAlHablar.THUMBS_UP, pino)}</StyledTableCell>
    <StyledTableCell
      align={"center"}>{cantidadReaccionesDelPino(TiposReaccionAlHablar.REDONDEAR, pino)} </StyledTableCell>
    <StyledTableCell
      align={"center"}>{cantidadReaccionesDelPino(TiposReaccionAlHablar.THUMBS_DOWN, pino)}</StyledTableCell>
    <StyledTableCell>
      {pino.resumen}
    </StyledTableCell>
  </TableRow>)


  function onOrdenSeleccionado() {
      onSelect(pinoQueHablo(pino.usuario.nombre,orden-1));
  }
};