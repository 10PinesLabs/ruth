import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Button } from '../components/Button.styled';

class BotonParaIniciarReunion extends React.Component {
  render() {
    if (this.props.cargando) {
      return (<CircularProgress />);
    }
    return (<Button onClick={this.props.handleEmpezarReunion}>{this.props.texto}</Button>);
  }
}

export default BotonParaIniciarReunion;
