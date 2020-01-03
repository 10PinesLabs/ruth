import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import * as serviceWorker from './serviceWorker';

import Authenticator from './Authenticator';

const history = createBrowserHistory();

ReactDOM.render(
  <Authenticator />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
