import React from 'react';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  TemaActualContainer, VistaDelMedioContainer, Botonera,
  BotoneraNavegacionTemas, BotoneraCerrarReunion,
} from './TemaActual.styled';
import InfoTema from '../temario/InfoTema';
import HandlerTipoTema from '../temario/handler-temas/HandlerTipoTema';
import { Button, SecondaryButton } from '../components/Button.styled';
import Countdown from '../reunion/Countdown';

class TemaActual extends React.Component {
  static canHandleView = (view) => view === 'Tema Actual';

  render() {
    const { tema } = this.props;
    return (
      <TemaActualContainer>
        <InfoTema tema={tema} />
        <VistaDelMedioContainer>
          {(new HandlerTipoTema()).handleTipoTema(tema)}
          <Botonera>
            <Countdown activo={this.props.temaActivo}
                       segundos={this.props.segundosRestantes}/>
            <BotoneraNavegacionTemas>
              <FontAwesomeIcon
              icon={faCaretLeft}
              size="4x"
              cursor={'pointer'}
              onClick={this.props.retrocederTema}/>
              <Button disabled={this.props.tema.inicio || !this.props.temaATratar}
              onClick={this.props.empezarTema}>Empezar Tema</Button>
              <Button disabled={!this.props.temaActivo} onClick={this.props.terminarTema}>Terminar Tema</Button>
              <FontAwesomeIcon
              icon={faCaretRight}
              size="4x"
              onClick={this.props.avanzarTema}
              cursor={'pointer'}/>
            </BotoneraNavegacionTemas>
          </Botonera>
        </VistaDelMedioContainer>
      </TemaActualContainer>
    );
  }
}

export default TemaActual;
