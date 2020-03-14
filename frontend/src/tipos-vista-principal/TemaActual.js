import React, { useState } from 'react';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Botonera, BotoneraNavegacionTemas, TemaActualContainer, VistaDelMedioContainer, } from './TemaActual.styled';
import InfoTema from '../temario/InfoTema';
import HandlerTipoTema from '../temario/handler-temas/HandlerTipoTema';
import { Button, SecondaryButton } from '../components/Button.styled';
import Countdown from '../reunion/Countdown';
import { TerminarTemaDialog } from "./Modal";
import Zoom from "@material-ui/core/Zoom";

function TemaActual(props) {
  const [ open, setOpen] = useState(false);
  const { tema } = props;
  return (
    <TemaActualContainer>
      <InfoTema tema={ tema }/>
      <VistaDelMedioContainer>
        { ( new HandlerTipoTema() ).handleTipoTema(tema) }
        <Botonera>
          <Countdown activo={ props.temaActivo }
                     segundos={ props.segundosRestantes }/>
          <BotoneraNavegacionTemas>
            <FontAwesomeIcon
              icon={ faCaretLeft }
              size="4x"
              cursor={ 'pointer' }
              onClick={ props.retrocederTema }/>
            { !props.tema.inicio &&
            <Button disabled={ !props.temaATratar } onClick={ props.empezarTema }>Empezar Tema</Button> }
            { props.tema.inicio &&
            <Zoom in style={{ transitionDelay: '100ms' }}><SecondaryButton disabled={ !props.temaActivo } onClick={ () => setOpen(true) }>Terminar Tema</SecondaryButton></Zoom> }
            <TerminarTemaDialog open={ open} onClose={ () => setOpen(false) } onConfirm={ props.terminarTema }/>
            <FontAwesomeIcon
              icon={ faCaretRight }
              size="4x"
              onClick={ props.avanzarTema }
              cursor={ 'pointer' }/>
          </BotoneraNavegacionTemas>
        </Botonera>
      </VistaDelMedioContainer>
    </TemaActualContainer>
  );
}

TemaActual.canHandleView = (view) => view === 'Tema Actual';

export default TemaActual;
