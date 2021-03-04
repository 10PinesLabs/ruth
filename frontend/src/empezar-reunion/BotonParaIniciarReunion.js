import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Button } from '../components/Button.styled';

class BotonParaIniciarReunion extends React.Component {
  render() {
    if (this.props.cargando) {
      return (<CircularProgress />);
    }
    return (<Button style={{"margin": "1em 0"}}disabled={this.props.disabled} onClick={this.props.handleEmpezarReunion}>{this.props.texto}</Button>);
  }
}

export default BotonParaIniciarReunion;
