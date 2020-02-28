import { Router } from 'express';
import asyncMiddleware from '~/utils/asyncMiddleware';
import Controller from './controller';

const router = Router({ promise: true });
const controller = Controller();

router.get('/me', asyncMiddleware(controller.me));

export default router;
