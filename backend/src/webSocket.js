import context from '~/context';

export default function (wss) {
  return (ws) => {
    ws.on('message', (message) => {
      context.eventosRepo.guardarEvento(message, JSON.parse(message).idTema);
      wss.clients.forEach((client) => {
        client.send(JSON.stringify([JSON.parse(message)]));
      });
    });
    context.eventosRepo.findEventosUltimaReunion()
      .then((data) => {
        ws.send(JSON.stringify(data.map((eventData) => ({ ...eventData.evento, id: eventData.id, reunionId: eventData.reunionId }))));
      });
  };
}
