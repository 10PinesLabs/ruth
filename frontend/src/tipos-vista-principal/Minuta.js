import React, { useState, useEffect } from "react";
import { VistaDelMedioContainer } from "./Resumen.styled";
import { useSpring } from "react-spring";
import { connect } from "react-redux";
import { tipoDeEvento } from "../store/conclusion";
import { tipoDeEvento as tipoDeEventoOradores} from "../store/oradores";
import { toast } from "react-toastify";
import { Button, SecondaryButton } from "../components/Button.styled";
import ListaPinosQueHablaron from "../minuta/ListaPinosQueHablaron";
import { ResumenOrador } from "../minuta/ResumenOrador";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons/faChevronDown";
import {BotonParaAbrirResumen, ResumenOradorCollapseContainer} from "../minuta/Minuta.styled";
import {pinoQueHablo as exposicion} from '../minuta/ListaPinosQueHablaron'
import Collapse from '@material-ui/core/Collapse';

const Minuta = ({ dispatch, tema, temaActivo }) => {
  let [lastKnowConclusion, setLastKnowConclusion] = useState(tema.conclusion);
  let [conclusion, setConclusion] = useState(tema.conclusion);
  let [isEditingConclusion, setIsEditingConclusion] = useState(false);
  let [exposicionSeleccionada, setExposicionSeleccionada] = useState(null);
  let [isRecapVisible, setIsRecapCollapsed] = useState(false);
  let [seActualizaExposicionSeleccionada, setActualizarExposicionSeleccionada] = useState(false)

    const dispatchMinuteador = (data) => {
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

  //handle Cambio orador
  useEffect(()=>{
    let orador = tema.oradores.actual;
    if(!exposicionSeleccionada && orador){
      seleccionarExposicion(exposicion(orador.usuario.nombre, orador.instanciaDeHabla))
    } 
  }, tema.oradores.actual)

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

  const hayAlguienExponiendo = () =>{
    return tema.oradores.actual;
  }

  const estaExponiendo = (idOfExposition) => {
    return idOfExposition==tema.oradores.actual.instanciaDeHabla
  }

  const seleccionarExposicion = (exposicion) => {
    setExposicionSeleccionada(exposicion)
    setActualizarExposicionSeleccionada(hayAlguienExponiendo() && estaExponiendo(exposicion.index))
    
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

    setExposicionSeleccionada(null)
    let oradores = [...tema.oradores.pasados, tema.oradores.actual]
    let siguienteOrador = oradores[exposicionSeleccionada.index+1]
    if(seActualizaExposicionSeleccionada && siguienteOrador){
      let selectObject = exposicion(siguienteOrador.usuario.nombre, siguienteOrador.instanciaDeHabla)
      setExposicionSeleccionada(selectObject)
    }
    

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
          <ResumenOrador exposicion={exposicionSeleccionada} onDiscard={onDescartarResumen} onSave={onGuardarResumen}/>
        </Collapse>
      </ResumenOradorCollapseContainer>

      <ListaPinosQueHablaron oradores={tema.oradores}  finTema={tema.fin} pinoSeleccionado={exposicionSeleccionada} onSelect={(exposicion)=>seleccionarExposicion(exposicion)}/>
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
