import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import Sidebar from '../sidebar-reunion/Sidebar';
import {ReunionContainer, VistaTemaContainer} from './Reunion.styled';
import TemaActual from '../tipos-vista-principal/TemaActual';
import Presentacion from '../tipos-vista-principal/Presentacion';
import Debate from '../tipos-vista-principal/Debate';
import Temario from '../temario/Temario';
import Header from "./Header";
import {useSpring} from "react-spring";


const VistaTemas = ({actualizarTema, cerrarReunion, temas}) => {

  const indiceTemaATratar = () => {
    const indiceTemaSinFinalizar = temas.findIndex((tema) => tema.fin === null);
    const ultimoTema = temas.length - 1;
    return indiceTemaSinFinalizar >= 0 ? indiceTemaSinFinalizar : ultimoTema;
  };

  const [indiceTemaAMostrar, setIndiceTemaAMostrar] = useState(indiceTemaATratar());
  const [selectedElement, setSelectedElement] = useState('Tema Actual');

  useEffect(() => {setIndiceTemaAMostrar(indiceTemaATratar())}, [indiceTemaATratar()]);

  const empezarTema = () => {
    if (temaSeleccionado().inicio !== null) {
      return toast.error('No se puede iniciar un tema que ya fue iniciado');
    }
    if (indiceTemaAMostrar !== indiceTemaATratar()) {
      return toast.error('Existe otro tema para tratar');
    }
    return actualizarTema({
      id: temaSeleccionado().id,
      inicio: Date.now(),
      fin: null,
    });
  };

  const terminarTema = () => {
    actualizarTema({
      id: temaSeleccionado().id,
      inicio: temaSeleccionado().inicio,
      fin: Date.now(),
    });
    toast.success('Tema finalizado');
  };

  const handleCerrarReunion = () => {
    if (temaActivo()) {
      terminarTema();
    }
    cerrarReunion();
  };

  const temaSeleccionado = () => {
    return temas[indiceTemaAMostrar];
  };

  const seleccionarTema = (temaSeleccionado) => {
    const index = temas.findIndex((tema) => tema === temaSeleccionado);
    setIndiceTemaAMostrar(index);
    setSelectedElement('Tema Actual');
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

  const esElSiguienteTemaATratar = () => indiceTemaAMostrar === indiceTemaATratar();

  const segundosRestantes = () => {
    const {inicio, fin, cantidadDeMinutosDelTema} = temaSeleccionado();
    if (inicio === null) {
      return cantidadDeMinutosDelTema * 60;
    }
    const tiempo = fin === null ? Date.now() : Date.parse(fin);
    return Math.round(cantidadDeMinutosDelTema * 60
      - (tiempo - Date.parse(inicio)) / 1000);
  };

  const temaActivo = () => {
    const {inicio, fin} = temaSeleccionado();
    return inicio !== null && fin === null;
  };

  const obtenerVista = () => vistas[selectedElement] || 'Tema Actual';
  const propsToAnimate = useSpring({opacity: 1, from: {opacity: 0}});
  const VistaSeleccionada = obtenerVista();

  return (
    <ReunionContainer style={propsToAnimate}>
      <Temario temas={temas}
               seleccionarTema={seleccionarTema}
               cerrarReunion={handleCerrarReunion}
               temaActual={temaSeleccionado()}
      />
      <Header titulo={temaSeleccionado().titulo}
              segundosRestantes={segundosRestantes()}
              temaActivo={temaActivo()}
      />
      <VistaTemaContainer style={propsToAnimate}>
        <VistaSeleccionada tema={temaSeleccionado()}
                           terminarTema={terminarTema}
                           empezarTema={empezarTema}
                           temaActivo={temaActivo()}
                           avanzarTema={avanzarTema}
                           retrocederTema={retrocederTema}
                           temaATratar={esElSiguienteTemaATratar()}
                           handleCerrarReunion={handleCerrarReunion}/>
      </VistaTemaContainer>
      <Sidebar handleSelection={setSelectedElement}
               selectedElement={selectedElement}
               link={temaSeleccionado().linkDePresentacion}/>
    </ReunionContainer>
  );
};

const vistas = {
  'Tema Actual': TemaActual,
  'Presentación': Presentacion,
  'Debate': Debate
};
export default VistaTemas;
