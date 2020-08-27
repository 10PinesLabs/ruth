import createStore from './store';
import { reunionEventos } from "./store/reunion";
import { stateEventos } from "./store/index"
import Backend from "./api/backend"
import { useEffect, useState } from 'react';
import { ReconnectingWebSocket } from "./ReduxWebSocketWrapper"
import _ from "lodash"

export const useRuthStore = (reunion) => {
  const [store, setStore] = useState();
  const eventosEnEspera = [];

  useEffect(() => {
    if (!reunion || !reunion.abierta) {
      return;
    }
    const ws = new ReconnectingWebSocket();
    const newStore = createStore();
    const next = newStore.dispatch

    newStore.dispatch = enviarEventoAlBackend(newStore, next)

    newStore.reduceEvent = next
    newStore.reduceEvent(reunionEventos.comenzarReunion(reunion));

    ws.onmessage = (evento) => {
      newStore.reduceEvent(evento);

      const indexDeEventoEnEsperaIndex = eventosEnEspera.findIndex(
        (eventosEnEspera) => _.matches(eventosEnEspera.evento, evento) && !eventosEnEspera.confirmado
      );
        if (indexDeEventoEnEsperaIndex >= 0) {
        eventosEnEspera[indexDeEventoEnEsperaIndex].confirmarWs()
      }

      console.log(eventosEnEspera)

    };
    
    ws.reconnect();
    setStore(newStore);
  }, [reunion]);

  const enviarEventoAlBackend = (store, next) => (action) => {
    const state = store.getState();
    let esperaDeEvento;
    const evento = crearEventoDeBackend(action, state)

    const promesaDeEvento = new Promise((resolve, reject) => {
      esperaDeEvento = crearEsperaDeEvento(evento, resolve)

      if (state.esperandoConfirmacionDeEvento || state.esperandoEventoId) {
        return;
      }
  
      next(stateEventos.iniciarEnvioDeEvento());
      Backend.publicarEvento(evento)
        .then(({ id }) => {
          console.log(id)
          next(stateEventos.eventoConfirmadoPorBackend(id));
          esperaDeEvento.confirmarBackend()
        })
        .catch((e) => {
          console.error('el backend fallo');
          console.error(e);
          next(stateEventos.eventoRechazadoPorBackend());
          reject()
        });
      })

    eventosEnEspera.push(esperaDeEvento)
    return promesaDeEvento;
};

  const crearEventoDeBackend = (action, state) => {
    return {
      reunionId: state.reunion?.id,
      ...action,
    }
  }

  const crearEsperaDeEvento = (evento, resolve) => {
    return {
      evento,
      confirmoBackend: false,
      confirmoWs:false,
      resuelto:false,
      confirmarBackend: function (){
        this.confirmoBackend = true;
        this.comprobarConfirmacion();
      },
      confirmarWs: function(){
        this.confirmoWs = true;
        this.comprobarConfirmacion();
      },
      comprobarConfirmacion: function () {
        if (this.confirmoBackend && this.confirmoWs){
          console.log("se resuelve el evento")
          resolve();
          this.resuelto = true;
        } 
      },
    };
  };

  return store;
}
