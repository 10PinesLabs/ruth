import AsyncLock from 'async-lock';
import context from '~/context';
import { GuardiaDeEventos } from './guardiaDeEventos';

const Controller = (wss) => {
  const lock = new AsyncLock();

  return ({
    publicar: async (req, res) => {
      await lock.acquire('event', async () => {
        const evento = req.body;
        const guardia = new GuardiaDeEventos(context.eventosRepo);

        if (await guardia.esValido(evento)) {
          const eventoNuevo = await context.eventosRepo.guardarEvento({
            evento,
            idTema: evento.idTema,
            reunionId: evento.reunionId,
          });


          res.status(200).send(eventoNuevo);

          wss.clients.forEach((client) => {
            client.send(JSON.stringify([{
              ...evento,
              id: eventoNuevo.id,
            }]));
          });
        } else {
          res.status(400)
            .send(`Event ${evento.ultimoEventoId} is not valid`);
        }
      });
    },
  });
};

export default Controller;
