import context from '~/context';

function parserLastEvent(req) {
  const lastEventId = parseInt(req.query.lastEvent, 10);
  if (Number.isNaN(lastEventId)) {
    return null;
  }
  return lastEventId;
}

function getCurrentTimestamp() {
  return new Date().valueOf();
}

export default function () {
  return async (ws, req) => {
    const timeoutHandler = setInterval(() => {
      ws.ping(getCurrentTimestamp().toString());
    }, 20000);
    ws.on('close', (code, reason) => {
      clearInterval(timeoutHandler);
      console.log(`closed connection (${code}) with reason: '${reason}'`);
    });
    ws.on('pong', (message) => {
      const timeDelta = getCurrentTimestamp() - parseInt(message.toString(), 10);
      console.log(`Pong took to respond: ${timeDelta}ms`);
    });
    const lastEvent = parserLastEvent(req);
    const reunionId = parseInt(req.query.reunionId, 10);
    ws.reunionId = reunionId;
    const eventos = await context.eventosRepo.findEventosParaReunion(lastEvent, reunionId);
    ws.send(JSON.stringify(
      eventos.map((evento) => ({
        ...evento.evento,
        id: evento.id,
        reunionId: evento.reunionId,
      })),
    ));
  };
}
