import Requester from './requester';

const requester = Requester.createDefaultRequester();

const Backend = {
  getReunion() {
    return requester.get('/reunionActual');
  },

  publicarEvento(evento) {
    return requester.post('/eventos', evento);
  },

  empezarReunion() {
    return requester.post('/reunionDeRoots', { abierta: true });
  },

  cerrarReunion() {
    return requester.put('/reunionActual', { abierta: false });
  },

  getPerfil() {
    return requester.get('/perfil/me');
  },
};

export default Backend;
