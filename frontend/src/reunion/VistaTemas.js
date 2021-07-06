import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import Sidebar from '../sidebar-reunion/Sidebar';
import {ReunionContainer, VistaTemaContainer} from './Reunion.styled';
import Resumen from '../tipos-vista-principal/Resumen';
import Presentacion from '../tipos-vista-principal/Presentacion';
import Debate from '../tipos-vista-principal/Debate';
import Minuta from "../tipos-vista-principal/Minuta";
import Temario from '../temario/Temario';
import Header from "./Header";
import {useSpring} from "react-spring";
import Mobile from '../mobile/index';
import { temaEventos } from '../store/tema';


const VistaTemas = ({dispatch, cerrarReunion, temas, usuario, estadoReunion}) => {

  const indiceTemaSinFinalizar = temas.findIndex((tema) => tema.fin === null);
  const ultimoTema = temas.length - 1;
  const indiceTemaATratar = indiceTemaSinFinalizar >= 0 ? indiceTemaSinFinalizar : ultimoTema;

  const [indiceTemaAMostrar, setIndiceTemaAMostrar] = useState(indiceTemaATratar);
  const [selectedElement, setSelectedElement] = useState('Resumen');

  const temaSeleccionado = temas[indiceTemaAMostrar];

  useEffect(() => {
    setIndiceTemaAMostrar(indiceTemaATratar);
  }, [indiceTemaATratar]);

  const empezarTema = () => {
    if (temaSeleccionado.inicio !== null) {
      toast.error('No se puede iniciar un tema que ya fue iniciado');
      return 
    }
    if(existeUnTemaEmpezado()){
      toast.error('Ya hay otro tema en curso');
      return
    }
    dispatch(temaEventos.empezarTema(temaSeleccionado.id))
  };

  const existeUnTemaEmpezado = ()=> {
    return temas.some(tema => estaElTemaEmpezado(tema))
  }

  const estaElTemaEmpezado = (tema) => {
   return tema.inicio && !tema.fin;
  } 

  const terminarTema = () => {
    dispatch(temaEventos.terminarTema(temaSeleccionado.id))
    toast.success('Tema finalizado');
  };

  const reabrirTema = () => {
    if(estadoReunion === false){
      toast.error('Esta reunion está cerrada, no se puede abrir un tema');
      return;
    }
    if(existeUnTemaEmpezado()){
      toast.error('Ya hay otro tema en curso');
      return
    }
    dispatch(temaEventos.reabrirTema(temaSeleccionado.id))
    toast.success('Tema reabierto');

  }

  const handleCerrarReunion = () => {
    if (temaActivo()) {
      terminarTema();
    }
    cerrarReunion(temas);
  };

  const seleccionarTema = (nuevoTemaSeleccionado) => {
    const index = temas.findIndex((tema) => tema === nuevoTemaSeleccionado);
    setIndiceTemaAMostrar(index);
    setSelectedElement('Resumen');
  };

  const avanzarTema = () => {
    if (indiceTemaAMostrar !== temas.length - 1) {
      setIndiceTemaAMostrar(indiceTemaAMostrar + 1);
    }
  };

  const retrocederTema = () => {
    if (indiceTemaAMostrar !== 0) {
      setIndiceTemaAMostrar(indiceTemaAMostrar - 1);
    }
  };

  const temaActivo = () => {
    const {inicio, fin} = temaSeleccionado;
    return inicio !== null && fin === null;
  };

  const propsToAnimate = useSpring({opacity: 1, from: {opacity: 0}});
  const VistaSeleccionada = vistas[selectedElement] || 'Resumen';

  return (
    <ReunionContainer style={propsToAnimate}>
      <Temario temas={temas}
               seleccionarTema={seleccionarTema}
               cerrarReunion={handleCerrarReunion}
               temaActual={temaSeleccionado}
      />

      {(selectedElement !== 'Opinar' &&
      <Header tema={temaSeleccionado}
              estaActivo={temaActivo()}
      />)}
      <VistaTemaContainer shouldShowHeader={selectedElement !== 'Opinar'} style={propsToAnimate}>
        <VistaSeleccionada tema={temaSeleccionado}
                           usuario={usuario}
                           terminarTema={terminarTema}
                           empezarTema={empezarTema}
                           reabrirTema={reabrirTema}
                           temaActivo={temaActivo()}
                           avanzarTema={avanzarTema}
                           retrocederTema={retrocederTema}
                           handleCerrarReunion={handleCerrarReunion}/>
      </VistaTemaContainer>
      <Sidebar handleSelection={setSelectedElement}
               selectedElement={selectedElement}
               link={temaSeleccionado.linkDePresentacion}/>
    </ReunionContainer>
  );
};

const vistas = {
  'Resumen': Resumen,
  'Presentación': Presentacion,
  'Debate': Debate,
  'Opinar': Mobile,
  'Minuta': Minuta
};
export default VistaTemas;
