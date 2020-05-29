import React, {useState} from 'react';
import {faCaretLeft, faCaretRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Botonera, BotoneraNavegacionTemas, VistaDelMedioContainer,} from './Resumen.styled';
import InfoTema from '../temario/InfoTema';
import {Button, SecondaryButton} from '../components/Button.styled';
import {useSpring} from "react-spring";
import DescripcionTemaComun from "../temario/descripcion-tipo-tema/DescripcionTemaComun";
import DescripcionActionItems from "../temario/descripcion-tipo-tema/DescripcionActionItems";
import DescripcionPropuestaPinos from "../temario/descripcion-tipo-tema/DescripcionPropuestaPinos";
import {ModalDeConfirmacion} from "./Modal";
import Zoom from "@material-ui/core/Zoom";

const tiposDeTema = {
    'conDescripcion': DescripcionTemaComun,
    'repasarActionItems': DescripcionActionItems,
    'proponerPinos': DescripcionPropuestaPinos,
};

const Minuta = ({tema, retrocederTema, temaATratar, empezarTema, avanzarTema, temaActivo, terminarTema}) => {

    const props = useSpring({opacity: 1, from: {opacity: 0}});

    return (
        <VistaDelMedioContainer style={props}>
          aca va a ir toda la logica de la pagina :D
        </VistaDelMedioContainer>
    );
};
export default Minuta;
