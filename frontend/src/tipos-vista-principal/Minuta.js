import React, { useState, useEffect } from "react";
import { VistaDelMedioContainer } from "./Resumen.styled";
import { useSpring } from "react-spring";
import { connect } from "react-redux";
import { tipoDeEvento } from "../store/conclusion";
import { tipoDeEvento as tipoDeEventoOradores} from "../store/oradores";
import { toast } from "react-toastify";
import { Button, SecondaryButton} from "../components/Button.styled";
import ListaPinosQueHablaron from "../minuta/ListaPinosQueHablaron";
import { MinutaWriter } from "../minuta/MinutaWriter";
import InputResumen from "../minuta/InputResumen";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons/faChevronDown";
import {BotonParaAbrirResumen} from "../minuta/Minuta.styled";


const Minuta = ({ dispatch, tema, temaActivo }) => {
  let [lastKnowConclusion, setLastKnowConclusion] = useState(tema.conclusion);
  let [conclusion, setConclusion] = useState(tema.conclusion);
  let [isEditingConclusion, setIsEditingConclusion] = useState(false);
  let [expositionSelected, setExpositionSelected] = useState(null);
  let [isRecapVisible, setIsRecapCollapsed] = useState(false);

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
    setExpositionSelected(exposition)
  }

  const onMinutaDiscard = ()=>{
    setExpositionSelected(null)
  }

  const onMinutaSave = (minuta)=>{
    dispatchMinuta({
      tipo: tipoDeEventoOradores.MINUTEAR_A_ORADOR,
      expositionNumber: expositionSelected.number-1,
      minuta:minuta
    });
  }
  const buttonText = () => (isRecapVisible ? 'CERRAR EDICION' : 'ABRIR EDICION');

  return (
    <VistaDelMedioContainer
      style={useSpring({ opacity: 1, from: { opacity: 0 } })}
    >
    
      <MinutaWriter exposition={expositionSelected} onDiscard={onMinutaDiscard} onSave={onMinutaSave}/>
      <BotonParaAbrirResumen
        variant="outlined"
        endIcon={<FontAwesomeIcon icon={faChevronDown}/>}
        onClick={() => setIsRecapCollapsed(!isRecapVisible)}
      >
        {buttonText()}
      </BotonParaAbrirResumen>

      <InputResumen oradores={tema.oradores} isRecapVisible={isRecapVisible}/>

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
