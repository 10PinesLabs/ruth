import models from '~/database/models';

export default class UsuariosRepo {
  async obtenerTodos() {
    return models.Usuario.findAll();
  }

  guardarOActualizarUsuario({
    id, usuario, email, nombre,
  }) {
    models.Usuario.upsert({
      id, usuario, email, nombre,
    });
  }
}
