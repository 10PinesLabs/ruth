import { produce } from 'immer';
import { TiposReaccionAlHablar } from "../cola-de-participantes/TalkingReactions";
import { createEvent } from "./evento";
import lodash from "lodash";

export const oradorEventoTypes = {
  LEVANTAR_MANO: 'Quiero Hablar',
  DEJAR_DE_HABLAR: 'Quiero Dejar de Hablar',
  DESENCOLAR: 'Quiero Desencolarme',
  KICKEAR: 'Kickear al que habla',
  REACCIONAR_A_ORADOR: 'ReaccionAOrador',
  DESREACCIONAR_A_ORADOR: 'DesreaccionAOrador',
  RESUMIR_A_ORADOR: 'Actualizar resumen de orador'
};

export const oradorEventos = {
  levantarMano: (usuario) =>
    createEvent(oradorEventoTypes.LEVANTAR_MANO, { usuario }),
  dejarDeHablar: (usuario) =>
    createEvent(oradorEventoTypes.DEJAR_DE_HABLAR, { usuario }),
  desencolar: (usuario) =>
    createEvent(oradorEventoTypes.DESENCOLAR, { usuario }),
  kickear: (usuario) =>
    createEvent(oradorEventoTypes.KICKEAR, { kickearA: usuario }),
  reaccionarAOrador: (reaccion, usuario, instanciaDeHabla) =>
    createEvent(oradorEventoTypes.REACCIONAR_A_ORADOR, {
      reaccion,
      usuario,
      instanciaDeHabla,
    }),
  desreaccionarAOrador: (reaccion, usuario, instanciaDeHabla) =>
    createEvent(oradorEventoTypes.DESREACCIONAR_A_ORADOR, {
      reaccion,
      usuario,
      instanciaDeHabla,
    }),
  resumirAOrador: (indexExposicion, resumen) =>
    createEvent(oradorEventoTypes.RESUMIR_A_ORADOR, {
      indexExposicion,
      resumen,
    }),
};

export const INITIAL_ORADORES_STATE = {
  pasados: [],
  actual: null,
  cola: [],
};

export const oradoresReducer = (state = INITIAL_ORADORES_STATE, evento) =>
  produce(state, (draft) => {
    const { usuario, fecha } = evento;
    switch (evento.type) {
      case oradorEventoTypes.KICKEAR: {
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
      case oradorEventoTypes.LEVANTAR_MANO: {
        // Si la persona ya esta hablando o esta encolado no hacemos nada
        if (estaEncoladoParaHablar(draft, usuario) || estaHablando(draft, usuario.nombre)) {
          return;
        }

        function contarVecesQueHablo() {
          return draft.pasados.filter((usuarioPasado) => usuarioPasado.usuario.email === usuario.email).length;
        }

        const reacciones = {
          [TiposReaccionAlHablar.THUMBS_UP]: [],
          [TiposReaccionAlHablar.THUMBS_DOWN]: [],
          [TiposReaccionAlHablar.REDONDEAR]: []
        };

        if (!hayAlguienHablando(draft)) {
          draft.actual = {usuario, inicio: fecha, fin: null, reacciones, instanciaDeHabla: contarVecesQueHablo()};
        } else {
          draft.cola.push({usuario, inicio: null, fin: null, reacciones, instanciaDeHabla: contarVecesQueHablo()});
        }
        break;
      }

      case oradorEventoTypes.DESENCOLAR: {
        if (estaHablando(draft, usuario.nombre)) {
          return;
        }
        draft.cola = draft.cola.filter((orador) => orador.usuario.nombre !== usuario.nombre);
        break;
      }
      case oradorEventoTypes.DEJAR_DE_HABLAR: {
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
      case oradorEventoTypes.DESREACCIONAR_A_ORADOR: {

        lodash.set(draft, `actual.reacciones.${evento.reaccion}`,listaDeReaccionSinUsuarioReaccionante(evento.reaccion));

        break;
      }
      case oradorEventoTypes.REACCIONAR_A_ORADOR: {

        const nuevaReaccion = {email: evento.usuario.email, instanciaDeHabla: evento.instanciaDeHabla};

        ({
          [TiposReaccionAlHablar.THUMBS_UP]: () => {
            draft.actual.reacciones.thumbsUp.push(nuevaReaccion)
            draft.actual.reacciones.thumbsDown = listaDeReaccionSinUsuarioReaccionante(TiposReaccionAlHablar.THUMBS_DOWN)
          },
          [TiposReaccionAlHablar.THUMBS_DOWN]: () => {
            draft.actual.reacciones.thumbsDown.push(nuevaReaccion)
            draft.actual.reacciones.thumbsUp = listaDeReaccionSinUsuarioReaccionante(TiposReaccionAlHablar.THUMBS_UP)
          },
          [TiposReaccionAlHablar.REDONDEAR]: () => draft.actual.reacciones.redondeando.push(nuevaReaccion)
          })[evento.reaccion]()

        break;
      }
      case oradorEventoTypes.RESUMIR_A_ORADOR: {
        if(draft.pasados.length>evento.indexExposicion){
          draft.pasados[evento.indexExposicion].resumen = evento.resumen
        }else 
        draft.actual.resumen = evento.resumen
        break;
      }
      default: {
        break
      }
    }

    function listaDeReaccionSinUsuarioReaccionante(tipoReaccion){
      return draft.actual.reacciones[tipoReaccion].filter((reaccion) =>
          reaccion.email !== evento.usuario.email &&
          reaccion.instanciaDeHabla === evento.instanciaDeHabla
      );
    }
  });

function hayAlguienHablando(state) {
  return state.actual !== null;
}

function estaEncoladoParaHablar(draft, usuario) {
  return draft.cola.some((orador) => orador.usuario.nombre === usuario.nombre);
}

function estaHablando(draft, nombre) {
  return draft.actual && draft.actual.usuario.nombre === nombre;
}
