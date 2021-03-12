import React from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  EmpezarRootsContainer,
  Title,
  TitleAndButton,
  HomeImage,
  FlexContainer,
  BotonesContainer,
  TextContainer,
  BotonDeCreacionContainer,
  CancelButton,
  WhiteThemedTextfield,
  FormContainer,
  CrearButton,
  ReunionesActivasContainer,
  ReunionesActivasTitle, ReunionesActivasWrapper, ReunionesContainer, EmpezarReunionContainer, RuthTitle,
} from './EmpezarReunion.styled';
import backend from '../api/backend';
import BotonParaIniciarReunion from './BotonParaIniciarReunion';
import {colors, ThemedTextfield} from "../styles/theme";
import {Button} from "../components/Button.styled";
import {ReunionActivas} from "./ReunionesActivas";
import {ExtensionLeyendaEmpresa, LeyendaEmpresa, Temas} from "../temario/Temario.styled";

class EmpezarReunion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tema: "",
      descripcion: "",
      mostrarFormulario: false,
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
          <ReunionesContainer>
            <EmpezarReunionContainer>
              <LeyendaEmpresa>10 Pines  <RuthTitle>Ruth</RuthTitle></LeyendaEmpresa>
              <ExtensionLeyendaEmpresa>Creative Software Development</ExtensionLeyendaEmpresa>

              <BotonParaIniciarReunion
                  disabled={true}
                  cargando={this.state.cargando}
                  handleEmpezarReunion={() => this.handleEmpezarReunion({reunionDeRoots: true})}
                  texto="Empezar Reunión de Root"
              />

              <BotonParaIniciarReunion
                  disabled={this.state.mostrarFormulario}
                  cargando={this.state.cargando}
                  handleEmpezarReunion={() => this.setState({mostrarFormulario: true })}
                  texto="Empezar Reunión rápida"/>
              {this.state.mostrarFormulario &&
              <FormContainer>
                <TextContainer>
                  <ThemedTextfield  value={this.state.tema} onChange={(event) => this.setState({tema: event.target.value})} multiline label="Tema propuesto"/>
                  <ThemedTextfield value={this.state.autor} onChange={(event) => this.setState({autor: event.target.value})} multiline label="Autor"/>
                  <ThemedTextfield value={this.state.descripcion} onChange={(event) => this.setState({descripcion: event.target.value})} multiline label="Descripcion"/>
                  <ThemedTextfield value={this.state.urlDePresentacion} onChange={(event) => this.setState({urlDePresentacion: event.target.value})} multiline label="Url de presentacion"/>
                </TextContainer>
                <BotonDeCreacionContainer>
                  <CancelButton
                      onClick={() => this.setState({mostrarFormulario: false,tema: "", descripcion: "",urlDePresentacion: ""})}
                  > Cancelar </CancelButton>

                  <CrearButton
                      onClick={() => this.handleEmpezarReunion({reunionDeRoots: false, tema: this.state.tema, descripcion: this.state.descripcion,urlDePresentacion : this.state.urlDePresentacion,autor: this.state.autor })}
                  > Crear </CrearButton>
                </BotonDeCreacionContainer>
              </FormContainer>
              }
            </EmpezarReunionContainer>
            <ReunionesActivasContainer>
              <ReunionesActivasTitle>Reuniones Abiertas</ReunionesActivasTitle>

              <ReunionesActivasWrapper>
                <ReunionActivas/>
              </ReunionesActivasWrapper>
            </ReunionesActivasContainer>
          </ReunionesContainer>
    );
  }
}

export default withRouter(EmpezarReunion);
