import React from 'react';
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles';

import { colors, font} from '../styles/theme';

import Button from '@material-ui/core/Button';

export const MinutaWriter = ()=>{

    const MinutaContainer = styled.div`
    display:flex;
    flex-direction: column;
    width:60%;
    `

    const MinutaActionTitle = styled.span`
    color: ${colors.black40};
    font-weight: 700;
    `

    const MinutaButtons = styled.div`
    display:flex;
    width:100%;
    justify-content: space-between;
    margin-top: 15px;
    `

    const TextButton = withStyles({
        root:{
            color: colors.primary,
            fontFamily: font.family,
            fontWeight:600
        },
        label:{
            textTransform:"none"    
        }
        })(Button);

    const ThemedButton = withStyles({
        root:{
            color: colors.white,
            background:colors.primary,
            fontFamily: font.family,
            fontWeight:600,
            '&:hover': {
                background: colors.primaryConstrast,
             },
        },
        label:{
            textTransform:"none"    
        },
        
        })(Button);

    const MinutaInput = styled.textarea`
        width:100%;
        resize:vertical;
        `
        
    return(
        <MinutaContainer>
        <MinutaActionTitle>Elige un participante para poder editar tu resumen</MinutaActionTitle>
        <MinutaInput rows={10}/>
        <MinutaButtons>
          <TextButton>Descartar cambios</TextButton>
          <ThemedButton  disableElevation="true">Guardar</ThemedButton>
        </MinutaButtons>
        </MinutaContainer>
    );
}