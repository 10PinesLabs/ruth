import React from 'react';
import InfoItem from './InfoItem';
import getGravatarUrlFor from '../api/gravatar';
import {InfoTemaContainer} from "./InfoItemContainer.styled";
import {faClock, faLock, faLockOpen} from "@fortawesome/free-solid-svg-icons";

class InfoTema extends React.Component {

  iconoObligatoriedad = (obligatoriedad) => {
    switch (obligatoriedad) {
      case 'OBLIGATORIO':
        return faLock;
      case 'NO_OBLIGATORIO':
        return faLockOpen;
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
        <InfoItem icon={faClock} altText="Pino" descripcion={`${cantidadDeMinutosDelTema} min.`}/>
        <InfoItem icon={this.iconoObligatoriedad(obligatoriedad)} altText="Obligatorio" descripcion={diccObligatoriedad[obligatoriedad]}/>
      </InfoTemaContainer>
    );
  }
}

const diccObligatoriedad = {
  OBLIGATORIO: 'Obligatorio',
  NO_OBLIGATORIO: 'No obligatorio',
};

export default InfoTema;
