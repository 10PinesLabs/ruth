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
  BotonDeCreacionContainer, CancelButton,
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
        <>

          <div style={{'display': "flex",    width: "100%",
            height: "100%"}}>
            <div style={{width: "27%","border-right": "1px solid silver",display:"flex",justifyContent: "flex-start", "flex-direction": "column","padding": "1em",backgroundColor: "#68c9b2"}}>
              <LeyendaEmpresa>10 Pines</LeyendaEmpresa>
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
              <>
                <TextContainer>
                  <ThemedTextfield value={this.state.tema} onChange={(event) => this.setState({tema: event.target.value})} multiline label="Tema propuesto"/>
                  <ThemedTextfield value={this.state.autor} onChange={(event) => this.setState({autor: event.target.value})} multiline label="Autor"/>
                  <ThemedTextfield value={this.state.descripcion} onChange={(event) => this.setState({descripcion: event.target.value})} multiline label="Descripcion"/>
                  <ThemedTextfield value={this.state.urlDePresentacion} onChange={(event) => this.setState({urlDePresentacion: event.target.value})} multiline label="Url de presentacion"/>
                </TextContainer>
                <BotonDeCreacionContainer>
                  <CancelButton
                      onClick={() => this.setState({mostrarFormulario: false,tema: "", descripcion: "",urlDePresentacion: ""})}
                  > Cancelar </CancelButton>

                  <Button
                      onClick={() => this.handleEmpezarReunion({reunionDeRoots: false, tema: this.state.tema, descripcion: this.state.descripcion,urlDePresentacion : this.state.urlDePresentacion,autor: this.state.autor })}
                  > Crear </Button>
                </BotonDeCreacionContainer>
              </>
              }
            </div>
            <div style={{width: "70%",padding: "1em"}}>
              <h2>Reuniones Abiertas</h2>

              <div style={{height: "100%",overflowY: "scroll"}}>
                <ReunionActivas/>
              </div>
            </div>
          </div>

        </>
    );
  }
}

export default withRouter(EmpezarReunion);
