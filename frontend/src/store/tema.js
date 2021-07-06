import produce from "immer";
import { oradoresReducer } from "./oradores";
import { conclusionReducer } from "./conclusion";
import { actionItemReducer } from "./actionItem";
import { reaccionesReducer } from "./reacciones";
import { historicoDeReaccionesReducer } from "./historicoDeReacciones";
import { createEvent } from "./evento";
import { oradorAcciones } from "./oradores"

export const temaEventoTypes = {
  EMPEZAR_TEMA: "Se le da comienzo a un tema",
  TERMINAR_TEMA: "se le da fin a un tema",
  REABRIR_TEMA: "Se reabre el tema",
};

export const temaEventos = {
  empezarTema: (idTema) => createEvent(temaEventoTypes.EMPEZAR_TEMA, { idTema }),
  terminarTema: (idTema) =>
    createEvent(temaEventoTypes.TERMINAR_TEMA, { idTema }),
  reabrirTema: (idTema) => 
    createEvent(temaEventoTypes.REABRIR_TEMA, {idTema}),
};

export const INITIAL_TEMA_STATE = {
  actionItems: [],
  conclusion: "",
  fin: null,
  historicoDeReacciones: [],
  inicio: null,
  oradores: { actual: null, cola: [], pasados: [] },
  reacciones: {},
};

export const temaReducer = (state = INITIAL_TEMA_STATE, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case temaEventoTypes.EMPEZAR_TEMA: {
        draft.inicio = new Date(action.fecha).toISOString();
        break;
      }

      case temaEventoTypes.TERMINAR_TEMA: {
        const ahora = new Date(action.fecha).toISOString();

        if (draft.fin !== null || draft.inicio === null)
          return;

        draft.fin = ahora;
        if(draft.oradores.actual)
          oradorAcciones.detenerOradorActual(draft.oradores, action.fecha)
        
        break;
      }

      case temaEventoTypes.REABRIR_TEMA: {
          if(draft.fin===null || draft.inicio===null){
            break;
          }

          const ahora = new Date(action.fecha);
          let tiempoDesdeQueSeTerminoElTemaHastaAhora = ahora - Date.parse(draft.fin)
          draft.tiempoInactivo = (draft.tiempoInactivo || 0) + tiempoDesdeQueSeTerminoElTemaHastaAhora;
          draft.fin = null;
          
          break;
      }

      default:{
        draft.inicio = draft.inicio || null;
        draft.fin = draft.fin || null;

        draft.oradores = oradoresReducer(draft.oradores, action);
        draft.conclusion = conclusionReducer(draft.conclusion, action);
        draft.actionItems = actionItemReducer(draft.actionItems, action);

        const oldReacciones = draft.reacciones;
        draft.reacciones = reaccionesReducer(draft.reacciones, action);
        if (draft.reacciones !== oldReacciones) {
          draft.historicoDeReacciones = historicoDeReaccionesReducer(
            draft.historicoDeReacciones,
            draft.reacciones,
            action
          );
        }
      }
    }
  });
