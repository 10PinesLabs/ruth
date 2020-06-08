import React from 'react';
import {TextButton} from '../components/TextButton'
import styled from 'styled-components'
import { colors, font} from '../styles/theme';
import OButton from '@material-ui/core/Button';

export const MinutaWriter = ()=>{

    const MinutaContainer = styled.div`
    display:flex;
    flex-direction: column;
    `

    const MinutaActionTitle = styled.span`
    color: ${colors.black40};
    font-weight: 700;
    `

    const MinutaButtons = styled.div`
    display:flex;
    width:100%;
    justify-content: space-between;
    `

    return(
        <MinutaContainer>
        <MinutaActionTitle>Hablando pino</MinutaActionTitle>
        <textarea/>
        <MinutaButtons>
          <TextButton>Descartar cambios</TextButton>
          <OButton  variant="contained" color={colors.primary} disableElevation>Guardar</OButton>
        </MinutaButtons>
        </MinutaContainer>
    );
}