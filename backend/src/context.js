import ReunionesRepo from '~/domain/reuniones/repo';
import TemasRepo from '~/domain/temas/repo';
import EventosRepo from './domain/eventos/repo';
import UsuariosRepo from '~/domain/usuarios/repo';


export default {
  reunionesRepo: new ReunionesRepo(),
  temasRepo: new TemasRepo(),
  eventosRepo: new EventosRepo(),
  usuariosRepo: new UsuariosRepo(),
};
