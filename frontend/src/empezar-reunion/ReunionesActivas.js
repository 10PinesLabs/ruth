import React from "react";
import {StyledTableCell} from "../minuta/TablaOradores.styled";
import {UnirseButton} from "../components/Button.styled";
import {Reunion} from "./Reunion";

const FilaReunion = ({reunion,history}) => {
    const handleClickUnirme = () => {
        history.push(`/${reunion.id}/`)
    }

    const handleClickPresentar = () => {
        history.push(`/${reunion.id}/presentador`)
    }

    return <StyledTableCell>
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