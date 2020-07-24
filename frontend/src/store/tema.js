import produce from "immer";
import { oradoresReducer } from "./oradores";
import { conclusionReducer } from "./conclusion";
import { actionItemReducer } from "./actionItem";
import { reaccionesReducer } from "./reacciones";
import { historicoDeReaccionesReducer } from "./historicoDeReacciones";
import { createEvent } from "./evento";

export const temaEventoType = {
  EMPEZAR_TEMA: "Se le da comienzo a un tema",
  TERMINAR_TEMA: "se le da fin a un tema",
};

export const temaEventos = {
  empezarTema: (idTema) => createEvent(temaEventoType.EMPEZAR_TEMA, { idTema }),
  terminarTema: (idTema) =>
    createEvent(temaEventoType.TERMINAR_TEMA, { idTema }),
};

export const temaReducer = (state, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case temaEventoType.EMPEZAR_TEMA: {
        draft.inicio = new Date(action.fecha).toISOString();
        break;
      }

      case temaEventoType.TERMINAR_TEMA: {
        const ahora = new Date(action.fecha).toISOString();
        if (draft.fin === null && draft.inicio !== null) {
          draft.fin = ahora;
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
