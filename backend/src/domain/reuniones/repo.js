/* eslint-disable class-methods-use-this */
import models from '~/database/models';

export default class ReunionesRepo {
  findAll() {
    return models.Reunion.findAll();
  }

  findOneById(id) {
    return models.Reunion.findByPk(id);
  }

  create({ abierta, nombre, configuracion }) {
    return models.Reunion.create({ abierta, nombre, configuracion });
  }

  findAllWhereOpened(isOpened) {
    return models.Reunion.findAll({
      where: {
        abierta: isOpened,
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
