import React, { useState, useEffect } from "react";
import { VistaDelMedioContainer } from "./Resumen.styled";
import { useSpring } from "react-spring";
import { connect } from "react-redux";
import { tipoDeEvento } from "../store/conclusion";
import { toast } from "react-toastify";
import {Button, SecondaryButton} from '../components/Button.styled';

const Minuta = ({ dispatch, tema, temaActivo }) => {
  let [conclusion, setConclusion] = useState(tema.conclusion);
  let [isEditingConclusion, setIsEditingConclusion] = useState(false)

  const dispatchMinuta = (data) => {
    console.log(tema);
    const evento = {
      autor: "MINUTEADOR",
      fecha: Date.now(),
      idTema: tema.id,
      data,
    };
    console.log(evento);
    dispatch(evento);
  };


  function actualizarConclusion() {
    if(!tema.id){
      toast.error("No hay tema seleccionado")
      conclusion = "";
      return
    }
    setIsEditingConclusion(false)
    dispatchMinuta({
      tipo: tipoDeEvento.GUARDAR_CONCLUSION,
      conclusion: conclusion,
    });
  }

  function resetearConclusion(){
    console.log("resetear")
    setConclusion(tema.conclusion)
    setIsEditingConclusion(false)
  }

  function userChangedConclusionInput(inputValue){
    setConclusion(inputValue)
    setIsEditingConclusion(true)
  }

  return (
    <VistaDelMedioContainer
      style={useSpring({ opacity: 1, from: { opacity: 0 } })}
    >
      Proximamente!
      <form>
        <textarea
          value={conclusion}
          onChange={(event) => {userChangedConclusionInput(event.target.value)}}
        ></textarea>

        { isEditingConclusion ? 
        <div>
          <SecondaryButton type="button" onClick={() => resetearConclusion()}>
            Borrar
          </SecondaryButton>
          <Button type="button" onClick={() => actualizarConclusion()}>
            Guardar
          </Button>        
        </div>
        : null }
      </form>
    </VistaDelMedioContainer>
  );
};

export default connect()(Minuta);
