import { Router } from 'express';
import context from '~/context';

import PruebasController from './controller';
import asyncMiddleware from '~/utils/asyncMiddleware';
import VotacionDeRoots from './votacionDeRoots';

const router = Router({ promise: true });

const controller = PruebasController({
    buscarTemasVotacionRoots: () => {
        return VotacionDeRoots.getTemasRoots();
    }
});

router.get('/temas', asyncMiddleware(controller.temas));

export default router;
