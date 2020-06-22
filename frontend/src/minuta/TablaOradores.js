import React, {useState} from 'react';
import {TablaPinos} from './Minuta.styled';
import {makeStyles, Paper, Table, TableBody, TableHead, TableRow} from "@material-ui/core";
import {FlexVerticalCenterSpaceAround, StyledTableCell} from "./TablaOradores.styled";
import IconButton from "@material-ui/core/IconButton";
import {colors} from "../styles/theme";
import {ArrowDownward, ArrowUpward, ThumbDown, ThumbUp, Update} from "@material-ui/icons";
import {FilaPino} from "./FilaPino";

function HeaderReaction({children}) {
  return <StyledTableCell>
    <FlexVerticalCenterSpaceAround>
      {children}
    </FlexVerticalCenterSpaceAround>
  </StyledTableCell>;
}

export function TablaOradores({oradores, finTema, pinoSeleccionado, onSelect}) {

  const [ordenAscendente, setOrdenAscendiente] = useState(true);

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

  const OradoresEnOrdenDescendiente = () => {
    
    return [...oradores.pasados].concat(oradores.actual || [])
      .map((orador, index) => {

        const isTalking = !orador.fin && !finTema;

        const tiempo = (fin) => Math.ceil((fin - orador.inicio) / 1000);
        
        return <FilaPino
          pino={orador}
          orden={index + 1}
          isTalking={isTalking}
          tiempo={(isTalking)? tiempo(Date.parse(finTema) || Date.now()): tiempo(orador.fin)}
          pinoSeleccionado={pinoSeleccionado}
          onSelect={onSelect}
          resumen={orador.resumen || ""}
        />
      })
  }

  const OradoresEnOrdenAscendente = () => {
    return OradoresEnOrdenDescendiente().reverse();
  }

  return (<>
    <TablaPinos>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <HeaderReaction>
                  #
                  <IconButton
                    style={{color: colors.viridian}}
                    variant="outlined"
                    onClick={() => setOrdenAscendiente(!ordenAscendente)}
                  >
                    {(ordenAscendente) ? <ArrowDownward/> : <ArrowUpward/>}
                  </IconButton>
              </HeaderReaction>
              <StyledTableCell>Participante</StyledTableCell>
              <StyledTableCell>Tiempo</StyledTableCell>
              <HeaderReaction>    
                <ThumbUp/>
              </HeaderReaction>
              <HeaderReaction>  
                <ThumbDown/>
              </HeaderReaction>
              <HeaderReaction>
                <Update/>  
              </HeaderReaction>
              <StyledTableCell>Resumen de su exposición</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(ordenAscendente) ?
              OradoresEnOrdenAscendente() :
              OradoresEnOrdenDescendiente()}
          </TableBody>
        </Table>
      </Paper>
    </TablaPinos>
  </>);
}

export default TablaOradores;
