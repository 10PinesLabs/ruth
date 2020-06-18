import { configureStore, createAction, getDefaultMiddleware } from '@reduxjs/toolkit';
import produce, { setAutoFreeze } from 'immer';
import oradoresReducer from './oradores';
import {tipoDeEvento, conclusionReducer} from './conclusion'
import reaccionesReducer from './reacciones';
import Backend from '../api/backend';
import historicoDeReaccionesReducer from './historicoDeReacciones';
import {actionItemReducer} from "./actionItem";

setAutoFreeze(false);

export const temaReducer = (state, action) => produce(state, (draft) => {

  draft.inicio = draft.inicio || null;
  draft.fin = draft.fin || null;
  
  draft.oradores = oradoresReducer(draft.oradores, action);
  draft.conclusion = conclusionReducer(draft.conclusion,action)
  draft.actionItems = actionItemReducer(draft.actionItems, action)
  
  const oldReacciones = draft.reacciones;
  draft.reacciones = reaccionesReducer(draft.reacciones, action);
  if (draft.reacciones !== oldReacciones) {
    draft.historicoDeReacciones = historicoDeReaccionesReducer(draft.historicoDeReacciones, draft.reacciones, action);
  }
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
      }
      break;
    }
    default:
      if (draft.temas) {
        const temaIndex = draft.temas.findIndex((tema) => tema.id === action.idTema);
        if(temaIndex===-1){
          console.error("Se recibio una accion con un idTema desconocido")
          return;
        };
        draft.temas[temaIndex] = temaReducer(state.temas[temaIndex], action);
      }
      break;
  }
});


export const reducer = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  switch (action.type) {
    case iniciarEnvioDeEvento.toString(): {
      draft.esperandoConfirmacionDeEvento = true;
      draft.esperandoEventoId = null;
      draft.eventosEncolados = [];
      break;
    }
    case eventoConfirmadoPorBackend.toString(): {
      if (draft.esperandoConfirmacionDeEvento) {
        if (draft.eventosEncolados.some((eventoId) => eventoId === action.payload)) {
          // el evento ya llego antes de que el backend nos confirmara asi que
          // No estamos esperando nada
          draft.eventosEncolados = [];
          draft.esperandoConfirmacionDeEvento = false;
          draft.esperandoEventoId = null;
        } else {
          draft.esperandoConfirmacionDeEvento = false;
          draft.esperandoEventoId = action.payload;
        }
      } else {
        console.warn('me llego un evento confirmado mientras no estaba esperando confirmacion...');
        console.warn(action);
      }
      break;
    }
    case eventoRechazadoPorBackend.toString(): {
      if (draft.esperandoConfirmacionDeEvento) {
        draft.eventosEncolados = [];
        draft.esperandoConfirmacionDeEvento = false;
      } else {
        console.warn('me llego un evento rechazado mientras no estaba esperando confirmacion...');
        console.warn(action);
      }
      break;
    }
    default: {
      let { esperandoEventoId, eventosEncolados, esperandoConfirmacionDeEvento } = draft;

      if (esperandoConfirmacionDeEvento) {
        // Estoy esperando que el backend me confirme un evento asi que agrego los
        // ids de los mensajes que me llegan a la lista de mensajes que me llegaron
        // por si alguno de esos es el mensaje que yo mande
        eventosEncolados = [...eventosEncolados, action.id];
      }

      if (draft.esperandoEventoId) {
        // Estoy esperando que el backend me envie el mensaje que yo mande y que ya me
        // confirmo que iba a llegar, si es ese mensaje entonces habilito de nuevo la
        // UI para hacer cosas
        if (draft.esperandoEventoId === action.id) {
          esperandoEventoId = null;
        }
      }

      const newState = domainReducer(draft, action);
      return { ...newState, esperandoEventoId, eventosEncolados };
    }
  }
});

const iniciarEnvioDeEvento = createAction('iniciarEnvioDeEvento');
const eventoConfirmadoPorBackend = createAction('eventoConfirmadoPorBackend');
const eventoRechazadoPorBackend = createAction('eventoRechazadoPorBackend');

const wsForwarder = (store) => (next) => (action) => {
  if (!action.comesFromWS) {
    // We don't dispatch actions that we send to the backend since we'll
    // see them twice, in the future we could be smarter.
    let state = store.getState();
    if (state.esperandoConfirmacionDeEvento || state.esperandoEventoId) {
      return;
    }

    next(iniciarEnvioDeEvento());
    state = store.getState();
    Backend.publicarEvento({
      reunionId: state.reunion.id,
      ...action,
    })
      .then(({ id }) => {
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

export default () => configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), wsForwarder],
});
