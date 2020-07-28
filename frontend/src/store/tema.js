import produce from "immer";
import { oradoresReducer } from "./oradores";
import { conclusionReducer } from "./conclusion";
import { actionItemReducer } from "./actionItem";
import { reaccionesReducer } from "./reacciones";
import { historicoDeReaccionesReducer } from "./historicoDeReacciones";
import { createEvent } from "./evento";

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

export const temaReducer = (state, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case temaEventoTypes.EMPEZAR_TEMA: {
        draft.inicio = new Date(action.fecha).toISOString();
        break;
      }

      case temaEventoTypes.TERMINAR_TEMA: {
        const ahora = new Date(action.fecha).toISOString();
        if (draft.fin === null && draft.inicio !== null) {
          draft.fin = ahora;
        }
        break;
      }

      case temaEventoTypes.REABRIR_TEMA: {
          if(draft.fin!=null && draft.inicio!=null){
            const ahora = new Date(action.fecha);
            let tiempoDesdeQueSeTerminoElTemaHastaAhora = ahora - Date.parse(draft.fin)
            draft.tiempoInactivo = (draft.tiempoInactivo || 0) + tiempoDesdeQueSeTerminoElTemaHastaAhora;
            draft.fin = null;
          }
          break;
      }

      default:
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
  });
