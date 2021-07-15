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
import CustomTooltip from "../styles/CustomTooltip";

const tiposDeTema = {
    'conDescripcion': DescripcionTemaComun,
    'repasarActionItems': DescripcionActionItems,
    'proponerPinos': DescripcionPropuestaPinos,
};


const Resumen = ({ tema, retrocederTema, empezarTema, avanzarTema, temaActivo, terminarTema, reabrirTema, reunionAbierta }) => {
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
              <CustomTooltip title='Reunion cerrada' disable={!reunionAbierta}>
                <Button onClick={empezarTema} disabled={!reunionAbierta} style={!reunionAbierta ? {pointerEvents: "none"} : {}}>Empezar Tema</Button>
              </CustomTooltip>
            }
            {tema.inicio &&
              <Zoom in style={{transitionDelay: '100ms'}}>
                <CustomTooltip title='Reunion cerrada' disable={!reunionAbierta}>
                  <SecondaryButton onClick={() => temaActivo ? setOpen(true) : reabrirTema()}
                                   disabled={!reunionAbierta}
                                   style={!reunionAbierta ? {pointerEvents: "none"} : {}}>
                            {temaActivo ? 'Terminar Tema' : 'Reabrir tema'}
                  </SecondaryButton>
                </CustomTooltip>

              </Zoom>
            }
            <ModalDeConfirmacion title={"Terminar Tema"} open={open} onClose={() => setOpen(false)}
                                     onConfirm={terminarTema}/>
            <FontAwesomeIcon icon={faCaretRight} size="4x" onClick={avanzarTema} cursor={'pointer'}/>
        </BotoneraNavegacionTemas>
      </Botonera>
    </VistaDelMedioContainer>
    );
};
export default Resumen;
