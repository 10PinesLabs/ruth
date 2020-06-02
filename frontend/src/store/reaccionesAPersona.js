import {produce} from 'immer';

export const reaccionesAPersonaReducer = (state = {}, evento) => produce(state, (estadoAnterior) => {

      /*
        voy agregando a una lista con reacciones que tienen:
       {
          usuarioQueReacciona: Pepito,
          usuarioOrador: pepote,
          reaccion: thumbsUp
        }
        */

    let listaReacciones = [{
      usuarioQueReacciona: evento.usuario,
      usuarioOrador: evento.usuarioOrador,
      reaccion: evento.reaccion
    }]

    if (estadoAnterior[0]){
      listaReacciones = [...estadoAnterior,listaReacciones]
    }

    return listaReacciones;

});
