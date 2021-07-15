import AsyncLock from 'async-lock';
import context from '~/context';
import { RequestError } from '../../utils/asyncMiddleware';

const Controller = (wss) => {
  const lock = new AsyncLock();

  return ({
    publicar: async (req, res) => {
      const eventoRaw = req.body;
      const { reunionId } = eventoRaw;
      const reunion = await context.reunionesRepo.findOneById(reunionId);
      const eventoPermitido = 'La reunion fue finalizada';
      const reunionCerradaYEventoNoPermitido = !reunion.abierta && eventoRaw.type !== eventoPermitido;

      if (reunionCerradaYEventoNoPermitido) {
        throw new RequestError(400, 'La reunion está cerrada');
      }
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
