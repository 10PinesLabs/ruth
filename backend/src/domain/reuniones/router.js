import { Router } from 'express';
import context from '~/context';

import ReunionController from './controller';
import asyncMiddleware from '~/utils/asyncMiddleware';

const router = Router({ promise: true });

const controller = ReunionController(context);

router.get('/reunion/:id', asyncMiddleware(controller.reunion));
router.post('/reunionDeRoots', asyncMiddleware(controller.crear));
router.put('/reunion', asyncMiddleware(controller.actualizar));
router.get('/reuniones', asyncMiddleware(controller.obtenerReuniones));
router.get('/reuniones/:idReunion/eventos', asyncMiddleware(controller.obtenerEventos));
router.put('/reuniones/:id/reenviarMailMinuta', asyncMiddleware(controller.reenviarMailMinuta));

export default router;
