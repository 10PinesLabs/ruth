import Requester from './requester';

const requester = Requester.createDefaultRequester();

const Backend = {
  getReunion() {
    return requester.get('/reunionActual');
  },

  empezarReunion() {
    return requester.post('/reunionDeRoots', { abierta: true });
  },

  cerrarReunion() {
    return requester.put('/reunionActual', { abierta: false });
  },

  getTemas() {
    return requester.get('/temas/obtener');
  },
};

export default Backend;
