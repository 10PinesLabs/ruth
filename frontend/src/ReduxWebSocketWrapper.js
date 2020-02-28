import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import createStore from './store';

function getWebSocket() {
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const host = process.env.NODE_ENV === 'production' ? window.location.host : 'localhost:8760';
  return new WebSocket(`${protocol}://${host}/ws`);
}

export const ReduxWebSocketWrapper = (props) => {
  const [store, setStore] = useState();

  useEffect(() => {
    const ws = getWebSocket();
    const newStore = createStore(ws);
    const { reunion } = props;
    newStore.dispatch({
      type: 'Empezar Reunion', comesFromWS: true, reunion, temas: reunion.temas,
    });

    ws.onmessage = (mensaje) => {
      JSON.parse(mensaje.data).forEach((rawEvento) => {
        const { data, ...evento } = rawEvento;
        const { tipo, ...rawEvent } = data;
        const nextEvent = {
          ...evento, ...rawEvent, comesFromWS: true, type: tipo,
        };
        newStore.dispatch(nextEvent);
      });
    };
    setStore(newStore);
  }, [props]);

  if (!store) {
    return <div>Cargando</div>;
  }


  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  );
};
