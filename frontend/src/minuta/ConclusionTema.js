import {ConclusionForm, ConclusionTextarea, ConclusionTitle} from "./Minuta.styled";
import {Button, SecondaryButton} from "../components/Button.styled";
import React from "react";

export function ConclusionTema(props) {
  return <ConclusionForm>
    <ConclusionTitle>
      {props.descripcion}
    </ConclusionTitle>
    <ConclusionTextarea
      value={props.value}
      rows={6}
      placeholder={"Aqui va la conclusión general del tema..."}
      onChange={props.onChange}
    />

    {props.estaEditandoConclusion ? (
      <>
        <SecondaryButton type="button" onClick={props.onBorrar}>
          Borrar
        </SecondaryButton>
        <Button type="button" onClick={props.onGuardar}>
          Guardar
        </Button>
      </>
    ) : null}
  </ConclusionForm>;
}
