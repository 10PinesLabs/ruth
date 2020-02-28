
export class GuardiaDeEventos {
  constructor(eventosRepo) {
    this.eventosRepo = eventosRepo;
  }

  async esValido(evento) {
    const ultimoEventoId = await this.eventosRepo.conseguirUltimoEventoId();
    console.log('ultimoEvento', ultimoEventoId);

    if (!ultimoEventoId && !evento.ultimoEventoId) {
      return true;
    }

    return ultimoEventoId === evento.ultimoEventoId;
  }
}
