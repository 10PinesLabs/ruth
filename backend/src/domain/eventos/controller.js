import AsyncLock from 'async-lock';
import context from '~/context';

const Controller = (wss) => {
  const lock = new AsyncLock();

  return ({
    publicar: async (req, res) => {
      await lock.acquire('event', async () => {
        const eventoRaw = req.body;

        const contenidoEvento = {
          ...eventoRaw,
          fecha: new Date().getTime(),
        };

        const eventoNuevo = await context.eventosRepo.guardarEvento({
          evento: contenidoEvento,
          idTema: eventoRaw.idTema,
          reunionId: eventoRaw.reunionId,
        });

        res.status(200)
          .send(eventoNuevo);

        wss.clients.forEach((client) => {
          client.send(JSON.stringify([{
            ...eventoNuevo.evento,
            id: eventoNuevo.id,
          }]));
        });
      });
    },
  });
};

export default Controller;
