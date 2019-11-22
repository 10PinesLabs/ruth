import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  EmpezarRootsContainer, Title, TitleAndButton, HomeImage, FlexContainer,
} from './EmpezarReunion.styled';
import backend from '../api/backend';
import BotonParaIniciarReunion from './BotonParaIniciarReunion';

class EmpezarReunion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      cargando: false,
    };
  }

  handleEmpezarReunion = () => {
    this.setState({ cargando: true });
    this.requestEmpezarReunion();
  };

  requestEmpezarReunion = () => {
    backend.empezarReunion().then(() => { this.setState({ redirect: true }); })
      .catch(() => {
        this.setState({ cargando: false });
        alert('Error al iniciar reunión!');
        return <Redirect to="/" />;
      });
  }

  render() {
    if (this.state.redirect) return <Redirect to="/reunionDeRoots" />;

    return (
      <FlexContainer>
        <EmpezarRootsContainer>
            <TitleAndButton>
              <Title>No hay ninguna reunión activa</Title>
              <BotonParaIniciarReunion cargando={this.state.cargando} handleEmpezarReunion={this.handleEmpezarReunion}/>
            </TitleAndButton>
            <HomeImage src="./home.svg" alt="Home"/>
        </EmpezarRootsContainer>
      </FlexContainer>
    );
  }
}

export default EmpezarReunion;
