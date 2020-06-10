import React, { useState } from 'react';
import {SummaryInput,
    SummaryContainer,
    SummaryActionTitle,
    SummaryButtons,
    TextButton,
    ThemedButton} from './SummaryWriter.styled'

export const SummaryWriter = ({exposition, onDiscard, onSave})=>{

    let [minuta, setMinuta] = useState('')

    const TitleText = () => {
        if(exposition){
            return `Editar resumen de la exposicion #${exposition.index+1} de ${exposition.orador}`
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
        <SummaryActionTitle  disabled={isButtonDisabled()}>{TitleText()}</SummaryActionTitle>
        <SummaryInput value={minuta} onChange={(e)=>setMinuta(e.target.value)} disabled={isButtonDisabled()} rows={10}/>
        <SummaryButtons>
          <TextButton onClick={onDiscardMinuta} disabled={isButtonDisabled()}>Descartar cambios</TextButton>
          <ThemedButton onClick={()=>onSave(minuta)} disabled={isButtonDisabled()}>Guardar</ThemedButton>
        </SummaryButtons>
        </SummaryContainer>
    );
}