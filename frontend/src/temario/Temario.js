import React, {useState} from 'react';
import {
  Arrow, TemarioContainer, Temas, Titulo, LeyendaEmpresa, ExtensionLeyendaEmpresa, ContenidoTemario,
} from './Temario.styled';
import ListaTemario from './ListaTemario';
import {SecondaryButton} from "../components/Button.styled";
import {useHistory} from "react-router-dom";

const Temario = (props)=> {

    const history = useHistory();
    const [isActive, setActive] = useState(false);

    return (
      <TemarioContainer isActive={isActive}
                        onMouseEnter={() => setActive(true)}
                        onMouseLeave={() => setActive(false)}>
      <Temas>
        <LeyendaEmpresa>10 Pines</LeyendaEmpresa>
        <ExtensionLeyendaEmpresa>Creative Software Development</ExtensionLeyendaEmpresa>
        <ContenidoTemario>
          <Titulo> Temario </Titulo>
          <ListaTemario temas = {props.temas}
                        temaActual={props.temaActual}
                        seleccionarTema = {props.seleccionarTema}/>
          <SecondaryButton style={{ marginBottom: '2rem', marginTop: 'auto', padding: '0.5em 0',  height: '3em' }}
                           onClick={props.cerrarReunion}
                           disabled={!props.reunionAbierta}
                           >Cerrar Reunión</SecondaryButton>
          <SecondaryButton style={{ marginBottom: '2rem', marginTop: 'auto', padding: '0.5em 0',  height: '3em' }}
                           onClick={() => history.push('/')}
          >Volver al lobby</SecondaryButton>
        </ContenidoTemario>
        <Arrow src="/pino-blanco.svg"
               onMouseEnter={() => setActive(true)} />
      </Temas>
      </TemarioContainer>
    );
}

export default Temario;
