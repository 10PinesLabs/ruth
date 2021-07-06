import React, {useEffect, useState} from "react";
import backend from "../api/backend";
import {CircularProgress, Paper, Table, TableBody, TableHead, TableRow} from "@material-ui/core";
import {StyledTableCell} from "../minuta/TablaOradores.styled";
import {TablaPinos} from "../minuta/Minuta.styled";
import {useHistory} from "react-router-dom";

const FilaReunion = ({history, reunion, CallToActionButton, estaAbierta}) => {
    return <TableRow>
        <StyledTableCell >{reunion.temas.length > 1 ? "Reunion de Roots" : reunion.nombre || reunion.temas[0].titulo}</StyledTableCell>
        <StyledTableCell >{reunion.temas.length > 1 ? "Roots" : reunion.temas[0].autor}</StyledTableCell>
        {
            !estaAbierta && <StyledTableCell>{new Date(reunion.createdAt).toLocaleDateString('es')}</StyledTableCell>
        }
        <CallToActionButton history={history} reunion={reunion}/>
    </TableRow>
}

export const Reunion = ({estaAbierta, listaDeColumnas, CallToActionButton}) => {

    const history = useHistory();
    const [reuniones,setReuniones] = useState()
    useEffect(() => {
        backend.obtenerReuniones(estaAbierta)
            .then( ({reuniones}) => setReuniones(reuniones))
    }, []);

    if(!reuniones){
        return <CircularProgress/>
    }

    return <>
        <TablaPinos>
            <Paper>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                listaDeColumnas.map((columna) => (
                                    <StyledTableCell>{columna}</StyledTableCell>
                                    )
                                )
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reuniones.map(reunion => <FilaReunion history={history} reunion={reunion} estaAbierta={estaAbierta} CallToActionButton={CallToActionButton}/>)}
                    </TableBody>
                </Table>
            </Paper>
        </TablaPinos>
    </>

}