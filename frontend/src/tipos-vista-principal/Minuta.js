import React, { useState, useEffect } from "react";
import { VistaDelMedioContainer } from "./Resumen.styled";
import { useSpring } from "react-spring";
import { connect } from "react-redux";
import { tipoDeEvento } from "../store/conclusion";
import { toast } from "react-toastify";

const Minuta = ({ dispatch, tema, temaActivo }) => {
  let [conclusion, setConclusion] = useState(tema.conclusion);
  const [isWriting, setIsWriting] = useState(false);
  const [updateConclusionTimeOut, setUpdateConclusionTimeOut] = useState(null)

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

  useEffect(() => {
    if (!isWriting && tema.conclusion != conclusion) {
      setConclusion(tema.conclusion);
    }
  });

  function userStoppedWriting(event) {
    setUpdateConclusionTimeOut(setTimeout(function () {
      setIsWriting(false);
    }, 2000))
  }

  function userStartedWriting(){
    clearTimeout(updateConclusionTimeOut)
    setIsWriting(true)
  }

  function actualizarConclusion() {

    dispatchMinuta({
      tipo: tipoDeEvento.GUARDAR_CONCLUSION,
      conclusion: conclusion,
    });
  }
  return (
    <VistaDelMedioContainer
      style={useSpring({ opacity: 1, from: { opacity: 0 } })}
    >
      Proximamente!
      <form
        onBlur={(event) => {
          userStoppedWriting(event);
        }}
        onFocus={() => userStartedWriting()}
      >
        <textarea
          value={conclusion}
          onChange={(event) => setConclusion(event.target.value)}
        ></textarea>
        <button type="button" onClick={() => actualizarConclusion()}>
          Guardar!
        </button>
      </form>
    </VistaDelMedioContainer>
  );
};

export default connect()(Minuta);
