import React, {useState} from 'react';
import {faCaretLeft, faCaretRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Botonera, BotoneraNavegacionTemas, VistaDelMedioContainer,} from './Resumen.styled';
import InfoTema from '../temario/InfoTema';
import {Button, SecondaryButton} from '../components/Button.styled';
import {useSpring} from "react-spring";
import DescripcionTemaComun from "../temario/descripcion-tipo-tema/DescripcionTemaComun";
import DescripcionActionItems from "../temario/descripcion-tipo-tema/DescripcionActionItems";
import DescripcionPropuestaPinos from "../temario/descripcion-tipo-tema/DescripcionPropuestaPinos";
import {ModalDeConfirmacion} from "./Modal";
import Zoom from "@material-ui/core/Zoom";

const tiposDeTema = {
  'conDescripcion': DescripcionTemaComun,
  'repasarActionItems': DescripcionActionItems,
  'proponerPinos': DescripcionPropuestaPinos,
};

const Resumen = ({tema, retrocederTema, temaATratar, empezarTema, avanzarTema, temaActivo, terminarTema}) => {
  const props = useSpring({opacity: 1, from: {opacity: 0}});
  const DescripcionDelTema = tiposDeTema[tema.tipo];
  const [open, setOpen] = useState(false);

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
          <Zoom in style={{transitionDelay: '100ms'}}>
            <SecondaryButton disabled={!temaActivo} onClick={() => setOpen(true)}>
              Terminar Tema
            </SecondaryButton>
          </Zoom>
          }
          <ModalDeConfirmacion title={"Terminar Tema"} open={open} onClose={() => setOpen(false)} onConfirm={terminarTema}/>

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
export default Resumen;
