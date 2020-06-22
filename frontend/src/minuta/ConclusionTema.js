import {ConclusionForm, ConclusionTextarea, ConclusionTitle} from "./Minuta.styled";
import {Button, SecondaryButton} from "../components/Button.styled";
import React from "react";

export function ConclusionTema({ titulo, conclusion, onChange, onBorrar, onGuardar, estaEditandoConclusion }) {
  return <ConclusionForm>
    <ConclusionTitle>
      {titulo}
    </ConclusionTitle>
    <ConclusionTextarea
      value={conclusion}
      rows={6}
      placeholder={"Aqui va la conclusión general del tema..."}
      onChange={onChange}
    />

    {estaEditandoConclusion ? (
      <>
        <SecondaryButton type="button" onClick={onBorrar}>
          Borrar
        </SecondaryButton>
        <Button type="button" onClick={onGuardar}>
          Guardar
        </Button>
      </>
    ) : null}
  </ConclusionForm>;
}
