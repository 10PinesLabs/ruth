import context from '~/context';
import { GuardiaDeEventos } from './guardiaDeEventos';

const Controller = (wss) => ({
  publicar: async (req, res) => {
    const evento = req.body;
    const guardia = new GuardiaDeEventos(context.eventosRepo);

    if (await guardia.esValido(evento)) {
      const eventoNuevo = await context.eventosRepo.guardarEvento({
        evento,
        idTema: evento.idTema,
        reunionId: evento.reunionId,
      });

      wss.clients.forEach((client) => {
        client.send(JSON.stringify([{ ...evento, id: eventoNuevo.id }]));
      });
      res.status(200).send(eventoNuevo);
    } else {
      const error = new Error('falle');
      error.status = 400;
      throw error;
    }
  },
});

export default Controller;
