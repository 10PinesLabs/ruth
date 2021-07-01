import React, {useEffect, useState} from "react";
import backend from "../api/backend";
import {CircularProgress, Paper, Table, TableBody, TableHead, TableRow} from "@material-ui/core";
import {StyledTableCell} from "../minuta/TablaOradores.styled";
import {TablaPinos} from "../minuta/Minuta.styled";
import {useHistory} from "react-router-dom";
import {ButtonReunionCerrada} from "../components/Button.styled";

const FilaReunion = ({reunion,history}) => {

   /* const onClick = () => {
        history.push(`/${reunion.id}/`)
    }*/

    return <TableRow>
        <StyledTableCell >{reunion.temas.length > 1 ? "Reunion de Roots" : reunion.nombre || reunion.temas[0].titulo}</StyledTableCell>
        <StyledTableCell >{reunion.temas.length > 1 ? "Roots" : reunion.temas[0].autor}</StyledTableCell>
        <StyledTableCell >{"2021-07-01"}</StyledTableCell>
        <StyledTableCell >
            <ButtonReunionCerrada className="boton-reunion-cerrada" /*onClick={onClick}*/>
                Ver
            </ButtonReunionCerrada>
            <ButtonReunionCerrada className="boton-reunion-cerrada" /*onClick={onClick}*/>
                Ver Minuta
            </ButtonReunionCerrada>
            <ButtonReunionCerrada className="boton-reunion-cerrada" /*onClick={onClick}*/>
                Reenviar mail de minuta
            </ButtonReunionCerrada>
            <ButtonReunionCerrada className="boton-reunion-cerrada" /*onClick={onClick}*/>
                Reenviar recordatorios de slack
            </ButtonReunionCerrada>
        </StyledTableCell>

    </TableRow>
}


export const ReunionCerradas = () => {

    const history = useHistory();
    const [reuniones,setReuniones] = useState()
    useEffect(() => {
        backend.obtenerReunionesCerradas()
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
                            <StyledTableCell>Nombre de reunion</StyledTableCell>
                            <StyledTableCell>Autor</StyledTableCell>
                            <StyledTableCell>Fecha</StyledTableCell>
                            <StyledTableCell>Acciones</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reuniones.map(reunion => <FilaReunion history={history} reunion={reunion} />)}
                    </TableBody>
                </Table>
            </Paper>
        </TablaPinos>
    </>

}