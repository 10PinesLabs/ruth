// eslint-disable no-console
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import createStore from './store';
import Loading from "./common-pages/Loading";

function getWebSocket(lastEvent) {
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const host = process.env.NODE_ENV === 'production' ? window.location.host : 'localhost:8760';
  return new WebSocket(`${protocol}://${host}/ws?lastEvent=${lastEvent}`);
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
      this.reconnect();
    };

    this.websocket.onerror = (e) => {
      console.error(e);
    };

    this.websocket.onmessage = (mensaje) => {
      JSON.parse(mensaje.data).forEach((rawEvento) => {
        const { data, ...evento } = rawEvento;
        const { tipo, ...rawEvent } = data;
        const nextEvent = {
          ...evento, ...rawEvent, comesFromWS: true, type: tipo,
        };

        if (this.onmessage) {
          this.onmessage(nextEvent);
        } else {
          console.error('got message but onmessage was not set');
        }
        this.lastEvent = nextEvent.id;
      });
    };
  }
}

export const ReduxWebSocketWrapper = (props) => {
  const [store, setStore] = useState();

  useEffect(() => {
    const ws = new ReconnectingWebSocket();
    const newStore = createStore(ws);
    const { reunion } = props;
    newStore.dispatch({
      type: 'Empezar Reunion', comesFromWS: true, reunion, temas: reunion.temas,
    });

    ws.onmessage = (evento) => {
      newStore.dispatch(evento);
    };
    ws.reconnect();
    setStore(newStore);
  }, [props]);

  if (!store) {
    return <Loading/>;
  }


  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  );
};
