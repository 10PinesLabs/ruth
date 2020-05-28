import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import * as path from 'path';
import cookieSession from 'cookie-session';

import apiRouter from './routes';
import logger from '~/logger';

const app = express();
require('express-ws')(app);

const cookieOptions = {
  name: 'ruth_session',
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
};

if (process.env.NODE_ENV === 'production') {
  cookieOptions.secret = process.env.SESSION_SECRET;
  // This is necessary since the app is not server directly into the internet
  // but is behind a proxy (heroku) so the machinery that express uses to check
  // if the request is secure isn't very useful (requests are secure when they
  // reach the router but the connection between the router and express is not
  //
  // To aliviate this we should trust the X-Forward-* family of headers
  // more on this https://expressjs.com/en/guide/behind-proxies.html
  app.set('trust proxy', true);
  cookieOptions.secure = true;
} else {
  cookieOptions.secure = false;
  cookieOptions.secret = process.env.SESSION_SECRET || 'secret';
}

app.use(morgan('combined', { stream: logger.stream }));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(cookieSession(cookieOptions));

app.use('/api', apiRouter());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './frontend')));
  app.use('*', (req, res) => {
    res.sendfile(`${__dirname}/frontend/index.html`);
  });
}

export default app;
