import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Backend from './api/backend';
import Loading from "./common-pages/Loading";
import App from "./App";


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

    if (cargando || !usuario) return <Loading />;

    return (
      <Router>
        <App usuario={usuario}/>
      </Router>
    );
  }
}
