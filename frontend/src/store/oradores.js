import { produce } from 'immer';

export const tipoDeEvento = {
  HABLAR: 'Quiero Hablar',
  DEJAR_DE_HABLAR: 'Quiero Dejar de Hablar',
  DESENCOLAR: 'Quiero Desencolarme',
};


function hayAlguienHablando(state) {
  return state.filter((orador) => !orador.fin).length === 0;
}

function estaEncoladoParaHablar(draft, nombre) {
  return draft.filter((orador) => orador.fin === null)
    .some((orador) => orador.nombre === nombre);
}

function estaHablando(orador, { nombre }) {
  return orador.nombre === nombre && orador.inicio !== null;
}

export default (state = [], evento) => produce(state, (draft) => {
  const { nombre, email, fecha } = evento;
  switch (evento.type) {
    case tipoDeEvento.HABLAR:
      hayAlguienHablando(draft) && draft.push({
        nombre, email, inicio: fecha, fin: null,
      });
      !estaEncoladoParaHablar(draft, nombre) && draft.push({
        nombre, email, inicio: null, fin: null,
      });
      break;

    case tipoDeEvento.DESENCOLAR:
      if (draft.some((orador) => estaHablando(orador, evento))) return;
      return draft.filter((orador) => orador.nombre !== nombre);

    case tipoDeEvento.DEJAR_DE_HABLAR: {
      let proximoOrador = null;
      return draft.map((orador, index) => {
        if (orador.fin) return orador;

        if (index === proximoOrador) {
          return { ...orador, inicio: fecha };
        }

        if (estaHablando(orador, evento)) {
          proximoOrador = index + 1;
          return { ...orador, fin: fecha };
        }
        return orador;
      });
    }
    default:
  }
});
