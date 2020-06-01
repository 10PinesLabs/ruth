import React from 'react';
import {VistaDelMedioContainer,} from './Resumen.styled';
import {useSpring} from "react-spring";


const Minuta = ({tema, retrocederTema, temaATratar, empezarTema, avanzarTema, temaActivo, terminarTema}) => {

    return (
        <VistaDelMedioContainer style={useSpring({opacity: 1, from: {opacity: 0}})}>
          Proximamente!
        </VistaDelMedioContainer>
    );
};
export default Minuta;
