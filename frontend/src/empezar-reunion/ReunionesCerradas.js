import React, {useEffect, useState} from "react";
import backend from "../api/backend";
import {CircularProgress, Paper, Table, TableBody, TableHead, TableRow} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {StyledTableCell} from "../minuta/TablaOradores.styled";
import {TablaPinos} from "../minuta/Minuta.styled";
import {useHistory} from "react-router-dom";
import {ButtonIcono, ButtonReunionCerrada, SecondaryButtonReunionCerrada} from "../components/Button.styled";
import {faSlack} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const FilaReunion = ({reunion}) => {

    return <TableRow>
        <StyledTableCell >{reunion.temas.length > 1 ? "Reunion de Roots" : reunion.nombre || reunion.temas[0].titulo}</StyledTableCell>
        <StyledTableCell >{reunion.temas.length > 1 ? "Roots" : reunion.temas[0].autor}</StyledTableCell>
        <StyledTableCell >{new Date(reunion.createdAt).toLocaleDateString('es')}</StyledTableCell>
        <StyledTableCell >
            <ButtonReunionCerrada>
                Ver
            </ButtonReunionCerrada>
            <SecondaryButtonReunionCerrada>
                Ver Minuta
            </SecondaryButtonReunionCerrada>
            <Tooltip title={<Typography color="inherit">Reenviar mail de minuta</Typography>}>
                <ButtonIcono>
                    <FontAwesomeIcon icon={faEnvelope}/>
                </ButtonIcono>
            </Tooltip>
            <Tooltip  title={<Typography color="inherit">Reenviar recordatorios de slack</Typography>}>
                <ButtonIcono>
                    <FontAwesomeIcon icon={faSlack}/>
                </ButtonIcono>
            </Tooltip>
        </StyledTableCell>

    </TableRow>
}


export const ReunionCerradas = () => {

    const history = useHistory();
    const [reuniones,setReuniones] = useState()
    useEffect(() => {
        backend.obtenerReuniones(false)
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