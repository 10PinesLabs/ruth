import React from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  EmpezarRootsContainer, Title, TitleAndButton, HomeImage, FlexContainer, BotonesContainer, TextContainer,
} from './EmpezarReunion.styled';
import backend from '../api/backend';
import BotonParaIniciarReunion from './BotonParaIniciarReunion';
import {ThemedTextfield} from "../styles/theme";

class EmpezarReunion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tema: "",
      descripcion: "",
      urlDePresentacion: "",
      cargando: false,
    };
  }

  dispatchReunion = (data) => {
    const evento = {
      autor: 'PRESENTADOR',
      fecha: Date.now(),
      data: { tipo: data.tipo },
    };
    this.socket.send(JSON.stringify(evento));
  };

  handleEmpezarReunion = (opcionesDeReunion) => {
    this.setState({ cargando: true });
    this.requestEmpezarReunion(opcionesDeReunion);
  };

  requestEmpezarReunion = (opcionesDeReunion) => {
    backend.empezarReunion(opcionesDeReunion)
      .then((reunion) => {
        toast.success('Reunión iniciada');
        this.props.history.push("/"+reunion.id+"/presentador");
      })
      .catch(() => {
        this.setState({ cargando: false });
        toast.error('Error al iniciar la reunión');
      });
  };

  render() {
    return (
      <FlexContainer>
        <EmpezarRootsContainer>
          <TitleAndButton>
            <Title>No hay ninguna reunión activa</Title>
            <div>
              <BotonesContainer>

                <TextContainer>
                  <ThemedTextfield value={this.state.tema} onChange={(event) => this.setState({tema: event.target.value})} multiline label="Tema propuesto"/>
                  <ThemedTextfield value={this.state.descripcion} onChange={(event) => this.setState({descripcion: event.target.value})} multiline label="Descripcion"/>
                  <ThemedTextfield value={this.state.urlDePresentacion} onChange={(event) => this.setState({urlDePresentacion: event.target.value})} multiline label="Url de presentacion"/>
                </TextContainer>

                <BotonParaIniciarReunion
                    cargando={this.state.cargando}
                    handleEmpezarReunion={() => this.handleEmpezarReunion({reunionDeRoots: false, tema: this.state.tema, descripcion: this.state.descripcion,urlDePresentacion : this.state.urlDePresentacion })}
                    texto="Empezar Reunión rápida"/>
              </BotonesContainer>

              <BotonParaIniciarReunion
                  cargando={this.state.cargando}
                  handleEmpezarReunion={() => this.handleEmpezarReunion({reunionDeRoots: true})}
                  texto="Empezar Reunión de Root"
              />

            </div>
          </TitleAndButton>
          <HomeImage src="./home.svg" alt="Home"/>
        </EmpezarRootsContainer>
      </FlexContainer>
    );
  }
}

export default withRouter(EmpezarReunion);
