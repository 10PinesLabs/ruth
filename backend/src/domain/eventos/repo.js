import models from '~/database/models';

export default class EventosRepo {
  async conseguirUltimoEventoId() {
    const ultimaReunionId = await models.Reunion.max('id');
    return ultimaReunionId && models.Evento.max('id', { where: { reunionId: ultimaReunionId } });
  }

  async findEventosUltimaReunion() {
    const reunionId = await models.Reunion.max('id');
    return models.Evento.findAll({ where: { reunionId } });
  }

  guardarEvento({ evento, temaId, reunionId }) {
    return models.Evento.create({ evento, temaId, reunionId });
  }
}
