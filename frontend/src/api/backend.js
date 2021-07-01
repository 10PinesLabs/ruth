import Requester from './requester';

const requester = Requester.createDefaultRequester();

const Backend = {
  getReunion(id) {
    return requester.get(`/reunion/${id}`);
  },

  publicarEvento(evento) {
    return requester.post('/eventos', evento);
  },

  empezarReunion(opcionesDeReunion) {
    return requester.post('/reunionDeRoots', { abierta: true, ...opcionesDeReunion });
  },

  cerrarReunion(id, temas) {
    return requester.put('/reunion', { id, abierta: false, temas });
  },

  getPerfil() {
    return requester.get('/perfil/me');
  },

  getUsuarios() {
    return requester.get('/usuarios');
  },

  obtenerReuniones(estaActiva) {
    return requester.get(`/reuniones?estaAbierta=${estaActiva}`);
  },
};

export default Backend;
