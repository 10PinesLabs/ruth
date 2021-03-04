import Requester from './requester';

const requester = Requester.createDefaultRequester();

const Backend = {
  getReunion(id) {
    return requester.get('/reunionActual/'+id);
  },

  publicarEvento(evento) {
    return requester.post('/eventos', evento);
  },

  empezarReunion(opcionesDeReunion) {
    return requester.post('/reunionDeRoots', { abierta: true,...opcionesDeReunion });
  },

  cerrarReunion(id,temas) {
    return requester.put('/reunionActual', { id,abierta: false, temas });
  },

  getPerfil() {
    return requester.get('/perfil/me');
  },

  getUsuarios() {
    return requester.get('/usuarios');
  },

  obtenerReunionesAbiertas(){
    return requester.get('/reuniones/abiertas');
  }
};

export default Backend;
