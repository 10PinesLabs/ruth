import {ConclusionForm, ConclusionTitle} from "./Minuta.styled";
import React from "react";
import {Box} from "@material-ui/core";
import {ThemedTextfield} from "../styles/theme";
import {BotonCancelar, BotonEnviar} from "./ActionItemEditor.styled";

export function ConclusionTema({ titulo, conclusion, onChange, onBorrar, onGuardar, estaEditandoConclusion }) {
  
  return <ConclusionForm>
    <ConclusionTitle>
      {titulo}
    </ConclusionTitle>

    <ThemedTextfield
      value={conclusion}
      label="Conclusiones generales de la reunion"
      multiline
      rows="10"
      variant="outlined"
      onChange={onChange}
    />

    {estaEditandoConclusion ? (
      <>
        <Box 
          display="flex"
          justifyContent="space-between"
          width={1}
        >
          <BotonCancelar onClick={onBorrar}>
            Cancelar
          </BotonCancelar>
          <BotonEnviar onClick={onGuardar}>
            Guardar
          </BotonEnviar>  
        </Box>
      </>
    ) : null}
  </ConclusionForm>;
}