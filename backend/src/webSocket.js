import context from '~/context';

function parserLastEvent(req) {
  const lastEventId = parseInt(req.query.lastEvent, 10);
  if (Number.isNaN(lastEventId)) {
    return null;
  }
  return lastEventId;
}

export default function (wss) {
  return async (ws, req) => {
    const lastEvent = parserLastEvent(req);
    const eventos = await context.eventosRepo.findEventosUltimaReunion(lastEvent);
    ws.send(JSON.stringify(
      eventos.map((evento) => ({
        ...evento.evento,
        id: evento.id,
        reunionId: evento.reunionId,
      })),
    ));
  };
}
