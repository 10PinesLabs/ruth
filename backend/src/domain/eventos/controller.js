import AsyncLock from 'async-lock';
import context from '~/context';

const Controller = (wss) => {
  const lock = new AsyncLock();

  return ({
    publicar: async (req, res) => {
      await lock.acquire('event', async () => {
        const eventoRaw = req.body;
        const { idTema, reunionId } = eventoRaw;

        delete eventoRaw.idTema;
        delete eventoRaw.reunionId;

        const contenidoEvento = {
          ...eventoRaw,
          fecha: new Date().getTime(),
        };

        const eventoNuevo = await context.eventosRepo.guardarEvento({
          evento: contenidoEvento,
          idTema,
          reunionId,
        });

        res.status(200)
          .send(eventoNuevo);

        wss.clients.forEach((client) => {
          client.send(JSON.stringify([{
            ...eventoNuevo.evento,
            id: eventoNuevo.id,
            reunionId,
            idTema,
          }]));
        });
      });
    },
  });
};

export default Controller;
