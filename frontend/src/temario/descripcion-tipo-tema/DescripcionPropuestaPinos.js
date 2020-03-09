import React from 'react';
import {Descripcion, DescripcionTemaContainer, ListaPinosPropuestos} from './DescripcionTema.styled';
import {useSpring} from "react-spring";

const DescripcionPropuestaPinos = ({tema}) => {
  const props = useSpring({opacity: 1, from: {opacity: 0}});

  return (
    <DescripcionTemaContainer style={props}>
      <Descripcion>
        <ListaPinosPropuestos>
          {tema.propuestas.map((propuesta, index) => <li key={`propuesta-${index}`}><b>Pino
            propuesto:</b> {propuesta.pino}, <b>Sponsor de pino:</b> {propuesta.sponsor.name}</li>)}
        </ListaPinosPropuestos>
      </Descripcion>
    </DescripcionTemaContainer>
  );
};

export default DescripcionPropuestaPinos;
