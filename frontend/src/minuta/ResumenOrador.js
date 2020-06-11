import React, { useState } from 'react';
import {ResumenInput,
    ContenedorResumen,
    TituloDeResumen,
    BotonesDeResumen,
    TextButton,
    ThemedButton} from './ResumenOrador.styled'

export const ResumenOrador = ({exposicion, onDiscard, onSave})=>{

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
        onDiscard()
        setResumen('')
    }

    const onGuardarResumen = ()=>{
        onSave(resumen)
        setResumen('')
    }

    return(
        <ContenedorResumen key="container">
            <TituloDeResumen  disabled={isButtonDisabled()}>{TitleText()}</TituloDeResumen>
            <ResumenInput value={resumen} onChange={(e)=>setResumen(e.target.value)} disabled={isButtonDisabled()} rows={10}/>
            <BotonesDeResumen>
            <TextButton onClick={onDiscardSummary} disabled={isButtonDisabled()}>Descartar cambios</TextButton>
            <ThemedButton onClick={onGuardarResumen} disabled={isButtonDisabled()}>Guardar</ThemedButton>
            </BotonesDeResumen>
        </ContenedorResumen>
    );
}