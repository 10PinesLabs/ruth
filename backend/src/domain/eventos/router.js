import { Router } from 'express';
import asyncMiddleware from '~/utils/asyncMiddleware';
import Controller from './controller';

export default () => {
  const router = Router({ promise: true });
  const controller = Controller();

  router.post('/', asyncMiddleware(controller.publicar));
  return router;
};
