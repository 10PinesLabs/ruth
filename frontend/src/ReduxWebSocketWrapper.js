// eslint-disable no-console
import { batch } from 'react-redux';

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
        JSON.parse(mensaje.data).forEach((evento) => {
          if (this.onmessage) {
            this.onmessage(evento);
          } else {
            console.error('got message but onmessage was not set');
          }
          this.lastEvent = evento.id;
        });
      });
    };
  }
}
