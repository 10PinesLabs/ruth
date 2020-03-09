import React from 'react';
import {faCaretLeft, faCaretRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Botonera, BotoneraNavegacionTemas, TemaActualContainer, VistaDelMedioContainer,} from './TemaActual.styled';
import InfoTema from '../temario/InfoTema';
import HandlerTipoTema from '../temario/handler-temas/HandlerTipoTema';
import {Button} from '../components/Button.styled';

class TemaActual extends React.Component {
  static canHandleView = (view) => view === 'Tema Actual';

  render() {
    const {tema} = this.props;
    return (
      <VistaDelMedioContainer>
        {(new HandlerTipoTema()).handleTipoTema(tema)}
        <InfoTema tema={tema}/>
        <Botonera>
          <BotoneraNavegacionTemas>
            <FontAwesomeIcon
              icon={faCaretLeft}
              size="4x"
              cursor={'pointer'}
              onClick={this.props.retrocederTema}/>
            {!this.props.tema.inicio &&
            <Button disabled={!this.props.temaATratar} onClick={this.props.empezarTema}>Empezar Tema</Button>}
            {this.props.tema.inicio &&
            <Button disabled={!this.props.temaActivo} onClick={this.props.terminarTema}>Terminar Tema</Button>}
            <FontAwesomeIcon
              icon={faCaretRight}
              size="4x"
              onClick={this.props.avanzarTema}
              cursor={'pointer'}/>
          </BotoneraNavegacionTemas>
        </Botonera>
      </VistaDelMedioContainer>
    );
  }
}

export default TemaActual;
