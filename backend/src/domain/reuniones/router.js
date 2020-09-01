import { Router } from 'express';
import axios from 'axios';
import context from '~/context';
import ReunionController from './controller';
import asyncMiddleware from '~/utils/asyncMiddleware';

const router = Router({ promise: true });

const controller = ReunionController(context, axios);

router.get('/reunionActual', asyncMiddleware(controller.reunion));
router.post('/reunionDeRoots', asyncMiddleware(controller.crear));
router.put('/reunionActual', asyncMiddleware(controller.actualizar));

export default router;
