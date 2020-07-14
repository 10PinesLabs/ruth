import React, {useEffect, useState} from "react";
import {VistaDelMedioContainer, VistaMinutaContainer} from "./Resumen.styled";
import {useSpring} from "react-spring";
import {connect} from "react-redux";
import {tipoDeEvento} from "../store/conclusion";
import {tipoDeEvento as tipoDeEventoOradores} from "../store/oradores";
import {tipoDeEvento as tipoDeEventoActionItem} from "../store/actionItem";
import {toast} from "react-toastify";
import TablaOradores from "../minuta/TablaOradores";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons/faChevronDown";
import {BotonParaAbrirResumen, CustomTab, TabRenderer, TabsHeader} from "../minuta/Minuta.styled";
import Collapse from '@material-ui/core/Collapse';
import {ActionItemEditor} from "../minuta/ActionItemEditor";
import {ResumenOrador} from "../minuta/ResumenOrador";
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
  
  const crearEventoDeMinuteador = (data) => {
    const evento = {
      autor: "MINUTEADOR",
      idTema: tema.id,
      data,
    };
    dispatch(evento);
  };

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
      seleccionarExposicion(expositor(orador.usuario.nombre, orador.instanciaDeHabla, orador.resumen))
    } 
  }

  useEffect( handleCambioConclusion ,[tema.conclusion]);

  useEffect(handleCambioOrador, [tema.oradores.actual])

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
    return instanciaDeHabla===tema.oradores.actual.instanciaDeHabla
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

  const agregarActionItem = (actionItem) => {
    crearEventoDeMinuteador({
      tipo: tipoDeEventoActionItem.AGREGAR_ACTION_ITEM,
      actionItem,
    })
  };

  const editarActionItem = (actionItem) => {
    crearEventoDeMinuteador({
      tipo: tipoDeEventoActionItem.EDITAR_ACTION_ITEM,
      actionItem,
    })
  }

  const borrarActionItem = (actionItem) => {
    crearEventoDeMinuteador({
      tipo: tipoDeEventoActionItem.BORRAR_ACTION_ITEM,
      actionItem
    })
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
