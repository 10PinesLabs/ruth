function hayAlguienHablando(state) {
  return state.filter((orador) => !orador.fin).length === 0;
}

export default function oradoresReducer(state = [], evento) {
  // TODO: Ver qué hacer cuando se vuelve a encolar una misma persona
  switch (evento.type) {
    case 'Quiero Hablar':
      if (hayAlguienHablando(state)) {
        return [...state, {
          nombre: evento.nombre, email: evento.email, inicio: evento.fecha, fin: null,
        }];
      }
      return [...state, {
        nombre: evento.nombre, email: evento.email, inicio: null, fin: null,
      }];

    case 'Quiero Desencolarme':
      if (state.some((orador) => orador.nombre === evento.nombre && orador.inicio != null)) return state;
      return state.filter((orador) => orador.nombre !== evento.nombre);
    case 'Quiero Dejar de Hablar': {
      let proximoOrador = null;
      return state.map((orador, index) => {
        if (index === proximoOrador) {
          return { ...orador, inicio: evento.fecha };
        }
        if (orador.nombre === evento.nombre) {
          proximoOrador = index + 1;
          return { ...orador, fin: evento.fecha };
        }
        return orador;
      });
    }
    default:
      return state;
  }
}
