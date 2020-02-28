import { Router } from 'express';
import context from '~/context';
import PruebasController from './controller';
import asyncMiddleware from '~/utils/asyncMiddleware';
import VotacionDeRoots from '../votacionDeRoots/votacionDeRoots';

const router = Router({ promise: true });

const repo = context.reunionesRepo;

const controller = PruebasController({
  buscarTemasVotacionRoots: () => VotacionDeRoots.getTemasRoots(),
  repo,
});

router.get('/temas', asyncMiddleware(controller.temas));
router.get('/cerrar', asyncMiddleware(controller.cerrar));

export default router;
