import React, { useState } from 'react';
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles';
import { colors, font} from '../styles/theme';
import Button from '@material-ui/core/Button';

const MinutaInput = styled.textarea`
width:100%;
resize:vertical;
`

const MinutaContainer = styled.div`
display:flex;
flex-direction: column;
margin-top:15px;
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

export const MinutaWriter = ({exposition, onDiscard, onSave})=>{

    let [minuta, setMinuta] = useState('')

    const TitleText = () => {
        if(exposition){
            return `Editar resumen de la exposicion #${exposition.number+1} de ${exposition.speaker}`
        }
        return 'Elige un participante para poder editar tu resumen'
    }

    const isButtonDisabled = () => {
        return exposition==null
    }

    const resetSummaryInput = () => {
        setMinuta('')
    }

    const onDiscardMinuta = ()=>{
        onDiscard()
        resetSummaryInput();
    }

    const onSaveSummary = () => {
        onSave(minuta)
        resetSummaryInput();
    }

    return(
        <MinutaContainer key="container">
        <MinutaActionTitle>{TitleText()}</MinutaActionTitle>
        <MinutaInput value={minuta} onChange={(e)=>setMinuta(e.target.value)} disabled={isButtonDisabled()} rows={10}/>
        <MinutaButtons>
          <TextButton onClick={onDiscardMinuta} disabled={isButtonDisabled()}>Descartar cambios</TextButton>
          <ThemedButton onClick={onSaveSummary} disabled={isButtonDisabled()}>Guardar</ThemedButton>
        </MinutaButtons>
        </MinutaContainer>
    );
}