import {produce} from 'immer';

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

function estaHablando(orador, nombre) {
  return orador.usuario.nombre === nombre && orador.inicio !== null && orador.fin === null;
}

const yaHablo = orador => orador.fin;

export default (state = [], evento) => produce(state, (draft) => {
  debugger;
  const {usuario, fecha} = evento;
  switch (evento.type) {
    case tipoDeEvento.KICKEAR: {
      let proximoOrador = null;
      if(!evento.kickearA) return;
      return draft.map((orador, index) => {
        if (yaHablo(orador)) return orador;

        if (index === proximoOrador) {
          return {...orador, inicio: evento.fecha};
        }

        if (estaHablando(orador, evento.kickearA.nombre)) {
          proximoOrador = index + 1;
          return {...orador, fin: evento.fecha};
        }

        return orador;
      });
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
      if (draft.some((orador) => estaHablando(orador, usuario.nombre) || yaHablo(orador))) return;
      return draft.filter((orador) => orador.usuario.nombre !== usuario.nombre);
    }
    case tipoDeEvento.DEJAR_DE_HABLAR: {
      let proximoOrador = null;

      return draft.map((orador, index) => {
        if (yaHablo(orador)) return orador;

        if (index === proximoOrador) {
          return {...orador, inicio: evento.fecha};
        }

        if (estaHablando(orador, usuario.nombre)) {
          proximoOrador = index + 1;
          return {...orador, fin: evento.fecha};
        }

        return orador;
      });
    }
    default:
  }
});
