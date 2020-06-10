import React, {useState} from "react";
import {TiposReaccionAlHablar} from "../cola-de-participantes/TalkingReactions";
import {cantidadReaccionesDelPino} from "./ListaPinosQueHablaron";
import {makeStyles, Paper, Table, TableHead, TableRow, TableBody} from "@material-ui/core";
import {FlexVerticalCenterSpaceAround, OradorActualContainer, StyledTableCell} from "./TablaOradores.styled";
import {ExpandMore, RecordVoiceOver, ThumbDown, ThumbUp, Timer, Update} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {colors} from "../styles/theme";
import ClockContainer from "../clock/ClockContainer";

export function TablaOradores({ oradores, finTema, onSelect}) {

  const [nroPinoHighlighteado, setNroPinoHighlighteado] = useState(0)
  const [ordenAscendiente, setOrdenAscendiente] = useState(true);
  
  const classes = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  }))();
  
  return <>
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <FlexVerticalCenterSpaceAround>
                #
                <IconButton
                  style={{color: colors.viridian}}
                  variant="outlined"
                  onClick={() => setOrdenAscendiente(!ordenAscendiente)}
                >
                  {(ordenAscendiente) ? <Timer/> : <ExpandMore/>}
                </IconButton>  
              </FlexVerticalCenterSpaceAround>
            </StyledTableCell>
            <StyledTableCell>Participante</StyledTableCell>
            <StyledTableCell>Tiempo</StyledTableCell>
            <StyledTableCell>
              <FlexVerticalCenterSpaceAround>
                <ThumbUp/>
              </FlexVerticalCenterSpaceAround>
            </StyledTableCell>
            <StyledTableCell>
              <FlexVerticalCenterSpaceAround>
                <ThumbDown/>
              </FlexVerticalCenterSpaceAround>
            </StyledTableCell>
            <StyledTableCell>
              <FlexVerticalCenterSpaceAround>
                <Update/>
              </FlexVerticalCenterSpaceAround>
            </StyledTableCell>
            <StyledTableCell>Resumen de su exposición</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {(ordenAscendiente)? 
            OradoresEnOrdenAscendiente({oradores,nroPinoHighlighteado,setNroPinoHighlighteado, finTema ,onSelect}): 
            OradoresEnOrdenDescendiente({oradores,nroPinoHighlighteado,setNroPinoHighlighteado, finTema ,onSelect})}
        </TableBody>
      </Table>
    </Paper>
  </>;
}

const OradoresEnOrdenDescendiente = ({oradores, nroPinoHighlighteado, setNroPinoHighlighteado, finTema, onSelect}) => {
  return [...oradores.pasados
    .map((orador, index) =>
      <FilaPino
        pino={orador}
        orden={index + 1}
        tiempo={Math.ceil((orador.fin - orador.inicio) / 1000)}
        seleccion = {[nroPinoHighlighteado,setNroPinoHighlighteado]}
        resumen={orador.resumen || "Sin resumen"}
        onClick={()=>onSelect(pinoQueHablo(orador.usuario.nombre, index))}
      />),
    oradores.actual
      ? <FilaPino
        pino={oradores.actual}
        orden={oradores.pasados.length + 1}
        onClick={(pino, index)=>onSelect(pinoQueHablo(oradores.actual.usuario.nombre, oradores.pasados.length))}
        seleccion = {[nroPinoHighlighteado,setNroPinoHighlighteado]}
        tiempo={Math.ceil(((Date.parse(finTema) || Date.now()) - oradores.actual.inicio) / 1000)}
        finTema={finTema}
        isTalking={true}
      /> : null];
}

const OradoresEnOrdenAscendiente = ({oradores, nroPinoHighlighteado, setNroPinoHighlighteado, finTema, onSelect}) => {
  return OradoresEnOrdenDescendiente({oradores, nroPinoHighlighteado, setNroPinoHighlighteado, finTema, onSelect}).reverse();
}

const pinoQueHablo = (speaker, indexExposicion)=>{
  return  {
    orador:speaker,
    index:indexExposicion,
  }
}

const FilaPino = ({orden,tiempo,pino,seleccion,finTema, isTalking=false, onClick}) => {
  
  const [nroDeOrdenSeleccionadoEnTabla,setNroDeOrdenSeleccionadoEnTabla] = seleccion

  const [pointerCursor, setPointerCursor] = useState(false);
  
  // todo fijarse si el hover de pointer cursor peude añadirse aca 
  const rowStyle = {
      ...(nroDeOrdenSeleccionadoEnTabla === orden) ? 
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
    if(nroDeOrdenSeleccionadoEnTabla === orden) {
      setNroDeOrdenSeleccionadoEnTabla(0)
    } else {
      setNroDeOrdenSeleccionadoEnTabla(orden)
      onClick(pinoQueHablo(pino,orden));
    }
  }
};