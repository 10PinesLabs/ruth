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

const cookieOptions = {
  name: 'ruth_session',
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
};

if (process.env.NODE_ENV === 'production') {
  cookieOptions.secure = true;
  cookieOptions.secret = process.env.SESSION_SECRET;
} else {
  cookieOptions.secure = false;
  cookieOptions.secret = process.env.SESSION_SECRET || 'secret';
}

app.use(cookieSession(cookieOptions));

app.use('/api', apiRouter());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './frontend')));
  app.use('*', (req, res) => {
    res.sendfile(`${__dirname}/frontend/index.html`);
  });
}

export default app;
