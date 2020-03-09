import React from 'react';
import {faCaretLeft, faCaretRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Botonera, BotoneraNavegacionTemas, VistaDelMedioContainer,} from './TemaActual.styled';
import InfoTema from '../temario/InfoTema';
import {Button} from '../components/Button.styled';
import {useSpring} from "react-spring";
import DescripcionTemaComun from "../temario/descripcion-tipo-tema/DescripcionTemaComun";
import DescripcionActionItems from "../temario/descripcion-tipo-tema/DescripcionActionItems";
import DescripcionPropuestaPinos from "../temario/descripcion-tipo-tema/DescripcionPropuestaPinos";

const tiposDeTema = {
  'conDescripcion': DescripcionTemaComun,
  'repasarActionItems':  DescripcionActionItems,
  'proponerPinos': DescripcionPropuestaPinos,
};

const TemaActual = ({tema, retrocederTema, temaATratar, empezarTema, avanzarTema, temaActivo, terminarTema}) => {
  const props = useSpring({opacity: 1, from: {opacity: 0}});
  const DescripcionDelTema  = tiposDeTema[tema.tipo];

  return (
    <VistaDelMedioContainer style={props}>
      <DescripcionDelTema tema={tema}/>
      <InfoTema tema={tema}/>
      <Botonera>
        <BotoneraNavegacionTemas>
          <FontAwesomeIcon
            icon={faCaretLeft}
            size="4x"
            cursor={'pointer'}
            onClick={retrocederTema}/>
          {!tema.inicio &&
          <Button disabled={!temaATratar} onClick={empezarTema}>Empezar Tema</Button>}
          {tema.inicio &&
          <Button disabled={!temaActivo} onClick={terminarTema}>Terminar Tema</Button>}
          <FontAwesomeIcon
            icon={faCaretRight}
            size="4x"
            onClick={avanzarTema}
            cursor={'pointer'}/>
        </BotoneraNavegacionTemas>
      </Botonera>
    </VistaDelMedioContainer>
  );
};
export default TemaActual;
