import { Router } from 'express';
import context from '~/context';

import enviarResumenPorMail from '~/domain/mail/mail';
import notificador from './notificador';
import ReunionController from './controller';
import asyncMiddleware from '~/utils/asyncMiddleware';

const router = Router({ promise: true });

const controller = ReunionController(context, notificador, enviarResumenPorMail);

router.get('/reunionActual', asyncMiddleware(controller.reunion));
router.post('/reunionDeRoots', asyncMiddleware(controller.crear));
router.put('/reunionActual', controller.actualizar);

export default router;
