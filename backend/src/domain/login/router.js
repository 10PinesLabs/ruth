import { Router } from 'express';
import asyncMiddleware from '~/utils/asyncMiddleware';
import BackofficeController from './controller';

const router = Router({ promise: true });
const controller = BackofficeController();

router.get('/callback', asyncMiddleware(controller.callback));

export default router;
