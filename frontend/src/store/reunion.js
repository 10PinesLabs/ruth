import produce from "immer";
import { createEvent } from "./evento";
import { temaReducer } from "./tema";

export const reunionEventoTypes = {
  EMPEZAR_REUNION: "Una reunion es comenzada",
};

export const reunionEventos = {
  comenzarReunion: (reunion) =>
    createEvent(reunionEventoTypes.EMPEZAR_REUNION, {
      reunion,
      comesFromWS:true
    }),
};

export const INITIAL_REUNION_STATE = {};

export const reunionReducer = (state = INITIAL_REUNION_STATE, action) =>
  produce(state, (draft) => {
    draft.ultimoEventoId = action.id;
    switch (action.type) {
      case reunionEventoTypes.EMPEZAR_REUNION: {
        draft.reunion = action.reunion;
        draft.reunion.temas = action.reunion.temas
          .map((tema) => temaReducer(tema, action))
          .sort(compareTema);
        break;
      }

      default:
        if (draft.reunion?.temas) {
          const temaIndex = draft.reunion.temas.findIndex(
            (tema) => tema.id === action.idTema
          );

          if (temaIndex !== -1){
            draft.reunion.temas[temaIndex] = temaReducer(
              draft.reunion.temas[temaIndex],
              action
            );
            break;
          }
          
          console.error(
            "Se recibio una accion con un idTema desconocido",
            action
          );
        }
       
    }
  });

function compareTemaByPriority(tema1, tema2) {
  if (tema2.prioridad === null) {
    return 1;
  }
  if (tema1.prioridad === null) {
    return -1;
  }
  return tema2.prioridad - tema1.prioridad;
}

function compareTema(tema1, tema2) {
  if (
    tema1.obligatoriedad === "OBLIGATORIO" &&
    tema2.obligatoriedad === "OBLIGATORIO"
  ) {
    return compareTemaByPriority(tema1, tema2);
  }

  if (tema1.obligatoriedad === "OBLIGATORIO") {
    return -1;
  }
  if (tema2.obligatoriedad === "OBLIGATORIO") {
    return 1;
  }
  return compareTemaByPriority(tema1, tema2);
}
