import React from 'react';
import {
  TemaItemContainer, TituloTema,
} from './TemaItem.styled';
import IconoDuracion from './IconoDuracion';

class TemaItem extends React.Component {
  render() {
    return (
          <TemaItemContainer onClick = {() => this.props.seleccionarTema(this.props.tema)}>
              <TituloTema estaSeleccionado={this.props.estaSeleccionado}>{this.props.tema.titulo}</TituloTema>
              <IconoDuracion tema={this.props.tema}/>
          </TemaItemContainer>
    );
  }
}

export default TemaItem;
