import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import * as path from 'path';
import cookieSession from 'cookie-session';

import apiRouter from './routes';
import logger from '~/logger';

const app = express();
require('express-ws')(app);

app.use(morgan('combined', { stream: logger.stream }));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(cookieSession({
  name: 'ruth_session',
  secret: process.env.SESSION_SECRET,
  secure: process.env.NODE_ENV === 'production',

  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));

app.use('/api', apiRouter());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './frontend')));
  app.use('*', (req, res) => {
    res.sendfile(`${__dirname}/frontend/index.html`);
  });
}

export default app;
