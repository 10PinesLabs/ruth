import React from 'react';
import { Redirect } from 'react-router-dom';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  TemaActualContainer, VistaDelMedioContainer, Botonera,
  BotoneraNavegacionTemas, BotoneraCerrarReunion,
} from './TemaActual.styled';
import InfoTema from '../temario/InfoTema';
import HandlerTipoTema from '../temario/handler-temas/HandlerTipoTema';
import backend from '../api/backend';
import { Button } from '../components/Button.styled';
import Countdown from '../reunion/Countdown';

class TemaActual extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  static canHandleView = (view) => view === 'Tema Actual'

  handleCerrarReunion = () => {
    backend.cerrarReunion()
      .then(() => this.setState({ redirect: true }));
  }

  handleEmpezarTema = () => {
    this.props.empezarTema();
  }

  handleTerminarTema = () => {
    this.props.terminarTema();
  }

  render() {
    const { tema } = this.props;
    if (this.state.redirect) return <Redirect to="/" />;
    return (
      <TemaActualContainer>
        <InfoTema autor={tema.autor}
                  duracion={tema.cantidadDeMinutosDelTema}
                  obligatoriedad={tema.obligatoriedad}/>
        <VistaDelMedioContainer>
          {(new HandlerTipoTema()).handleTipoTema(tema)}
          <Botonera>
            <Countdown activo={this.props.temaActivo}
                        segundos={this.props.segundosRestantes}/>
            <BotoneraNavegacionTemas>
              <FontAwesomeIcon icon={faCaretLeft} size="4x"/>
              <Button onClick={this.handleEmpezarTema}>Empezar Tema</Button>
              <Button disabled={!this.props.temaActivo} onClick={this.handleTerminarTema}>Terminar Tema</Button>
              <FontAwesomeIcon icon={faCaretRight} size="4x"/>
            </BotoneraNavegacionTemas>
            <BotoneraCerrarReunion>
              <Button onClick={this.handleCerrarReunion}>Cerrar Reunión</Button>
            </BotoneraCerrarReunion>
          </Botonera>
        </VistaDelMedioContainer>
      </TemaActualContainer>
    );
  }
}

export default TemaActual;
