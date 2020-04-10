import { produce } from 'immer';

export const tipoDeEvento = {
  HABLAR: 'Quiero Hablar',
  DEJAR_DE_HABLAR: 'Quiero Dejar de Hablar',
  DESENCOLAR: 'Quiero Desencolarme',
  KICKEAR: 'Kickear al que habla'
};


function hayAlguienHablando(state) {
  return state.filter((orador) => !orador.fin).length === 0;
}

function estaEncoladoParaHablar(draft, usuario) {
  return draft.filter((orador) => orador.fin === null)
    .some((orador) => orador.usuario.nombre === usuario.nombre);
}

function estaHablando(orador, evento) {
  return orador.usuario.nombre === evento.usuario.nombre && orador.inicio !== null;
}

function terminarTurnoDeOrador(draft, evento) {
  let proximoOrador = null;
  const yaHablo = orador => orador.fin;
  const estaHablando = orador => orador.inicio && !orador.fin;

  return draft.map((orador, index) => {
    if (yaHablo(orador)) return orador;

    if (index === proximoOrador) {
      return {...orador, inicio: evento.fecha};
    }

    if (estaHablando(orador)) {
      proximoOrador = index + 1;
      return {...orador, fin: evento.fecha};
    }

    return orador;
  });
}

export default (state = [], evento) => produce(state, (draft) => {
  debugger;
  const { usuario, fecha } = evento;
  switch (evento.type) {
    case tipoDeEvento.KICKEAR: {
      return terminarTurnoDeOrador(draft, evento)
    }

    case tipoDeEvento.HABLAR:
      hayAlguienHablando(draft) && draft.push({
        usuario, inicio: fecha, fin: null,
      });
      !estaEncoladoParaHablar(draft, usuario) && draft.push({
        usuario, inicio: null, fin: null,
      });
      break;

    case tipoDeEvento.DESENCOLAR: {
      if (draft.some((orador) => estaHablando(orador, evento))) return;
      return draft.filter((orador) => orador.usuario.nombre !== usuario.nombre);
    }
    case tipoDeEvento.DEJAR_DE_HABLAR: {
      return terminarTurnoDeOrador(draft, evento);
    }
    default:
  }
});
