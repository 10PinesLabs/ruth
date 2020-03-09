import React from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../sidebar-reunion/Sidebar';
import { ReunionContainer } from './Reunion.styled';
import TemaActual from '../tipos-vista-principal/TemaActual';
import Presentacion from '../tipos-vista-principal/Presentacion';
import Debate from '../tipos-vista-principal/Debate';
import Temario from '../temario/Temario';
import Header from "./Header";

class VistaTemas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedElement: 'Tema Actual',
      indiceTemaAMostrar: this.indiceTemaATratar(),
    };
  }

  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) {
      this.setState({
        indiceTemaAMostrar: this.indiceTemaATratar(),
      });
    }
  }

  vistas = [TemaActual, Presentacion, Debate]

  obtenerVista = () => this.vistas.find((vista) => vista.canHandleView(this.state.selectedElement))

  empezarTema = () => {
    if (this.temaSeleccionado().inicio !== null) {
      return toast.error('No se puede iniciar un tema que ya fue iniciado');
    }
    if (this.state.indiceTemaAMostrar !== this.indiceTemaATratar()) {
      return toast.error('Existe otro tema para tratar');
    }
    return this.props.actualizarTema({
      id: this.temaSeleccionado().id,
      inicio: Date.now(),
      fin: null,
    });
  }

  terminarTema = () => {
    this.props.actualizarTema({
      id: this.temaSeleccionado().id,
      inicio: this.temaSeleccionado().inicio,
      fin: Date.now(),
    });
    toast.success('Tema finalizado');
  }

  handleCerrarReunion = () => {
    if (this.temaActivo()) {
      this.terminarTema();
    }
    this.props.cerrarReunion();
  }

  handleSelection = (name) => {
    this.setState({
      selectedElement: name,
    });
  }

  temaSeleccionado() {
    return this.props.temas[this.state.indiceTemaAMostrar];
  }

  seleccionarTema = (temaSeleccionado) => {
    const index = this.props.temas.findIndex((tema) => tema === temaSeleccionado);
    this.setState({ indiceTemaAMostrar: index, selectedElement: 'Tema Actual' });
  }

  avanzarTema = () => {
    if (this.state.indiceTemaAMostrar !== this.props.temas.length - 1) {
      this.setState({ indiceTemaAMostrar: this.state.indiceTemaAMostrar + 1 });
    }
  }

  retrocederTema = () => {
    if (this.state.indiceTemaAMostrar !== 0) {
      this.setState({ indiceTemaAMostrar: this.state.indiceTemaAMostrar - 1 });
    }
  }

  ultimoTema = () => this.indiceTemaATratar() === this.props.temas.length - 1

  indiceTemaATratar() {
    const indiceTemaSinFinalizar = this.props.temas.findIndex((tema) => tema.fin === null);
    const ultimoTema = this.props.temas.length - 1;
    return indiceTemaSinFinalizar >= 0 ? indiceTemaSinFinalizar : ultimoTema;
  }

  esElSiguienteTemaATratar = () => this.state.indiceTemaAMostrar === this.indiceTemaATratar()

  segundosRestantes = () => {
    const { inicio, fin, cantidadDeMinutosDelTema } = this.temaSeleccionado();
    if (inicio === null) {
      return cantidadDeMinutosDelTema * 60;
    }
    const tiempo = fin === null ? Date.now() : Date.parse(fin);
    return Math.round(cantidadDeMinutosDelTema * 60
        - (tiempo - Date.parse(inicio)) / 1000);
  }

  temaActivo = () => {
    const { inicio, fin } = this.temaSeleccionado();
    return inicio !== null && fin === null;
  }

  render() {
    const VistaSeleccionada = this.obtenerVista();
    return (
          <ReunionContainer>
            <Temario temas={this.props.temas}
              seleccionarTema={this.seleccionarTema}
              cerrarReunion={this.handleCerrarReunion}
              temaActual={this.temaSeleccionado()}
            />
            <Header titulo={this.temaSeleccionado().titulo}
                    segundosRestantes={this.segundosRestantes()}
                    temaActivo={this.temaActivo()}
            />
            <VistaSeleccionada tema={this.temaSeleccionado()}
              terminarTema={this.terminarTema}
              empezarTema={this.empezarTema}
              temaActivo= {this.temaActivo()}
              avanzarTema= {this.avanzarTema}
              retrocederTema= {this.retrocederTema}
              temaATratar= {this.esElSiguienteTemaATratar()}
              handleCerrarReunion= {this.handleCerrarReunion} />
            <Sidebar handleSelection={this.handleSelection}
              selectedElement={this.state.selectedElement}
              link={this.temaSeleccionado().linkDePresentacion} />
          </ReunionContainer>
    );
  }
}

export default VistaTemas;
