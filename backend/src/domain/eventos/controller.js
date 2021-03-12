import AsyncLock from 'async-lock';
import context from '~/context';

const Controller = (wss) => {
  const lock = new AsyncLock();

  return ({
    publicar: async (req, res) => {
      const eventoRaw = req.body;
      const { reunionId } = eventoRaw;

      await lock.acquire(`event/${reunionId}`, async () => {
        const contenidoEvento = {
          ...eventoRaw,
          fecha: new Date().getTime(),
        };

        const eventoNuevo = await context.eventosRepo.guardarEvento({
          evento: contenidoEvento,
          idTema: eventoRaw.idTema,
          reunionId,
        });

        res.status(200)
          .send(eventoNuevo);

        [...wss.clients].filter((client) => client.reunionId === reunionId).forEach((client) => {
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
