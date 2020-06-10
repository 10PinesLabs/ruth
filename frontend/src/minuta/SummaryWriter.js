import React, { useState } from 'react';
import {SummaryInput,
    SummaryContainer,
    SummaryActionTitle,
    SummaryButtons,
    TextButton,
    ThemedButton} from './SummaryWriter.styled'

export const SummaryWriter = ({exposition, onDiscard, onSave})=>{

    let [summary, setSummary] = useState('')

    const TitleText = () => {
        if(exposition){
            return `Editar resumen de la exposicion #${exposition.index+1} de ${exposition.orador}`
        }
        return 'Elige un participante para poder editar tu resumen'
    }

    const isButtonDisabled = () => {
        return exposition==null
    }

    const onDiscardSummary = ()=>{
        setSummary('')
        onDiscard()
    }

    return(
        <SummaryContainer key="container">
        <SummaryActionTitle  disabled={isButtonDisabled()}>{TitleText()}</SummaryActionTitle>
        <SummaryInput value={summary} onChange={(e)=>setSummary(e.target.value)} disabled={isButtonDisabled()} rows={10}/>
        <SummaryButtons>
          <TextButton onClick={onDiscardSummary} disabled={isButtonDisabled()}>Descartar cambios</TextButton>
          <ThemedButton onClick={()=>onSave(summary)} disabled={isButtonDisabled()}>Guardar</ThemedButton>
        </SummaryButtons>
        </SummaryContainer>
    );
}