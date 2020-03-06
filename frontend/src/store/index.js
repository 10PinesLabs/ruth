import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import produce from 'immer';
import oradoresReducer from './oradores';
import reaccionesReducer from './reacciones';
import Backend from '../api/backend';

const TEMA_INCIAL_STATE = {
  oradores: [],
  reacciones: [],
  inicio: null,
  fin: null,
};

export const temaReducer = (state = TEMA_INCIAL_STATE, action) => produce(state, (draft) => {
  draft.inicio = draft.inicio || null;
  draft.fin = draft.fin || null;

  draft.oradores = oradoresReducer(state.oradores, action);
  draft.reacciones = reaccionesReducer(state.reacciones, action);
});

function compareTemaByPriority(tema1, tema2) {
  if (tema2.prioridad === null) {
    return -1;
  }
  if (tema1.prioridad === null) {
    return 1;
  }
  return tema2.prioridad - tema1.prioridad;
}

function compareTema(tema1, tema2) {
  if (tema1.obligatoriedad === 'OBLIGATORIO' && tema2.obligatoriedad === 'OBLIGATORIO') {
    return compareTemaByPriority(tema1, tema2);
  }

  if (tema1.obligatoriedad === 'OBLIGATORIO') {
    return -1;
  }
  if (tema2.obligatoriedad === 'OBLIGATORIO') {
    return 1;
  }
  return compareTemaByPriority(tema1, tema2);
}

const INITIAL_STATE = {
  temas: null,
  reunion: null,
  ultimoEventoId: null,
};

export const reducer = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.ultimoEventoId = action.id;
  switch (action.type) {
    case 'Empezar Reunion': {
      draft.temas = action.temas.map((tema) => temaReducer(tema, action)).sort(compareTema);
      draft.reunion = action.reunion;
      break;
    }
    case 'Empezar Tema': {
      const tema = draft.temas.find((t) => t.id === action.idTema);
      tema.inicio = new Date(action.fecha).toISOString();

      break;
    }
    case 'Terminar Tema': {
      const tema = draft.temas.find((t) => t.id === action.idTema);
      const ahora = new Date(action.fecha).toISOString();
      if (tema.fin === null && tema.inicio !== null) {
        tema.fin = ahora;

        const orador = tema.oradores.find((o) => o.fin === null && o.inicio !== null);
        if (orador) {
          orador.fin = ahora;
        }
      }
    }
      break;
    default:
      if (draft.temas) {
        const temaIndex = draft.temas.findIndex((tema) => tema.id === action.idTema);
        draft.temas[temaIndex] = temaReducer(state.temas[temaIndex], action);
      }
      break;
  }
});

const wsForwarder = (ws) => (store) => (next) => (action) => {
  if (!action.comesFromWS) {
    // We don't dispatch actions that we send to the ws since we'll
    // see them twice, in the future we could be smarter.
    const state = store.getState();
    Backend.publicarEvento({ reunionId: state.reunion.id, ultimoEventoId: state.ultimoEventoId, ...action })
      .then(() => {
        console.log('el backend me respondio bien');
      })
      .catch(() => {
        console.error('el backend fallo');
      });
  } else {
    next(action);
  }
};

export default (ws) => configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), wsForwarder(ws)],
});
