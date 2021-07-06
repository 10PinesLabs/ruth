import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { faSlack } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledTableCell } from '../minuta/TablaOradores.styled';
import { ButtonIcono, ButtonReunionCerrada, SecondaryButtonReunionCerrada } from '../components/Button.styled';
import { Reuniones } from './Reuniones';

    const onClick = () => {
        history.push(`/${reunion.id}/ver`);
    }

    const FilaReunion = () => <StyledTableCell>
            <ButtonReunionCerrada onClick={onClick}>
                Ver
            </ButtonReunionCerrada>
            <SecondaryButtonReunionCerrada>
                Ver Minuta
            </SecondaryButtonReunionCerrada>
            <Tooltip title={<Typography color="inherit">Reenviar mail de minuta</Typography>}>
                <ButtonIcono>
                    <FontAwesomeIcon icon={faEnvelope}/>
                </ButtonIcono>
            </Tooltip>
            <Tooltip title={<Typography color="inherit">Reenviar recordatorios de slack</Typography>}>
                <ButtonIcono>
                    <FontAwesomeIcon icon={faSlack}/>
                </ButtonIcono>
            </Tooltip>
        </StyledTableCell>;


export const ReunionesCerradas = () => <>
        <Reuniones estaAbierta={false} columnas={['Nombre de reunion', 'Autor', 'Fecha', 'Acciones']} CallToActionButton={FilaReunion}/>
</>;
