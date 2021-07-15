import { Router } from 'express';
import asyncMiddleware from '~/utils/asyncMiddleware';
import Controller from './controller';

export default (wss) => {
  const router = Router({ promise: true });
  const controller = Controller(wss);

  router.post('/', asyncMiddleware(controller.publicar));
  router.get('/reuniones/:idReunion/eventos', asyncMiddleware(controller.obtenerEventos));
  return router;
};
