import { Router } from 'express';
import context from '~/context';

import ReunionController from './controller';
import asyncMiddleware from '~/utils/asyncMiddleware';

const router = Router({ promise: true });

const controller = ReunionController(context);

router.get('/reunionActual/:id', asyncMiddleware(controller.reunion));
router.post('/reunionDeRoots', asyncMiddleware(controller.crear));
router.put('/reunionActual', asyncMiddleware(controller.actualizar));

export default router;
