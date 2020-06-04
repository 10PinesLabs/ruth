import {produce} from 'immer';
import {TiposReaccionAlHablar} from "../cola-de-participantes/TalkingReactions";

export const tipoDeEvento = {
  LEVANTAR_MANO: 'Quiero Hablar',
  DEJAR_DE_HABLAR: 'Quiero Dejar de Hablar',
  DESENCOLAR: 'Quiero Desencolarme',
  KICKEAR: 'Kickear al que habla',
  REACCIONARAPERSONA: 'ReaccionAOrador',
  DESREACCIONARAPERSONA: 'DesreaccionAOrador'
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

      function contarVecesQueHablo() {
        return draft.pasados.filter((usuarioPasado) => usuarioPasado.usuario.email === usuario.email).length;
      }

      if (!hayAlguienHablando(draft)) {
        draft.actual = { usuario, inicio: fecha, fin: null , reacciones: [], instanciaDeHabla: contarVecesQueHablo()} ;
      } else {
        draft.cola.push({ usuario, inicio: null, fin: null, reacciones: [],instanciaDeHabla: contarVecesQueHablo()});
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
    case tipoDeEvento.DESREACCIONARAPERSONA: {

      let reaccionesDeUsuarioReaccionando = reaccionesDelQueReacciona();

      const filtrarReaccionesContradictorias = {
        'thumbsUp' :  () => reaccionesDeUsuarioReaccionando.filter(({reaccion})=> reaccion !== TiposReaccionAlHablar.THUMBS_UP ),
        'thumbsDown' : () => reaccionesDeUsuarioReaccionando.filter(({reaccion})=> reaccion !== TiposReaccionAlHablar.THUMBS_DOWN),
        'redondeando' : () => reaccionesDeUsuarioReaccionando.filter(({reaccion})=> reaccion !== TiposReaccionAlHablar.REDONDEAR),
      }

      draft.actual.reacciones = nuevasReaccionesSegunFiltro(filtrarReaccionesContradictorias);

      break;
    }
    case tipoDeEvento.REACCIONARAPERSONA: {

      let reaccionesDeUsuarioReaccionando = reaccionesDelQueReacciona();

      const filtrarReaccionesContradictorias = {
        'thumbsUp' :  () => reaccionesDeUsuarioReaccionando.filter(({reaccion})=> reaccion !== TiposReaccionAlHablar.THUMBS_UP && reaccion !== TiposReaccionAlHablar.THUMBS_DOWN),
        'thumbsDown' : () => reaccionesDeUsuarioReaccionando.filter(({reaccion})=> reaccion !== TiposReaccionAlHablar.THUMBS_UP && reaccion !== TiposReaccionAlHablar.THUMBS_DOWN),
        'redondeando' : () => reaccionesDeUsuarioReaccionando.filter(({reaccion})=> reaccion !== TiposReaccionAlHablar.REDONDEAR),
      }

      draft.actual.reacciones = nuevasReaccionesSegunFiltro(filtrarReaccionesContradictorias);

      break;
    }

    default: {
      break
    }
  }

  function reaccionesDelQueReacciona() {
    return draft.actual.reacciones.filter(({usuarioQueReacciona, reaccion}) =>
        usuarioQueReacciona.email === evento.usuario.email &&
        draft.actual.instanciaDeHabla === evento.instanciaDeHabla
    );
  }

  function reaccionesDeUsuariosQueNoSonElQueReacciona() {
    return draft.actual.reacciones.filter(({usuarioQueReacciona, reaccion}) =>
        usuarioQueReacciona.email !== evento.usuario.email &&
        draft.actual.instanciaDeHabla === evento.instanciaDeHabla
    );
  }

  function nuevasReaccionesSegunFiltro(filtrarReaccionesContradictorias) {
    return [
      ...filtrarReaccionesContradictorias[evento.reaccion](),
      ...(reaccionesDeUsuariosQueNoSonElQueReacciona()),
      {
        usuarioQueReacciona: evento.usuario,
        reaccion: evento.reaccion,
        instanciaDeHabla: evento.instanciaDeHabla,
        tipo: evento.type
      }
    ];
  }
});
