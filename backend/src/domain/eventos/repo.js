import { Op } from 'sequelize';
import models from '~/database/models';

export default class EventosRepo {
  findEventosParaReunion(lastEvent = undefined, reunionId){
    const whereClause = { reunionId };

    if (lastEvent) {
      whereClause.id = { [Op.gt]: lastEvent };
    }

    return models.Evento.findAll({ where: whereClause, order: [['id', 'ASC']] });
  }

  guardarEvento({ evento, temaId, reunionId }){
    return models.Evento.create({ evento, temaId, reunionId });
  }
}
