import { Op } from 'sequelize';
import models from '~/database/models';

export default class EventosRepo {
  async conseguirUltimoEventoId(){
    const ultimaReunionId = await models.Reunion.max('id');
    return ultimaReunionId && models.Evento.max('id', { where: { reunionId: ultimaReunionId } });
  }

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
