import React, {useEffect, useState} from "react";
import backend from "../api/backend";
import {CircularProgress, Paper, Table, TableBody, TableHead, TableRow} from "@material-ui/core";
import {StyledTableCell} from "../minuta/TablaOradores.styled";
import {TablaPinos} from "../minuta/Minuta.styled";
import {useHistory} from "react-router-dom";
import {Button} from "../components/Button.styled";

const FilaReunion = ({reunion,history}) => {
    const onClick = () => {
        history.push(`/${reunion.id}/`)
    }
    return <TableRow>
        <StyledTableCell >{reunion.temas.length > 1 ? "Reunion de Roots" : reunion.temas[0].titulo}</StyledTableCell>
        <StyledTableCell >{reunion.temas.length > 1 ? "Roots" : reunion.temas[0].autor}</StyledTableCell>
        <StyledTableCell >
            <Button onClick={onClick}>
                Unirme
            </Button>
        </StyledTableCell>

    </TableRow>
}


export const ReunionActivas = () => {

    const history = useHistory();
    const [reuniones,setReuniones] = useState()
    useEffect(() => {
        backend.obtenerReunionesAbiertas()
            .then( ({reuniones}) => setReuniones(reuniones))
    }, []);

    if(!reuniones){
        return <CircularProgress/>
    }

    return<>
        <TablaPinos>
            <Paper>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nombre de reunion</StyledTableCell>
                            <StyledTableCell>Autor</StyledTableCell>
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