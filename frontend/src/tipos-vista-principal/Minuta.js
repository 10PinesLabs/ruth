import React from 'react';
import {VistaDelMedioContainer,} from './Resumen.styled';
import {useSpring} from "react-spring";


const Minuta = ({tema, retrocederTema, temaATratar, empezarTema, avanzarTema, temaActivo, terminarTema}) => {

    const props = useSpring({opacity: 1, from: {opacity: 0}});

    return (
        <VistaDelMedioContainer style={props}>
          aca va a ir toda la logica de la pagina :D
        </VistaDelMedioContainer>
    );
};
export default Minuta;
