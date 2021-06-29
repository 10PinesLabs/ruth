import { Router } from 'express';
import context from '~/context';

import ReunionController from './controller';
import asyncMiddleware from '~/utils/asyncMiddleware';

const router = Router({ promise: true });

const controller = ReunionController(context);

router.get('/reunion/:id', asyncMiddleware(controller.reunion));
router.post('/reunionDeRoots', asyncMiddleware(controller.crear));
router.put('/reunion', asyncMiddleware(controller.actualizar));
router.get('/reuniones/abiertas', asyncMiddleware(controller.obtenerAbiertas));
router.get('/reuniones/cerradas', asyncMiddleware(controller.obtenerCerradas()));

export default router;
