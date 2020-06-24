import {ConclusionForm, ConclusionTitle} from "./Minuta.styled";
import {Button, SecondaryButton} from "../components/Button.styled";
import React from "react";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core";
import {colors} from "../styles/theme";
import Box from "@material-ui/core/Box";
import {BotonCancelar, BotonSubmit} from "./ActionItemEditor.styled";

export function ConclusionTema({ titulo, conclusion, onChange, onBorrar, onGuardar, estaEditandoConclusion }) {
  
  return <ConclusionForm>
    <ConclusionTitle>
      {titulo}
    </ConclusionTitle>

    <CustomTextfield
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
          <BotonSubmit onClick={onGuardar}>
            Guardar
          </BotonSubmit>  
        </Box>
      </>
    ) : null}
  </ConclusionForm>;
}

const CustomTextfield = withStyles({
  root: {
    width: "100%",
    '& label.Mui-focused': {
      color: `${colors.primary} !important`,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: colors.primary,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: colors.black50,
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.primary,
      },
    },
  },
})(TextField);