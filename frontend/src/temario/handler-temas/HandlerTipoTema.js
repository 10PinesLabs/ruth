import HandlerTemaComun from './HandlerTemaComun';
import HandlerPropuestaPinos from './HandlerPropuestaPinos';

class HandlerTipoTema {
  constructor() {
    this.tipos = [HandlerTemaComun, HandlerPropuestaPinos];
  }

  handleTipoTema(tema) {
    const tipoTemaHandler = this.tipos.filter((tipo) => tipo.canHandle(tema.tipo))[0];
    return tipoTemaHandler.handleTema(tema);
  }
}

export default HandlerTipoTema;
