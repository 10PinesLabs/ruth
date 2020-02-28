import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import * as path from 'path';
import session from 'express-session';

import indexRouter from './routes';
import webSocketRouter from './webSocket';
import logger from '~/logger';

const app = express();
const expressWs = require('express-ws')(app);


app.use(morgan('combined', { stream: logger.stream }));
app.use(json());
app.use(urlencoded({ extended: false }));
// TODO: Express sessions esta usando un memory store, deberiamos mandar en la cookie directamente el valor (a la JWT) sino cada reset de heroku invalida las sesiones anteriores.
app.use(session({ secret: 'keyboard cat' }));

app.ws('/ws', webSocketRouter(expressWs.getWss()));
app.use('/api', indexRouter(expressWs.getWss()));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './frontend')));
  app.use('*', (req, res) => {
    res.sendfile(`${__dirname}/frontend/index.html`);
  });
}

export default app;
