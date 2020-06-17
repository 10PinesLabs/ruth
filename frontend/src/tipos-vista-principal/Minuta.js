import React, { useState, useEffect } from "react";
import { VistaDelMedioContainer } from "./Resumen.styled";
import { useSpring } from "react-spring";
import { connect } from "react-redux";
import { tipoDeEvento } from "../store/conclusion";
import { tipoDeEvento as tipoDeEventoOradores} from "../store/oradores";
import { toast } from "react-toastify";
import { Button, SecondaryButton } from "../components/Button.styled";
import TablaOradores from "../minuta/TablaOradores";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons/faChevronDown";
import {BotonParaAbrirResumen, ResumenOradorCollapseContainer, ConclusionForm, ConclusionTextarea, ConclusionTitle} from "../minuta/Minuta.styled";
import Collapse from '@material-ui/core/Collapse';
import { ResumenOrador } from "../minuta/ResumenOrador";

const expositor = (nombreOrador, ordenDeOrador, resumen) => {
  return {
    orador:nombreOrador,
    index:ordenDeOrador,
    resumen
  }
}

const Minuta = ({ dispatch, tema }) => {
  let [conclusion, setConclusion] = useState(tema.conclusion);
  let [estaEditandoConclusion, setEstaEditandoConclusion] = useState(false);
  let [exposicionSeleccionada, setExposicionSeleccionada] = useState(null);
  let [seActualizaExposicionSeleccionada, setActualizarExposicionSeleccionada] = useState(false)
  let [isResumenOradorCerrado, setIsResumenOradorCerrado] = useState(false);

  const crearEventoDeMinuteador = (data) => {
    const evento = {
      autor: "MINUTEADOR",
      idTema: tema.id,
      data,
    };
    dispatch(evento);
  };

  //encargarse de actualizacion conclusion
  useEffect(() => {
    if (!estaEditandoConclusion) {
      setConclusion(tema.conclusion);
    }
  },[tema.conclusion]);

  //encargarse de cambio de orador
  useEffect(()=>{
    let orador = tema.oradores.actual;
    if(!exposicionSeleccionada && orador){
      seleccionarExposicion(expositor(orador.usuario.nombre, orador.instanciaDeHabla, orador.resumen))
    } 
  }, tema.oradores.actual)

  function actualizarConclusion() {
    if (!tema.id) {
      toast.error("No hay tema seleccionado");
      setConclusion('')
      return;
    }
    setEstaEditandoConclusion(false);
    crearEventoDeMinuteador({
      tipo: tipoDeEvento.GUARDAR_CONCLUSION,
      conclusion: conclusion,
    });
  }

  function resetearConclusion() {
    setConclusion(tema.conclusion);
    setEstaEditandoConclusion(false);
  }

  function handleCambioInputConclusion(input) {
    setConclusion(input);
    setEstaEditandoConclusion(true);
  }

  const hayAlguienExponiendo = () =>{
    return tema.oradores.actual;
  }

  const estaExponiendo = (instanciaDeHabla) => {
    return instanciaDeHabla==tema.oradores.actual.instanciaDeHabla
  }

  const seleccionarExposicion = (exposicion) => {
    setExposicionSeleccionada(exposicion)
    setActualizarExposicionSeleccionada(hayAlguienExponiendo() && estaExponiendo(exposicion.index))
    
  }

  const onDescartarResumen = ()=>{
    setExposicionSeleccionada(null)
  }

  const onGuardarResumen = (resumen)=>{
    crearEventoDeMinuteador({
      tipo: tipoDeEventoOradores.RESUMIR_A_ORADOR,
      indexExposicion: exposicionSeleccionada.index,
      resumen
    });

    setExposicionSeleccionada(null)
    let oradores = [...tema.oradores.pasados, tema.oradores.actual]
    let siguienteOrador = oradores[exposicionSeleccionada.index+1]
    if(seActualizaExposicionSeleccionada && siguienteOrador){
      let selectObject = expositor(siguienteOrador.usuario.nombre, siguienteOrador.instanciaDeHabla)
      setExposicionSeleccionada(selectObject)
    }
    

  }
  const textoBotonEdicion = () => (isResumenOradorCerrado ? 'CERRAR EDICION' : 'ABRIR EDICION');

  return (
    <VistaDelMedioContainer
      style={useSpring({ opacity: 1, from: { opacity: 0 } })}
    >
      <BotonParaAbrirResumen
        variant="outlined"
        endIcon={<FontAwesomeIcon icon={faChevronDown}/>}
        onClick={() => setIsResumenOradorCerrado(!isResumenOradorCerrado)}
      >
        {textoBotonEdicion()}
      </BotonParaAbrirResumen>

      <ResumenOradorCollapseContainer>
        <Collapse in={isResumenOradorCerrado}>
          <ResumenOrador exposicion={exposicionSeleccionada} onDiscard={onDescartarResumen} onSave={onGuardarResumen}/>
        </Collapse>
      </ResumenOradorCollapseContainer>

      <TablaOradores oradores={tema.oradores}  finTema={tema.fin} pinoSeleccionado={exposicionSeleccionada} onSelect={seleccionarExposicion }/>
      <ConclusionForm>
        <ConclusionTitle>
          CONCLUSION
        </ConclusionTitle>
        <ConclusionTextarea
          value={conclusion}
          rows={6}
          placeholder={"Aqui va la conclusión general del tema..."}
          onChange={(event) => {
            handleCambioInputConclusion(event.target.value);
          }}
        />

        {estaEditandoConclusion ? (
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
