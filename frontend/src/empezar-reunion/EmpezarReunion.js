import React from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  TextContainer,
  BotonDeCreacionContainer,
  CancelButton,
  FormContainer,
  CrearButton,
  ReunionesActivasContainer,
  ReunionesContainer, EmpezarReunionContainer, RuthTitle,
} from './EmpezarReunion.styled';
import backend from '../api/backend';
import BotonParaIniciarReunion from './BotonParaIniciarReunion';
import {ThemedTextfield} from "../styles/theme";
import {ExtensionLeyendaEmpresa, LeyendaEmpresa} from "../temario/Temario.styled";
import ReunionesTabs from "./Tab";

class EmpezarReunion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tema: "",
      descripcion: "",
      autor: "",
      mostrarFormulario: false,
      urlDePresentacion: "",
      nombre: "",
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
                  <ThemedTextfield required value={this.state.nombre} onChange={(event) => this.setState({nombre: event.target.value})} multiline label="Nombre de Reunion"/>
                  <ThemedTextfield required value={this.state.tema} onChange={(event) => this.setState({tema: event.target.value})} multiline label="Tema propuesto"/>
                  <ThemedTextfield required value={this.state.autor} onChange={(event) => this.setState({autor: event.target.value})} multiline label="Autor"/>
                  <ThemedTextfield value={this.state.descripcion} onChange={(event) => this.setState({descripcion: event.target.value})} multiline label="Descripcion"/>
                  <ThemedTextfield value={this.state.urlDePresentacion} onChange={(event) => this.setState({urlDePresentacion: event.target.value})} multiline label="Url de presentacion"/>
                </TextContainer>
                <BotonDeCreacionContainer>
                  <CancelButton
                      onClick={() => this.setState({mostrarFormulario: false,tema: "", descripcion: "",urlDePresentacion: ""})}
                  > Cancelar </CancelButton>

                  <CrearButton
                      onClick={() => this.handleEmpezarReunion({reunionDeRoots: false, tema: this.state.tema, descripcion: this.state.descripcion,urlDePresentacion : this.state.urlDePresentacion,autor: this.state.autor,nombre: this.state.nombre })}
                  > Crear </CrearButton>
                </BotonDeCreacionContainer>
              </FormContainer>
              }
            </EmpezarReunionContainer>
            <ReunionesActivasContainer>
              <ReunionesTabs/>
            </ReunionesActivasContainer>
          </ReunionesContainer>
    );
  }
}
export default withRouter(EmpezarReunion);
