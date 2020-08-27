import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import produce, { setAutoFreeze } from 'immer';
import { reunionReducer } from "./reunion";
import { toast } from 'react-toastify';
import { createEvent } from './evento';

setAutoFreeze(false);

export const stateEventoTypes = {
  INICIAR_ENVIO: 'iniciarEnvioDeEvento',
  ENVIO_CONFIRMADO: 'eventoConfirmadoPorBackend',
  ENVIO_RECHAZADO: 'eventoRechazadoPorBackend'
}

export const stateEventos = {
iniciarEnvioDeEvento: () => createEvent(stateEventoTypes.INICIAR_ENVIO),
eventoConfirmadoPorBackend: (idConfirmado) => createEvent(stateEventoTypes.ENVIO_CONFIRMADO, {idConfirmado}),
eventoRechazadoPorBackend: () => createEvent(stateEventoTypes.ENVIO_RECHAZADO),
}

const INITIAL_STATE = {
  reunion: null,
  ultimoEventoId: null,
  esperandoEventoId: null,
  esperandoConfirmacionDeEvento: false,
  eventosEncolados: [],
};

export const stateReducer = (state = INITIAL_STATE, action) =>
produce(state, (draft) => {
  switch (action.type) {
    case stateEventoTypes.INICIAR_ENVIO: {
      draft.esperandoConfirmacionDeEvento = true;
      draft.esperandoEventoId = null;
      draft.eventosEncolados = [];
      break;
    }
    case stateEventoTypes.ENVIO_CONFIRMADO: {
      if (draft.esperandoConfirmacionDeEvento) {
        if (draft.eventosEncolados.some((eventoId) => eventoId === action.idConfirmado)) {
          // el evento ya llego antes de que el backend nos confirmara asi que
          // No estamos esperando nada
          draft.eventosEncolados = [];
          draft.esperandoConfirmacionDeEvento = false;
          draft.esperandoEventoId = null;
        console.log("Se libera la UI desde TCP")

        } else {
          draft.esperandoConfirmacionDeEvento = false;
          draft.esperandoEventoId = action.idConfirmado;
        }
      } else {
        console.warn('me llego un evento confirmado mientras no estaba esperando confirmacion...');
        console.warn(action);
      }
      break;
    }
    case stateEventoTypes.ENVIO_RECHAZADO: {
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
        console.log("Llega ws")
      }

      if (draft.esperandoEventoId) {
        // Estoy esperando que el backend me envie el mensaje que yo mande y que ya me
        // confirmo que iba a llegar, si es ese mensaje entonces habilito de nuevo la
        // UI para hacer cosas
        if (draft.esperandoEventoId === action.id) {
          esperandoEventoId = null;
          console.log("Se libera la UI desde Ws")
        }
      }

      const newState = reunionReducer(draft, action);
      return { ...newState, esperandoEventoId, eventosEncolados };
    }
  }
});

const reunionAbiertaCheckMiddleware = (store) => (next) => (action) => {
  let state = store.getState();
  if(!state.reunion || state.reunion.abierta){
    next(action)
  }else{
    toast.error('La reunion ya fue finalizada')
  }
}

export default () =>
  configureStore({
    reducer: stateReducer,
    middleware: [...getDefaultMiddleware(), reunionAbiertaCheckMiddleware],
  });
