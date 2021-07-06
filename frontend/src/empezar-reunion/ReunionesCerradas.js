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
import {Reunion} from "./Reunion";

const FilaReunion = ({reunion}) => {

    return <StyledTableCell>
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
}


export const ReunionCerradas = () => {

    return <>
        <Reunion estaAbierta={false} listaDeColumnas={["Nombre de reunion", "Autor", "Fecha", "Acciones"]} CallToActionButton={FilaReunion}/>
    </>

}