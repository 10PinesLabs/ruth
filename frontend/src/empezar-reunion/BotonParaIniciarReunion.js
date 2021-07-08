import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { EmpezarReunionButton } from './EmpezarReunion.styled';

class BotonParaIniciarReunion extends React.Component {
  render() {
    if (this.props.cargando) {
      return (<CircularProgress />);
    }
    return (<EmpezarReunionButton disabled={this.props.disabled} onClick={this.props.handleEmpezarReunion}>{this.props.texto}</EmpezarReunionButton>);
  }
}

export default BotonParaIniciarReunion;
