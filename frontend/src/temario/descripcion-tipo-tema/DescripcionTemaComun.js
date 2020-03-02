import React from 'react';
import { DescripcionTemaContainer, Titulo, Descripcion } from './DescripcionTema.styled';

class DescripcionTemaComun extends React.Component {
  render() {
    return (
      <DescripcionTemaContainer>
          <Descripcion>{this.props.tema.descripcion}</Descripcion>
      </DescripcionTemaContainer>
    );
  }
}

export default DescripcionTemaComun;
