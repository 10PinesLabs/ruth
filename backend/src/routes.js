import { Router } from 'express';
import reunionRouter from '~/domain/reuniones/router';
import temasRouter from '~/domain/temas/router';
import perfilRouter from '~/domain/perfil/router';
import pruebasRouter from '~/domain/pruebas/router';
import loginRouter from '~/domain/login/router';
import estaLogueado from '~/domain/login/estaLogueado';
import logger from '~/logger';
import eventosRouter from './domain/eventos/router';
import webSocketRouter from '~/webSocket';
import usuariosRouter from '~/domain/usuarios/router';
import context from '~/context';

export default (wss) => {
  const router = Router({ promise: true });

  router.use('/auth', loginRouter);
  router.use('*', (req, res, next) => {
    if (estaLogueado(req)) {
      context.usuariosRepo.guardarOActualizarUsuario(req.session.usuario);
      next();
    } else {
      res.status(403)
        .send('No estas logueado');
    }
  });

  /* GET home page. */
  router.get('/', (req, res) => {
    res.status(200)
      .send(new Date().toISOString());
  });

  router.use('/', reunionRouter);

  router.use('/eventos', eventosRouter(wss));
  router.use('/temas', temasRouter);
  router.use('/perfil', perfilRouter);
  router.use('/usuarios', usuariosRouter);
  router.ws('/ws', webSocketRouter());

  if (process.env.NODE_ENV !== 'production') {
    router.use('/pruebas', pruebasRouter);
  }

  router.use(logger.errorHandler());

  router.get('*', (req, res) => {
    logger.info(`Request not found ${req.url}`);
    res.status(404)
      .send('Not found');
  });
  return router;
};
