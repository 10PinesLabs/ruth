import React from 'react';
import { createBrowserHistory } from 'history';
import {
  Route, Router, Switch,
} from 'react-router-dom';
import App from './App';
import Backend from './api/backend';

const history = createBrowserHistory();

export default class Authenticator extends React.Component {
  state = {
    usuario: null,
    cargando: true,
  };

  componentDidMount() {
    Backend.getPerfil()
      .then((usuario) => this.setState({ usuario }))
      .catch((error) => {
        if (error.response.status === 403) {
          global.window.location.href = `https://${process.env.REACT_APP_BACKOFFICE_URL}/auth/sign_in?redirect_url=${window.location.origin}/api/auth/callback&app_id=ruth-app`;
        }
      })
      .finally(() => this.setState({ cargando: false }));
  }

  render() {
    const { cargando, usuario } = this.state;

    if (cargando) return <h1>Cargando</h1>;
    if (!usuario) return <h1>Autenticando...</h1>;

    return (
      <Router history={history}>
        <App usuario={usuario}/>
      </Router>
    );
  }
}
