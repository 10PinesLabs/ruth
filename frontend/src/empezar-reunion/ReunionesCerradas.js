import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { faSlack } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { configureStore } from '@reduxjs/toolkit';
import { StyledTableCell } from '../minuta/TablaOradores.styled';
import { ButtonIcono, ButtonReunionCerrada, SecondaryButtonReunionCerrada } from '../components/Button.styled';
import { Reuniones } from './Reuniones';
import { ModalDeConfirmacion } from '../tipos-vista-principal/Modal';
import { InputEmailReenviarMinuta, TextContainerModalReenviarMail } from './EmpezarReunion.styled';
import backend from '../api/backend';
import createStore from '../store';
import { reunionEventos } from '../store/reunion';

const FilaReunion = ({ reunion, history }) => {
  const [mail, setMail] = useState('');

  const [open, setOpen] = useState(false);

  const handleClickVer = () => {
    history.push(`/${reunion.id}/presentador`);
  }

  const handleModalReenviarMailDeMinuta = () => {
    setOpen(!open);
  };

  const reenviarMailDeMinuta = async () => {
    // crear el store
    const store = createStore();
    // conseguir los eventos que ya pasaron para esa reunion
    const { eventos } = await backend.obtenerEventos(reunion.id);
    // aplicar esos eventos al store
    store.dispatch(reunionEventos.comenzarReunion(reunion)); // TODO deuda tecnica refactor, rename?
    eventos.forEach((evento) => store.dispatch({ ...evento.evento, comesFromWS: true })); // TODO cambiar comesFromWS
    // conseguir lo que necesitemos del store
    const state = store.getState();

    backend.reenviarMailMinuta(mail, state.reunion.temas, state.reunion.id);
  };

  function handleOnClose() {
    setMail('');
    setOpen(false);
  }

  return <StyledTableCell>
    <ButtonReunionCerrada onClick={handleClickVer}>
      Ver
    </ButtonReunionCerrada>
    <SecondaryButtonReunionCerrada>
      Ver Minuta
    </SecondaryButtonReunionCerrada>
    <Tooltip title={<Typography color="inherit">Reenviar mail de minuta</Typography>} onClick={handleModalReenviarMailDeMinuta}>
      <ButtonIcono>
        <FontAwesomeIcon icon={faEnvelope}/>
      </ButtonIcono>
    </Tooltip>
    <ModalDeConfirmacion title={"Reenviar mail de minuta"}
                         open={open}
                         onClose={handleOnClose}
                         onConfirm={reenviarMailDeMinuta}
    >
      <TextContainerModalReenviarMail>
        <InputEmailReenviarMinuta value={mail} type="email" onChange={(event) => setMail(event.target.value)} multiline label="Mail"/>
      </TextContainerModalReenviarMail>
    </ModalDeConfirmacion>
    <Tooltip title={<Typography color="inherit">Reenviar recordatorios de slack</Typography>}>
      <ButtonIcono>
        <FontAwesomeIcon icon={faSlack}/>
      </ButtonIcono>
    </Tooltip>
  </StyledTableCell>;
};

const ReunionesCerradas = () => <>
 <Reuniones estaAbierta={false} columnas={['Nombre de reunion', 'Autor', 'Fecha', 'Acciones']} CallToActionButton={FilaReunion}/>
</>;

export default ReunionesCerradas;