import { produce } from 'immer';

export const tipoDeEvento = {
  LEVANTAR_MANO: 'Quiero Hablar',
  DEJAR_DE_HABLAR: 'Quiero Dejar de Hablar',
  DESENCOLAR: 'Quiero Desencolarme',
  KICKEAR: 'Kickear al que habla',
};


function hayAlguienHablando(state) {
  return state.actual !== null;
}

function estaEncoladoParaHablar(draft, usuario) {
  return draft.cola.some((orador) => orador.usuario.nombre === usuario.nombre);
}

function estaHablando(draft, nombre) {
  return draft.actual && draft.actual.usuario.nombre === nombre;
}

export const INITIAL_ORADORES_STATE = {
  pasados: [],
  actual: null,
  cola: [],
};

export default (state = INITIAL_ORADORES_STATE, evento) => produce(state, (draft) => {
  const { usuario, fecha } = evento;
  switch (evento.type) {
    case tipoDeEvento.KICKEAR: {
      if (!estaHablando(draft, evento.kickearA.nombre)) {
        return;
      }
      const oradorActual = draft.actual;
      oradorActual.fin = fecha;
      draft.pasados.push(oradorActual);

      const nextOrador = draft.cola.shift();
      if (!nextOrador) {
        draft.actual = null;
        return;
      }

      nextOrador.inicio = fecha;
      draft.actual = nextOrador;
      break;
    }
    case tipoDeEvento.LEVANTAR_MANO: {
      // Si la persona ya esta hablando o esta encolado no hacemos nada
      if (estaEncoladoParaHablar(draft, usuario) || estaHablando(draft, usuario.nombre)) {
        return;
      }

      if (!hayAlguienHablando(draft)) {
        draft.actual = { usuario, inicio: fecha, fin: null };
      } else {
        draft.cola.push({ usuario, inicio: null, fin: null });
      }
      break;
    }

    case tipoDeEvento.DESENCOLAR: {
      if (estaHablando(draft, usuario.nombre)) {
        return;
      }
      draft.cola = draft.cola.filter((orador) => orador.usuario.nombre !== usuario.nombre);
      break;
    }
    case tipoDeEvento.DEJAR_DE_HABLAR: {
      if (!estaHablando(draft, usuario.nombre)) {
        return;
      }
      const oradorActual = draft.actual;
      oradorActual.fin = fecha;
      draft.pasados.push(oradorActual);

      const nextOrador = draft.cola.shift();
      if (!nextOrador) {
        draft.actual = null;
        return;
      }

      nextOrador.inicio = fecha;
      draft.actual = nextOrador;
      break;
    }
    default: {
      break
    }
  }
});
