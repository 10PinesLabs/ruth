import React, { useEffect, useState } from 'react';
import {
  CircularProgress, Paper, TableBody, TableHead, TableRow,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import backend from '../api/backend';
import { StyledTableCell } from '../minuta/TablaOradores.styled';
import { TablaPinos } from '../minuta/Minuta.styled';

const FilaReunion = ({
  history, reunion, CallToActionButton, estaAbierta,
}) => <TableRow>
        <StyledTableCell >{reunion.temas.length > 1 ? 'Reunion de Roots' : reunion.nombre || reunion.temas[0].titulo}</StyledTableCell>
        <StyledTableCell >{reunion.temas.length > 1 ? 'Roots' : reunion.temas[0].autor}</StyledTableCell>
        {
            !estaAbierta && <StyledTableCell>{new Date(reunion.createdAt).toLocaleDateString('es')}</StyledTableCell>
        }
        <CallToActionButton history={history} reunion={reunion}/>
    </TableRow>;

// eslint-disable-next-line import/prefer-default-export
export const Reuniones = ({ estaAbierta, columnas, CallToActionButton }) => {
  const history = useHistory();
  const [reuniones, setReuniones] = useState();
  useEffect(() => {
    backend.obtenerReuniones(estaAbierta)
      .then((data) => setReuniones(data.reuniones));
  }, [estaAbierta]);

  if (!reuniones) {
    return <CircularProgress/>;
  }

  const ordenarReuniones = () => reuniones.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return <>
        <Paper>
            <TablaPinos>
                <TableHead>
                    <TableRow>
                        {
                            columnas.map((columna) => (
                                <StyledTableCell key={columna}>{columna}</StyledTableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ordenarReuniones().map((reunion) => <FilaReunion
                            key={reunion.id}
                            history={history}
                            reunion={reunion}
                            estaAbierta={estaAbierta}
                            CallToActionButton={CallToActionButton}
                    />)}
                </TableBody>
            </TablaPinos>
        </Paper>
  </>;
};
