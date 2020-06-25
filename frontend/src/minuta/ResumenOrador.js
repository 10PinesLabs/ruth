import React, { useState, useEffect } from 'react';
import {ResumenInput,
    ContenedorResumen,
    TituloDeResumen,
    BotonesDeResumen,
    TextButton,
    ThemedButton} from './ResumenOrador.styled'

export const ResumenOrador = ({exposicion, onDiscard, onSave})=>{

    const [resumen, setResumen] = useState('')
    const [fueEditado, setFueEditado] = useState(false)

    useEffect(()=>{
        if(exposicion) setResumen(exposicion.resumen || "")
    }, [exposicion])

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
        setFueEditado(false)
    }

    const onGuardarResumen = ()=>{
        onSave(resumen)
        setResumen('')
        setFueEditado(false)
    }

    const onValueChange = (e)=> {
        setResumen(e.target.value)
        setFueEditado(true)
    };
    return(
        <ContenedorResumen key="container">
            <TituloDeResumen  disabled={isButtonDisabled()}>{TitleText()}</TituloDeResumen>
            <ResumenInput value={resumen} onChange={onValueChange} disabled={isButtonDisabled()} rows={10}/>
            <BotonesDeResumen>
            <TextButton onClick={onDiscardSummary} disabled={isButtonDisabled()}>{fueEditado? "Descartar cambios" : "Cancelar"}</TextButton>
            <ThemedButton onClick={onGuardarResumen} disabled={isButtonDisabled()}>Guardar</ThemedButton>
            </BotonesDeResumen>
        </ContenedorResumen>
    );
}