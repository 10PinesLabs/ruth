import React from 'react';
import InfoItem from './InfoItem';
import getGravatarUrlFor from '../api/gravatar';
import {InfoTemaContainer} from "./InfoItemContainer.styled";

class InfoTema extends React.Component {

  imagenObligatoriedad = (obligatoriedad) => {
    switch (obligatoriedad) {
      case 'OBLIGATORIO':
        return './tema-obligatorio.svg';
      case 'NO_OBLIGATORIO':
        return './tema-no-obligatorio.svg';
      default:
        return null;
    }
  }

  render() {
    const {
      autor, obligatoriedad, cantidadDeMinutosDelTema, mailDelAutor = '',
    } = this.props.tema;
    return (
      <InfoTemaContainer>
        <InfoItem src={getGravatarUrlFor(mailDelAutor)} altText="Usuarie" descripcion={autor} isAvatar={true}/>
        <InfoItem src={'./duracion.svg'} altText="Pino" descripcion={`${cantidadDeMinutosDelTema} min.`}/>
        <InfoItem src={this.imagenObligatoriedad(obligatoriedad)} altText="Obligatorio" descripcion={diccObligatoriedad[obligatoriedad]}/>
      </InfoTemaContainer>
    );
  }
}

const diccObligatoriedad = {
  OBLIGATORIO: 'Obligatorio',
  NO_OBLIGATORIO: 'No obligatorio',
};

export default InfoTema;
