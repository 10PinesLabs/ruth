import React, { useState } from 'react';
import {ResumenInput,
    ContenedorResumen,
    TituloDeResumen,
    BotonesDeResumen,
    TextButton,
    ThemedButton} from './CreadorDeResumenOrador.styled'

export const CreadorDeResumenOrador = ({exposicion, onDiscard, onSave})=>{

    let [resumen, setResumen] = useState('')

    const TitleText = () => {
        if(exposicion){
            return `Editar resumen de la exposicion #${exposicion.index+1} de ${exposicion.orador}`
        }
        return 'Elige un participante para poder editar tu resumen'
    }

    const isButtonDisabled = () => {
        return exposicion==null
    }

    const onDiscardSummary = ()=>{
        setResumen('')
        onDiscard()
    }

    return(
        <ContenedorResumen key="container">
            <TituloDeResumen  disabled={isButtonDisabled()}>{TitleText()}</TituloDeResumen>
            <ResumenInput value={resumen} onChange={(e)=>setResumen(e.target.value)} disabled={isButtonDisabled()} rows={10}/>
            <BotonesDeResumen>
            <TextButton onClick={onDiscardSummary} disabled={isButtonDisabled()}>Descartar cambios</TextButton>
            <ThemedButton onClick={()=>onSave(resumen)} disabled={isButtonDisabled()}>Guardar</ThemedButton>
            </BotonesDeResumen>
        </ContenedorResumen>
    );
}