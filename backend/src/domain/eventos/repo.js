import { Op } from 'sequelize';
import models from '~/database/models';

export default class EventosRepo {
  async conseguirUltimoEventoId() {
    const ultimaReunionId = await models.Reunion.max('id');
    return ultimaReunionId && models.Evento.max('id', { where: { reunionId: ultimaReunionId } });
  }

  async findEventosUltimaReunion(lastEvent = undefined) {
    const reunionId = await models.Reunion.max('id');
    const whereClause = { reunionId };

    if (lastEvent) {
      whereClause.id = { [Op.gt]: lastEvent };
    }

    return models.Evento.findAll({ where: whereClause, order: [['id', 'ASC']] });
  }

  guardarEvento({ evento, idTema, reunionId }) {
    return models.Evento.create({ evento, idTema, reunionId });
  }
}
