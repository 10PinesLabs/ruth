import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { faSlack } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { StyledTableCell } from '../minuta/TablaOradores.styled';
import { ButtonIcono, ButtonReunionCerrada, SecondaryButtonReunionCerrada } from '../components/Button.styled';
import { Reuniones } from './Reuniones';
import { ModalDeConfirmacion } from '../tipos-vista-principal/Modal';
import { InputEmailReenviarMinuta, ParrafoMail, TextContainerModalReenviarMail } from './EmpezarReunion.styled';
import backend from '../api/backend';
import createStore from '../store';
import { reunionEventos } from '../store/reunion';

const FilaReunion = ({ reunion, history }) => {
  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClickVer = () => {
    history.push(`/${reunion.id}/presentador`);
  };

  const handleModalReenviarMailDeMinuta = () => {
    setOpen(!open);
  };

  const reenviarMailDeMinuta = async () => {
    if (email === '') {
      toast.error('No se puede reenviar el mail de minuta a un email vacio');
    } else if (emailRegex.test(email)) {
    // crear el store
      const store = createStore();
      // conseguir los eventos que ya pasaron para esa reunion
      const { eventos } = await backend.obtenerEventos(reunion.id);
      // aplicar esos eventos al store
      store.dispatch(reunionEventos.comenzarReunion(reunion));
      eventos.forEach((evento) => store.dispatch({ ...evento.evento, isAlreadyPublished: true }));
      // conseguir lo que necesitemos del store
      const state = store.getState();

      backend.reenviarMailMinuta(email, state.reunion.temas, state.reunion.id).then(toast.success(`Mail de minuta enviado a ${email}`));
    }
  };

  function handleOnClose() {
    if (!emailRegex.test(email) && emailValid === false && email !== '') {
      toast.error('Email inválido, no se ha podido enviar el mail');
    }
    setEmail('');
    setOpen(false);
    setEmailValid(true);
  }

  function handleOnChange(value) {
    const isValid = emailRegex.test(value);
    setEmailValid(isValid);
    setEmail(value);
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
    <ModalDeConfirmacion title={'Reenviar mail de minuta'}
                         open={open}
                         onClose={handleOnClose}
                         onConfirm={reenviarMailDeMinuta}
    >
      <TextContainerModalReenviarMail>
        <InputEmailReenviarMinuta value={email} type="email" onChange={(event) => handleOnChange(event.target.value)} multiline label="Email"/>
      </TextContainerModalReenviarMail>
      {
        !emailValid && <ParrafoMail>El email es inválido</ParrafoMail>
      }
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
