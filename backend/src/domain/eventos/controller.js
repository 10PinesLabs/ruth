import AsyncLock from 'async-lock';
import context from '~/context';

const Controller = (wss) => {
  const lock = new AsyncLock();

  return ({
    publicar: async (req, res) => {
      await lock.acquire('event', async () => {
        const evento = req.body;

        const eventoNuevo = await context.eventosRepo.guardarEvento({
          evento,
          idTema: evento.idTema,
          reunionId: evento.reunionId,
        });

        res.status(200)
          .send(eventoNuevo);

        wss.clients.forEach((client) => {
          client.send(JSON.stringify([{
            ...evento,
            id: eventoNuevo.id,
          }]));
        });
      });
    },
  });
};

export default Controller;
