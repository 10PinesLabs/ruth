import createStore from './store';
import { reunionEventos } from "./store/reunion";
import { stateEventos } from "./store/index"
import Backend from "./api/backend"
import { useEffect, useState } from 'react';
import { ReconnectingWebSocket } from "./ReduxWebSocketWrapper"

export const RuthStore = (reunion) => {
  const [store, setStore] = useState();

  const crearEventoDeBackend = (action, state) => {
    let temaActual = state.reunion.temas.find((t) => t.fin === null && t.inicio !== null);

    return {
      reunionId: state.reunion.id,
      idTema: temaActual?.id,
      ...action,
    }
  }

  useEffect(() => {
    if (!reunion || !reunion.abierta) {
      return;
    }
    const ws = new ReconnectingWebSocket();
    const newStore = createStore();
    const next = newStore.dispatch

    newStore.dispatch =  (action) => {
        return new Promise((resolve, reject) => {
          
          let state = newStore.getState();
          const evento = crearEventoDeBackend(action, state)
          if (state.esperandoConfirmacionDeEvento || state.esperandoEventoId) {
            return;
          }
      
          next(stateEventos.iniciarEnvioDeEvento());
          Backend.publicarEvento(evento)
            .then(({ id }) => {
              next(stateEventos.eventoConfirmadoPorBackend(id));
              resolve()
            })
            .catch((e) => {
              console.error('el backend fallo');
              console.error(e);
              next(stateEventos.eventoRechazadoPorBackend());
              reject()
            });
          })
    };

    newStore.reduceEvent = next
    newStore.reduceEvent(reunionEventos.comenzarReunion(reunion));

    ws.onmessage = (evento) => {
      newStore.reduceEvent(evento);
    };
    
    ws.reconnect();
    setStore(newStore);
  }, [reunion]);
  return store;
}
