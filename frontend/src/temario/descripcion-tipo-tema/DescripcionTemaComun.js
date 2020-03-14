import React from 'react';
import {Descripcion, DescripcionTemaContainer} from './DescripcionTema.styled';
import {useSpring} from "react-spring";

const DescripcionTemaComun = ({tema}) => {
  const props = useSpring({opacity: 1, from: {opacity: 0}});

  return (
    <DescripcionTemaContainer style={props}>
      <Descripcion>{tema.descripcion}</Descripcion>
    </DescripcionTemaContainer>
  );
};

export default DescripcionTemaComun;
