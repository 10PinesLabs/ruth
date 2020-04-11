import React from 'react';
import {ImagenTema, ImagenTemaContainer,} from './TemaItem.styled';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLeaf, faLock, faSeedling, faTree} from "@fortawesome/free-solid-svg-icons";

class IconoDuracion extends React.Component {
  tipoImagen = (tema) => {
    switch (tema.obligatoriedad) {
      case 'OBLIGATORIO':
        return faLock;
      case 'NO_OBLIGATORIO':
        return this.tipoDuracion(tema.duracion);
      default:
        return null;
    }
  }

  tipoDuracion = (duracion) => {
    switch (duracion) {
      case 'CORTO':
        return faLeaf;
      case 'MEDIO':
        return faSeedling;
      case 'LARGO':
        return faTree;
      default:
        return null;
    }
  };

  render() {
    return (
      <ImagenTemaContainer>
        <FontAwesomeIcon icon={this.tipoImagen(this.props.tema)} size={'1x'}/>
      </ImagenTemaContainer>
    );
  }
}

export default IconoDuracion;
