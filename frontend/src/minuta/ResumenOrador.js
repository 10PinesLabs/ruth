import React, { useState, useEffect } from 'react';
import {
    ContenedorResumen,
    BotonesDeResumen,
    TextButton,
    ThemedButton} from './ResumenOrador.styled'
import {ThemedTextfield} from "../styles/theme";

export const ResumenOrador = ({exposicion, onDiscard, onSave})=>{

    const [resumen, setResumen] = useState('')
    const [fueEditado, setFueEditado] = useState(false)

    useEffect(()=>{
        if(exposicion) setResumen(exposicion.resumen || "")
    }, [exposicion])

    const TitleText = () => {
        if(exposicion){
            return `#${exposicion.index+1} ${exposicion.orador}`
        }
        return 'Elige un participante para poder editar su resumen'
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
            <ThemedTextfield 
              value={resumen} 
              onChange={onValueChange} 
              disabled={isButtonDisabled()} 
              rows={10}
              label={TitleText()}
              multiline
              variant={"outlined"}
            />
            <BotonesDeResumen>
                <TextButton onClick={onDiscardSummary} disabled={isButtonDisabled()}>{fueEditado? "Descartar cambios" : "Cancelar"}</TextButton>
                <ThemedButton onClick={onGuardarResumen} disabled={isButtonDisabled()}>Guardar</ThemedButton>
            </BotonesDeResumen>
        </ContenedorResumen>
    );
}