import React from 'react';
import {Descripcion, DescripcionTemaContainer, ListaPinosPropuestos, Titulo,} from './DescripcionTema.styled';

class DescripcionPropuestaPinos extends React.Component {
  render() {
    return (
      <DescripcionTemaContainer>
        <Descripcion>
          <ListaPinosPropuestos>
            {this.props.tema.propuestas.map((propuesta, index) => <li key={`propuesta-${index}`}><b>Pino
              propuesto:</b> {propuesta.pino}, <b>Sponsor de pino:</b> {propuesta.sponsor.name}</li>)}
          </ListaPinosPropuestos>
        </Descripcion>
      </DescripcionTemaContainer>
    );
  }
}

export default DescripcionPropuestaPinos;
