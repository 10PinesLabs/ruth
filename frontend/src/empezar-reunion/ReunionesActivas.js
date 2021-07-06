import React, {useEffect, useState} from "react";
import backend from "../api/backend";
import {CircularProgress, Paper, Table, TableBody, TableHead, TableRow} from "@material-ui/core";
import {StyledTableCell} from "../minuta/TablaOradores.styled";
import {TablaPinos} from "../minuta/Minuta.styled";
import {useHistory} from "react-router-dom";
import {UnirseButton} from "../components/Button.styled";
import {Reunion} from "./Reunion";

const FilaReunion = ({reunion,history}) => {
    const handleClickUnirme = () => {
        history.push(`/${reunion.id}/`)
    }

    const handleClickPresentar = () => {
        history.push(`/${reunion.id}/presentador`)
    }

    return <StyledTableCell >
            <UnirseButton onClick={handleClickPresentar}>
                Presentar
            </UnirseButton>
            <UnirseButton onClick={handleClickUnirme}>
                Unirme
            </UnirseButton>
        </StyledTableCell>
}


export const ReunionActivas = () => {

    return <>
        <Reunion estaAbierta={true} listaDeColumnas={["Nombre de reunion", "Autor", "Acciones"]} CallToActionButton={FilaReunion}/>
    </>

}