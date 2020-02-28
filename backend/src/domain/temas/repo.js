import { pick } from 'lodash';
import models from '~/database/models';

export default class TemasRepo {
  findAll() {
    return models.Tema.findAll();
  }

  findOneById(id) {
    return models.Tema.findByPk(id);
  }

  findTemasDeReunion(id) {
    return models.Tema.findAll({
      where: {
        reunionId: id,
      },
    });
  }

  guardarTemas(reunion, temas) {
    return models.Tema.bulkCreate(temas.map((tema) => {
      const temaSanitizado = pick(tema, ['tipo', 'titulo', 'descripcion', 'duracion', 'autor', 'obligatoriedad',
        'linkDePresentacion', 'propuestas', 'temasParaRepasar', 'cantidadDeMinutosDelTema', 'prioridad', 'mailDelAutor']);
      return { ...temaSanitizado, reunionId: reunion.id };
    }));
  }

  actualizar(tema) {
    models.Tema.update(tema)
      .then((rowsUpdated) => {
        res.json(rowsUpdated);
      });
  }
}
