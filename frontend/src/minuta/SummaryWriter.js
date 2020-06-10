import React, { useState } from 'react';
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles';
import { colors, font} from '../styles/theme';
import Button from '@material-ui/core/Button';

const SummaryInput = styled.textarea`
width:100%;
resize:vertical;
`

const SummaryContainer = styled.div`
display:flex;
flex-direction: column;
margin-top:15px;
`

const SummaryActionTitle = styled.span`
color: ${colors.black40};
font-weight: 700;
`

const SummaryButtons = styled.div`
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

export const SummaryWriter = ({exposition, onDiscard, onSave})=>{

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

    const onDiscardMinuta = ()=>{
        setMinuta('')
        onDiscard()
    }

    return(
        <SummaryContainer key="container">
        <SummaryActionTitle>{TitleText()}</SummaryActionTitle>
        <SummaryInput value={minuta} onChange={(e)=>setMinuta(e.target.value)} disabled={isButtonDisabled()} rows={10}/>
        <SummaryButtons>
          <TextButton onClick={onDiscardMinuta} disabled={isButtonDisabled()}>Descartar cambios</TextButton>
          <ThemedButton onClick={()=>onSave(minuta)} disabled={isButtonDisabled()}>Guardar</ThemedButton>
        </SummaryButtons>
        </SummaryContainer>
    );
}