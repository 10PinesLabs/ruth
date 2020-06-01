import React from 'react';
import {VistaDelMedioContainer,} from './Resumen.styled';
import {useSpring} from "react-spring";
import ListaPinosQueHablaron from "../minuta/ListaPinosQueHablaron";


const Minuta = ({tema, retrocederTema, temaATratar, empezarTema, avanzarTema, temaActivo, terminarTema}) => {

  return (
    <VistaDelMedioContainer style={useSpring({opacity: 1, from: {opacity: 0}})}>
      <ListaPinosQueHablaron oradores={tema.oradores}/>
    </VistaDelMedioContainer>
  );
};
export default Minuta;
