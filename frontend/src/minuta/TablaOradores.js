import React, {useState} from 'react';
import {TablaPinos} from './Minuta.styled';
import {makeStyles, Paper, Table, TableBody, TableHead, TableRow} from "@material-ui/core";
import {FlexVerticalCenterSpaceAround, StyledTableCell} from "./TablaOradores.styled";
import IconButton from "@material-ui/core/IconButton";
import {colors} from "../styles/theme";
import {ExpandMore, ThumbDown, ThumbUp, Timer, Update} from "@material-ui/icons";
import {FilaPino} from "./FilaPino";

export function TablaOradores({oradores, finTema, pinoSeleccionado, onSelect}) {

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

  const OradoresEnOrdenDescendiente = ({oradores, finTema, pinoSeleccionado, onSelect}) => {
    return [...oradores.pasados
      .map((orador, index) =>
        <FilaPino
          pino={orador}
          orden={index + 1}
          tiempo={Math.ceil((orador.fin - orador.inicio) / 1000)}
          pinoSeleccionado={pinoSeleccionado}
          onSelect={onSelect}
          resumen={orador.resumen || ""}
        />),
      oradores.actual
        ? <FilaPino
          pino={oradores.actual}
          orden={oradores.pasados.length + 1}
          pinoSeleccionado={pinoSeleccionado}
          onSelect={onSelect}
          tiempo={Math.ceil(((Date.parse(finTema) || Date.now()) - oradores.actual.inicio) / 1000)}
          finTema={finTema}
          isTalking={true}
          resumen={oradores.resumen || ""}
        /> : null];
  }

  const OradoresEnOrdenAscendiente = ({oradores, pinoSeleccionado, finTema, onSelect}) => {
    return OradoresEnOrdenDescendiente({oradores, pinoSeleccionado, finTema, onSelect}).reverse();
  }

  return (<>
    <TablaPinos>
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
            {(ordenAscendiente) ?
              OradoresEnOrdenAscendiente({oradores, pinoSeleccionado, finTema, onSelect}) :
              OradoresEnOrdenDescendiente({oradores, pinoSeleccionado, finTema, onSelect})}
          </TableBody>
        </Table>
      </Paper>
    </TablaPinos>
  </>);
}

export default TablaOradores;
