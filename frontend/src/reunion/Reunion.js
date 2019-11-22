import React from 'react';
import { Redirect } from 'react-router-dom';
import Temario from '../temario/Temario';
import { ReunionContainer } from './Reunion.styled';
import { Button } from '../components/Button.styled';
import backend from '../api/backend';

class Reunion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleCerrarReunion = () => backend.cerrarReunion().then(() => this.setState({ redirect: true }));

  render() {
    if (this.state.redirect) return <Redirect to="/" />;

    return (
      <ReunionContainer>
        <Temario/>
        Tema actual
      <Button onClick={this.handleCerrarReunion}> Cerrar reunion </Button>
      </ReunionContainer>);
  }
}

export default Reunion;
