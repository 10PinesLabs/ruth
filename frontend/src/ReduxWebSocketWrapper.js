// eslint-disable no-console
import { useEffect, useState } from 'react';
import { batch } from 'react-redux';
import createStore from './store';
import { reunionEventos } from './store/reunion'

function getWebSocket(lastEvent) {
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const host = process.env.NODE_ENV === 'production' ? window.location.host : 'localhost:8760';
  return new WebSocket(`${protocol}://${host}/api/ws?lastEvent=${lastEvent}`);
}

export class ReconnectingWebSocket {
  constructor() {
    this.onmessage = null;
    this.lastEvent = null;
  }

  reconnect() {
    this.websocket = getWebSocket(this.lastEvent);

    this.websocket.onclose = () => {
      console.log('Socket was closed');
      setTimeout(() => {
        this.reconnect();
      }, 100);
    };

    this.websocket.onerror = (e) => {
      console.error(e);
    };

    this.websocket.onmessage = (mensaje) => {
      batch(() => {
        JSON.parse(mensaje.data).forEach((rawEvento) => {
          const nextEvent = {
            ...rawEvento,
            comesFromWS: true,
          };

          if (this.onmessage) {
            this.onmessage(nextEvent);
          } else {
            console.error('got message but onmessage was not set');
          }
          this.lastEvent = nextEvent.id;
        });
      });
    };
  }
}

export function useRuthConnectedStore(reunion) {
  const [store, setStore] = useState();

  useEffect(() => {
    if (!reunion || !reunion.abierta) {
      return;
    }
    const ws = new ReconnectingWebSocket();
    const newStore = createStore();
    newStore.dispatch(reunionEventos.conectarseAReunion(reunion));
    ws.onmessage = (evento) => {
      newStore.dispatch(evento);
    };
    ws.reconnect();
    setStore(newStore);
  }, [reunion]);
  return store;
}
