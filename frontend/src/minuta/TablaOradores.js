import React, {useState} from "react";
import FilaPinoHablando from "./FilaPinoHablando";
import {TiposReaccionAlHablar} from "../cola-de-participantes/TalkingReactions";
import {cantidadReaccionesDelPino} from "./ListaPinosQueHablaron";
import {makeStyles, Paper, Table, TableHead, TableRow, TableBody} from "@material-ui/core";
import {FlexVerticalCenterSpaceAround, StyledTableCell} from "./TablaOradores.styled";
import {ExpandMore, ThumbDown, ThumbUp, Timer, Update} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {colors} from "../styles/theme";

export function TablaOradores({ oradores}) {

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
            OradoresEnOrdenAscendiente({oradores,nroPinoHighlighteado,setNroPinoHighlighteado}): 
            OradoresEnOrdenDescendiente({oradores,nroPinoHighlighteado,setNroPinoHighlighteado})}
            
        </TableBody>
      </Table>
    </Paper>
  </>;
}

const OradoresEnOrdenDescendiente = ({oradores, nroPinoHighlighteado, setNroPinoHighlighteado}) => {
  return [...oradores.pasados
    .map((pino, index) =>
      <FilaPino
        pino={pino}
        orden={index + 1}
        tiempo={getMinutes(pino.fin - pino.inicio)}
        seleccion = {[nroPinoHighlighteado,setNroPinoHighlighteado]}
      />),
    oradores.actual
      ? <FilaPinoHablando
        pino={oradores.actual}
        orden={oradores.pasados.length + 1}
        seleccion = {[nroPinoHighlighteado,setNroPinoHighlighteado]}
      /> : null];
}

const OradoresEnOrdenAscendiente = ({oradores, nroPinoHighlighteado, setNroPinoHighlighteado}) => {
  return OradoresEnOrdenDescendiente({oradores, nroPinoHighlighteado, setNroPinoHighlighteado}).reverse();
}

function getMinutes(timestamp) {
  const date = new Date(timestamp);
  return `${date.getMinutes()}:${date.getSeconds()}`;
}

const FilaPino = ({orden,tiempo,pino,seleccion}) => {
  
  const [nroDeOrdenSeleccionadoEnTabla,setNroDeOrdenSeleccionadoEnTabla] = seleccion

  const [pointerCursor, setPointerCursor] = useState(false);
  
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
      <strong>{pino.usuario.nombre}</strong>
    </StyledTableCell>
    <StyledTableCell align={"center"}>{tiempo}</StyledTableCell>
    <StyledTableCell
      align={"center"}>{cantidadReaccionesDelPino(TiposReaccionAlHablar.THUMBS_UP, pino)}</StyledTableCell>
    <StyledTableCell
      align={"center"}>{cantidadReaccionesDelPino(TiposReaccionAlHablar.REDONDEAR, pino)} </StyledTableCell>
    <StyledTableCell
      align={"center"}>{cantidadReaccionesDelPino(TiposReaccionAlHablar.THUMBS_DOWN, pino)}</StyledTableCell>
    <StyledTableCell>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    </StyledTableCell>
  </TableRow>)


  function onOrdenSeleccionado() {
    if(nroDeOrdenSeleccionadoEnTabla === orden) {
      setNroDeOrdenSeleccionadoEnTabla(0)
    } else {
      setNroDeOrdenSeleccionadoEnTabla(orden)
    }
  }
};