import React from 'react';
import { InfoTemaContainer } from './InfoTema.styled';
import InfoItem from './InfoItem';

class InfoTema extends React.Component {
  imagenTipoDuracion = (tipoDuracion) => {
    switch (tipoDuracion) {
      case 30:
        return './tema-corto.svg';
      case 60:
        return './tema-mediano.svg';
      case 120:
        return './tema-largo.svg';
      default:
        return null;
    }
  }

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
    return (
      <InfoTemaContainer>
        <InfoItem src="./usuarie.png" altText="Usuarie" descripcion={this.props.autor}/>
        <InfoItem src={this.imagenTipoDuracion(this.props.duracion)} altText="Pino" descripcion={`${this.props.duracion} min.`}/>
        <InfoItem src={this.imagenObligatoriedad(this.props.obligatoriedad)} altText="Obligatorio" descripcion={obligatoriedad[this.props.obligatoriedad]}/>
      </InfoTemaContainer>
    );
  }
}

const obligatoriedad = {
  OBLIGATORIO: 'Obligatorio',
  NO_OBLIGATORIO: 'No obligatorio',
};

export default InfoTema;
