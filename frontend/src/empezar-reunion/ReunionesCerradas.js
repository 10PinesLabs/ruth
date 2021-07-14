import React, {useState} from "react";
import {StyledTableCell} from "../minuta/TablaOradores.styled";
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { faSlack } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonIcono, ButtonReunionCerrada, SecondaryButtonReunionCerrada } from '../components/Button.styled';
import { Reuniones } from './Reuniones';
import {ModalDeConfirmacion} from "../tipos-vista-principal/Modal";
import {InputEmailReenviarMinuta, TextContainerModalReenviarMail} from "./EmpezarReunion.styled";
import backend from '../api/backend';

const FilaReunion = ({ reunion, history }) => {
  const [mail, setMail] = useState('');

  const [open, setOpen] = useState(false);

  const handleClickVer = () => {
    history.push(`/${reunion.id}/presentador`);
  }

  const handleModalReenviarMailDeMinuta = () => {
    setOpen(!open);
  };

  const reenviarMailDeMinuta = () => {
    return backend.reenviarMailMinuta(mail, reunion.temas, reunion.id);
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


export const ReunionesCerradas = () => <>
 <Reuniones estaAbierta={false} columnas={['Nombre de reunion', 'Autor', 'Fecha', 'Acciones']} CallToActionButton={FilaReunion}/>
</>;
