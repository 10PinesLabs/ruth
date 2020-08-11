import React, { useState, useEffect } from "react";
import {VistaDelMedioContainer, VistaMinutaContainer} from "./Resumen.styled";
import { useSpring } from "react-spring";
import { connect } from "react-redux";
import { conclusionEventos } from "../store/conclusion";
import { oradorEventos } from "../store/oradores"
import {  actionItemEventos } from "../store/actionItem";
import { toast } from "react-toastify";
import TablaOradores from "../minuta/TablaOradores";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons/faChevronDown";
import {BotonParaAbrirResumen, TabRenderer, TabsHeader, CustomTab} from "../minuta/Minuta.styled";
import Collapse from '@material-ui/core/Collapse';
import { ActionItemEditor } from "../minuta/ActionItemEditor";
import { ResumenOrador } from "../minuta/ResumenOrador";
import {ListaActionItems} from "../minuta/ListaActionItems"
import {ConclusionTema} from "../minuta/ConclusionTema";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

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
  let [tabValue, setTabValue] = useState(0);
  let [seActualizaExposicionSeleccionada, setActualizarExposicionSeleccionada] = useState(false)
  let [isResumenOradorCerrado, setIsResumenOradorCerrado] = useState(false);
  
  const handleCambioConclusion = () => {
    if (!estaEditandoConclusion) {
      setConclusion(tema.conclusion);
    }
  }

  const manejarCambioTab = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleCambioOrador = () => {
    let orador = tema.oradores.actual;
    if(!exposicionSeleccionada && orador){
      seleccionarExposicion(expositor(orador.usuario.nombre, tema.oradores.pasados.length, orador.resumen))
    } 
  }

  useEffect( handleCambioConclusion ,[tema.conclusion]);

  useEffect(handleCambioOrador, [tema.oradores.actual?.usuario,tema.oradores.actual?.instanciaDeHabla])

  function actualizarConclusion() {
    if (!tema.id) {
      toast.error("No hay tema seleccionado");
      setConclusion('')
      return;
    }
    setEstaEditandoConclusion(false);
    dispatch(conclusionEventos.guardarConclusion(conclusion, tema.id))
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
    return instanciaDeHabla===tema.oradores.pasados.length
  }

  const seleccionarExposicion = (exposicion) => {
    setExposicionSeleccionada(exposicion)
    setActualizarExposicionSeleccionada(hayAlguienExponiendo() && estaExponiendo(exposicion.index))
    
  }

  const onDescartarResumen = ()=>{
    setExposicionSeleccionada(null)
  }

  const onGuardarResumen = (resumen)=>{
    dispatch(oradorEventos.resumirAOrador(exposicionSeleccionada.index, resumen, tema.id))

    setExposicionSeleccionada(null)
    let oradores = [...tema.oradores.pasados, tema.oradores.actual]
    let indexSiguienteOrador = exposicionSeleccionada.index+1;
    let siguienteOrador = oradores[indexSiguienteOrador]
    if(seActualizaExposicionSeleccionada && siguienteOrador){
      let selectObject = expositor(siguienteOrador.usuario.nombre, indexSiguienteOrador)
      setExposicionSeleccionada(selectObject)
    }
  
  }

  const agregarActionItem = (actionItem) => {
    dispatch(actionItemEventos.agregarActionItem(actionItem, tema.id))
  };

  const editarActionItem = (actionItem) => {
    dispatch(actionItemEventos.editarActionItem(actionItem, tema.id))
  }

  const borrarActionItem = (actionItem) => {
    dispatch(actionItemEventos.borrarActionItem(actionItem, tema.id))
  }

  const textoBotonEdicion = () => (isResumenOradorCerrado ? 'CERRAR EDICION' : 'ABRIR EDICION');

  return (
    <VistaDelMedioContainer
      style={useSpring({ opacity: 1, from: { opacity: 0 } })}
    >
      <VistaMinutaContainer>
        <TabsHeader
          value={tabValue}
          handleTabChange={manejarCambioTab}
        >
          <CustomTab label="Minuta de cada pino" />
          <CustomTab label="Anotaciones generales y action items" />
        </TabsHeader>
    
        <TabRenderer
          value={tabValue}
          index={0}
        >
          <BotonParaAbrirResumen
            variant="outlined"
            endIcon={<FontAwesomeIcon icon={faChevronDown}/>}
            onClick={() => setIsResumenOradorCerrado(!isResumenOradorCerrado)}
          >
            {textoBotonEdicion()}
          </BotonParaAbrirResumen>
          <Collapse in={isResumenOradorCerrado}>
            <Box
              display={"flex"}
              width={1}
              justifyContent={"center"}
            >
              <ResumenOrador exposicion={exposicionSeleccionada} onDiscard={onDescartarResumen} onSave={onGuardarResumen}/>
            </Box>
          </Collapse>
          <TablaOradores oradores={tema.oradores}  finTema={tema.fin} pinoSeleccionado={exposicionSeleccionada} onSelect={seleccionarExposicion }/>
        </TabRenderer>
        <TabRenderer
          value={tabValue}
          index={1}
        >
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <ConclusionTema
                titulo={"Resumen General"}
                conclusion={conclusion}
                onChange={(event) => {
                  handleCambioInputConclusion(event.target.value);
                }}
                estaEditandoConclusion={estaEditandoConclusion}
                onBorrar={() => resetearConclusion()}
                onGuardar={() => actualizarConclusion()}
              />
            </Grid>
            <Grid item xs={7}>
              <h1>Action Items ({tema.actionItems.length})</h1>
              <ActionItemEditor onSubmit={agregarActionItem}/>
              <ListaActionItems actionItems={tema.actionItems} alBorrar={borrarActionItem} onEdit={editarActionItem} />
            </Grid>
          </Grid>
        </TabRenderer>
      </VistaMinutaContainer>
    </VistaDelMedioContainer>
  );
};

export default connect()(Minuta);
