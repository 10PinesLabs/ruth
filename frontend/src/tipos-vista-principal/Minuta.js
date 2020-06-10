import React, { useState, useEffect } from "react";
import { VistaDelMedioContainer } from "./Resumen.styled";
import { useSpring } from "react-spring";
import { connect } from "react-redux";
import { tipoDeEvento } from "../store/conclusion";
import { tipoDeEvento as tipoDeEventoOradores} from "../store/oradores";
import { toast } from "react-toastify";
import { Button, SecondaryButton } from "../components/Button.styled";
import ListaPinosQueHablaron from "../minuta/ListaPinosQueHablaron";
import { CreadorDeResumenOrador } from "../minuta/CreadorDeResumenOrador";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons/faChevronDown";
import {BotonParaAbrirResumen, ConclusionForm, ConclusionTitle, ConclusionTextarea, ResumenOradorCollapseContainer} from "../minuta/Minuta.styled";
import Collapse from '@material-ui/core/Collapse';

const Minuta = ({ dispatch, tema }) => {
  let [lastKnowConclusion, setLastKnowConclusion] = useState(tema.conclusion);
  let [conclusion, setConclusion] = useState(tema.conclusion);
  let [isEditingConclusion, setIsEditingConclusion] = useState(false);
  let [exposicionSeleccionada, setExposicionSeleccionada] = useState(null);
  let [isRecapVisible, setIsRecapCollapsed] = useState(false);

  const dispatchMinuteador = (data) => {
    const evento = {
      autor: "MINUTEADOR",
      idTema: tema.id,
      data,
    };
    dispatch(evento);
  };


  useEffect(() => {
    if (!isEditingConclusion && tema.conclusion !== lastKnowConclusion) {
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
    dispatchMinuteador({
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

  const onExposicionSeleccionada = (exposicion) => {
    setExposicionSeleccionada(exposicion)
  }

  const onDescartarResumen = ()=>{
    setExposicionSeleccionada(null)
  }

  const onGuardarResumen = (resumen)=>{
    dispatchMinuteador({
      tipo: tipoDeEventoOradores.RESUMIR_A_ORADOR,
      indexExposicion: exposicionSeleccionada.index,
      resumen
    });
  }
  const buttonText = () => (isRecapVisible ? 'CERRAR EDICION' : 'ABRIR EDICION');

  return (
    <VistaDelMedioContainer
      style={useSpring({ opacity: 1, from: { opacity: 0 } })}
    >
      <BotonParaAbrirResumen
        variant="outlined"
        endIcon={<FontAwesomeIcon icon={faChevronDown}/>}
        onClick={() => setIsRecapCollapsed(!isRecapVisible)}
      >
        {buttonText()}
      </BotonParaAbrirResumen>

      <ResumenOradorCollapseContainer>
        <Collapse in={isRecapVisible}>
          <CreadorDeResumenOrador exposicion={exposicionSeleccionada} onDiscard={onDescartarResumen} onSave={onGuardarResumen}/>
        </Collapse>
      </ResumenOradorCollapseContainer>

      <ListaPinosQueHablaron oradores={tema.oradores} finTema={tema.fin} onSelect={(exposicion)=>onExposicionSeleccionada(exposicion)}/>
      <ConclusionForm>
        <ConclusionTitle>
          CONCLUSION
        </ConclusionTitle>
        <ConclusionTextarea
          value={conclusion}
          rows={6}
          placeholder={"Aqui va la conclusión general del tema..."}
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
      </ConclusionForm>
    </VistaDelMedioContainer>
  );
};

export default connect()(Minuta);
