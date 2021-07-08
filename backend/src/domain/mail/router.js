import { Router } from 'express';
import context from '~/context';

import MailController from './controller';
import asyncMiddleware from '~/utils/asyncMiddleware';

const router = Router({ promise: true });

const controller = MailController(context);

router.put('/reenviarMailMinuta', asyncMiddleware(controller.reenviarMailMinuta));

export default router;
