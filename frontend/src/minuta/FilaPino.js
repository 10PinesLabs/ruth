import React, {useState} from "react";
import {TiposReaccionAlHablar} from "../cola-de-participantes/TalkingReactions";
import {TableRow} from "@material-ui/core";
import {OradorActualContainer, StyledTableCell} from "./TablaOradores.styled";
import {RecordVoiceOver} from "@material-ui/icons";
import {colors} from "../styles/theme";
import ClockContainer from "../clock/ClockContainer";

export const cantidadReaccionesDelPino = (tipoReaccion, pino) => {
  return pino.reacciones[tipoReaccion].length;
}

const pinoQueHablo = (orador, index, resumen) => {
  return {
    orador,
    index,
    resumen
  }
}

export const FilaPino = ({orden, tiempo, pino, isTalking = false, pinoSeleccionado, onSelect}) => {

  const [isOverRow, setIsOverRow] = useState(false);

  const esElPinoSeleccionado = pinoSeleccionado && pinoSeleccionado.index === orden - 1;
  
  const rowStyle = {
    backgroundColor: esElPinoSeleccionado ? colors.downy : colors.background,
    cursor: isOverRow ? 'pointer' : 'auto',
  };

  const PinoNombre = () => <strong>{pino.usuario.nombre}</strong>;

  return (<TableRow
    style={rowStyle}
    onMouseEnter={() => setIsOverRow(true)}
    onClick={onOrdenSeleccionado}
  >
    <StyledTableCell align={"center"}>{orden}</StyledTableCell>
    <StyledTableCell>
      {(isTalking) ? <>
        <OradorActualContainer>
          <RecordVoiceOver style={{color: colors.viridian, marginRight: "10px"}}/>
          <PinoNombre/>
        </OradorActualContainer>
      </> : <PinoNombre/>}
    </StyledTableCell>
    <StyledTableCell align={"center"}>
      <ClockContainer
        secondsElapsed={tiempo}
        shouldBeRunning={isTalking}/>
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
    onSelect(pinoQueHablo(pino.usuario.nombre, orden - 1, pino.resumen));
  }
};