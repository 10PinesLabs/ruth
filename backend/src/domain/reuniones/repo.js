/* eslint-disable class-methods-use-this */
import models from '~/database/models';

export default class ReunionesRepo {
  findAll() {
    return models.Reunion.findAll();
  }

  findOneById(id) {
    return models.Reunion.findByPk(id);
  }

  create({ abierta,nombre }) {
    return models.Reunion.create({ abierta,nombre });
  }

  findAllOpened() {
    return models.Reunion.findAll({
      where: {
        abierta: true,
      },
    });
  }

  // TODO cambiar, repite logica

  findAllClosed() {
    return models.Reunion.findAll({
      where: {
        abierta: false,
      },
    });
  }

  save(reunion) {
    models.Reunion.update(reunion);
  }

  async findLastCreated() {
    const ultimaReunionId = await models.Reunion.max('id');
    if (!ultimaReunionId) {
      return null;
    }
    return models.Reunion.findByPk(ultimaReunionId);
  }
}
