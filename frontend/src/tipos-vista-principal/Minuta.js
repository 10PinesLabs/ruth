import React, { useState, useEffect } from "react";
import { VistaDelMedioContainer } from "./Resumen.styled";
import { useSpring } from "react-spring";
import { connect } from "react-redux";
import { tipoDeEvento, conclusionReducer } from "../store/conclusion";
import { toast } from "react-toastify";
import { Button, SecondaryButton} from "../components/Button.styled";
import ListaPinosQueHablaron from "../minuta/ListaPinosQueHablaron";
import { MinutaWriter } from "../minuta/MinutaWriter";



const Minuta = ({ dispatch, tema, temaActivo }) => {
  let [lastKnowConclusion, setLastKnowConclusion] = useState(tema.conclusion);
  let [conclusion, setConclusion] = useState(tema.conclusion);
  let [isEditingConclusion, setIsEditingConclusion] = useState(false);
  let [expositionSelected, setExpositionSelected] = useState(null);
  const dispatchMinuta = (data) => {
    const evento = {
      autor: "MINUTEADOR",
      idTema: tema.id,
      data,
    };
    dispatch(evento);
  };


  useEffect(() => {
    if (!isEditingConclusion && tema.conclusion != lastKnowConclusion) {
      setLastKnowConclusion(tema.conclusion);
      setConclusion(tema.conclusion);
    }
  });

  function actualizarConclusion() {
    if (!tema.id) {
      toast.error("No hay tema seleccionado");
      setConclusion('')
      return;
    }
    setIsEditingConclusion(false);
    dispatchMinuta({
      tipo: tipoDeEvento.GUARDAR_CONCLUSION,
      conclusion: conclusion,
    });
  }

  function resetearConclusion() {
    setConclusion(tema.conclusion);
    setIsEditingConclusion(false);
  }

  function userChangedConclusionInput(inputValue) {
    setConclusion(inputValue);
    setIsEditingConclusion(true);
  }

  const onExpositionSelected = (exposition) => {
    console.log("se selecciono el orador:", exposition)
    setExpositionSelected(exposition)
  }

  return (
    <VistaDelMedioContainer
      style={useSpring({ opacity: 1, from: { opacity: 0 } })}
    >
    
      <MinutaWriter exposition={expositionSelected}/>
      <ListaPinosQueHablaron oradores={tema.oradores} onExposicionSeleccionada={(exposition)=>onExpositionSelected(exposition)}/>
      <form>
        <textarea
          value={conclusion}
          onChange={(event) => {
            userChangedConclusionInput(event.target.value);
          }}
        />

        {isEditingConclusion ? (
          <div>
            <SecondaryButton type="button" onClick={() => resetearConclusion()}>
              Borrar
            </SecondaryButton>
            <Button type="button" onClick={() => actualizarConclusion()}>
              Guardar
            </Button>
          </div>
        ) : null}
      </form>
    </VistaDelMedioContainer>
  );
};

export default connect()(Minuta);
