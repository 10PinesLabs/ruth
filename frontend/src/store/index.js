import { configureStore, createAction, getDefaultMiddleware } from '@reduxjs/toolkit';
import produce, { setAutoFreeze } from 'immer';
import oradoresReducer from './oradores';
import reaccionesReducer from './reacciones';
import Backend from '../api/backend';
import historicoDeReaccionesReducer from "./historicoDeReacciones";

const TEMA_INCIAL_STATE = {
  oradores: [],
  reacciones: [],
  historicoDeReacciones: [],
  inicio: null,
  fin: null,
};

setAutoFreeze(false);

export const temaReducer = (state = TEMA_INCIAL_STATE, action) => produce(state, (draft) => {
  draft.inicio = draft.inicio || null;
  draft.fin = draft.fin || null;

  draft.oradores = oradoresReducer(draft.oradores, action);
  draft.reacciones = reaccionesReducer(draft.reacciones, action);
  draft.historicoDeReacciones = historicoDeReaccionesReducer(draft.historicoDeReacciones, action);
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
  esperandoEventoId: null,
  esperandoConfirmacionDeEvento: false,
  eventosEncolados: [],
};

export const domainReducer = (state = INITIAL_STATE, action) => produce(state, (draft) => {
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
      break;
    }
    default:
      if (draft.temas) {
        const temaIndex = draft.temas.findIndex((tema) => tema.id === action.idTema);
        draft.temas[temaIndex] = temaReducer(state.temas[temaIndex], action);
      }
      break;
  }
});


function applyEventosViejos(draft) {
  const newState = draft.eventosEncolados.reduce(domainReducer, draft);
  return { ...newState, eventosEncolados: [], esperandoConfirmacionDeEvento: false };
}

export const reducer = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  switch (action.type) {
    case iniciarEnvioDeEvento.toString(): {
      draft.esperandoConfirmacionDeEvento = true;
      draft.esperandoEventoId = null;
      break;
    }
    case eventoConfirmadoPorBackend.toString(): {
      if (draft.esperandoConfirmacionDeEvento) {
        if (draft.eventosEncolados.some((evento) => evento.id === action.payload)) {
          // el evento ya llego antes de que el backend nos confirmara
          return applyEventosViejos(draft);
        }
        draft.esperandoConfirmacionDeEvento = false;
        draft.esperandoEventoId = action.payload;
      }
      break;
    }
    case eventoRechazadoPorBackend.toString(): {
      return applyEventosViejos(draft);
    }
    default: {
      if (draft.esperandoConfirmacionDeEvento) {
        draft.eventosEncolados.push(action);
        break;
      }

      let { esperandoEventoId } = draft;
      if (draft.esperandoEventoId === action.id) {
        esperandoEventoId = null;
      }

      const newState = domainReducer(draft, action);
      return { ...newState, esperandoEventoId, ultimoEventoId: action.id };
    }
  }
});

const iniciarEnvioDeEvento = createAction('iniciarEnvioDeEvento');
const eventoConfirmadoPorBackend = createAction('eventoConfirmadoPorBackend');
const eventoRechazadoPorBackend = createAction('eventoRechazadoPorBackend');

const wsForwarder = (ws) => (store) => (next) => (action) => {
  console.warn(`INICIO REDUCER ${action.type || action.tipo || action.data.tipo}`);
  console.log(action);
  if (!action.comesFromWS) {
    // We don't dispatch actions that we send to the ws since we'll
    // see them twice, in the future we could be smarter.
    let state = store.getState();
    console.log('esperandoConfirmacionDeEvento', state.esperandoConfirmacionDeEvento);
    console.log('esperandoEventoId', state.esperandoEventoId);
    console.log('ultimoEventoId', state.ultimoEventoId);
    if (state.esperandoConfirmacionDeEvento || state.esperandoEventoId) {
      console.log('event ignored');
      return;
    }

    console.log('iniciar envio de evento');
    next(iniciarEnvioDeEvento());
    console.log('done iniciar envio de evento');
    state = store.getState();
    Backend.publicarEvento({
      reunionId: state.reunion.id,
      ultimoEventoId: state.ultimoEventoId,
      ...action,
    })
      .then(({ id }) => {
        console.log('el backend me respondio bien');
        next(eventoConfirmadoPorBackend(id));
      })
      .catch((e) => {
        console.error('el backend fallo');
        console.error(e);
        next(eventoRechazadoPorBackend());
      });
  } else {
    next(action);
  }
};

export default (ws) => configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), wsForwarder(ws)],
});
