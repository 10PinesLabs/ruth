import createStore from './store';
import { reunionEventos } from "./store/reunion";
import { stateEventos } from "./store/index"
import Backend from "./api/backend"
import { useEffect, useState } from 'react';
import { ReconnectingWebSocket } from "./ReduxWebSocketWrapper"
import _ from "lodash";

export const RuthStore = (reunion) => {
  const [store, setStore] = useState();
  const enviosABackend = []

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
      if (!action.comesFromWS) {
        
        let state = newStore.getState();
        const evento = crearEventoDeBackend(action, state)
        let promiseResolve 
        let promesaDeEvento = new Promise((resolve, reject) => {

          promiseResolve = resolve
          // We don't dispatch actions that we send to the backend since we'll
          // see them twice, in the future we could be smarter.
          if (state.esperandoConfirmacionDeEvento || state.esperandoEventoId) {
            return;
          }
      
          next(stateEventos.iniciarEnvioDeEvento());
          Backend.publicarEvento(evento)
            .then(({ id }) => {
              next(stateEventos.eventoConfirmadoPorBackend(id));
            })
            .catch((e) => {
              console.error('el backend fallo');
              console.error(e);
              next(stateEventos.eventoRechazadoPorBackend());
              reject()
            });
          })

        enviosABackend.push({evento, promiseResolve})
        return promesaDeEvento;

      } else {
        const eventoEnviado = enviosABackend.find(promesaDeEvento => _.matches(promesaDeEvento.evento, action))
        if(eventoEnviado){
          console.log("se recibio un evento enviado", eventoEnviado)
          eventoEnviado.promiseResolve()
        }
        next(action);
      }
    };

    newStore.dispatch(reunionEventos.comenzarReunion(reunion));
    ws.onmessage = (evento) => {
      newStore.dispatch(evento);
    };
    ws.reconnect();
    setStore(newStore);
  }, [reunion]);
  return store;
}
