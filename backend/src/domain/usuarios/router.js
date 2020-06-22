import { Router } from 'express';
import asyncMiddleware from '~/utils/asyncMiddleware';
import Controller from './controller';
import context from '~/context';

const router = Router();
const controller = Controller(context.usuariosRepo);

router.get('/', asyncMiddleware(controller.usuarios));

export default router;
