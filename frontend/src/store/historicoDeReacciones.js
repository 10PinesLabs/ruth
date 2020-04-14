import {produce} from "immer";
import {reactionTypes} from "./reacciones";
import {reacciones} from "../mobile";

function elNombreDelEventoEs(evento, nombreEvento) {
  return evento.nombre === nombreEvento;
}

function elUsuarioYaRealizoLaReaccionContraria(draft, usuario, reaccionContraria) {
  return draft.some(event => event.usuario.email === usuario.email && event.nombre === reaccionContraria);
}

function peroYaFueContrarrestada(draft, usuario, reaccionActual, reaccionContraria) {
  /*
  *  Estoy super quemada pero deberia funcionar.
  *  El caso que contempla es si:
  *  +1 Reaccion
  *  -1 Reaccion
  *  +1 Desrreaccion (lo genera el reductor)
  *  -1 Desrreaccion (por el usuario. En este caso queda en "neutro")
  *  +1 Reaccion => Esta deberia sumarla, no contrarrestarla.
  * */
  const reaccionesAlEvento = draft.filter(event => event.usuario.email === usuario.email && event.nombre === reaccionActual && event.type === reactionTypes.REACCIONAR);
  const desrreaccionesAlEvento = draft.filter(event => event.usuario.email === usuario.email && event.nombre === reaccionActual && event.type === reactionTypes.DESREACCIONAR);

  const reaccionesContrariasAlEvento = draft.filter(event => event.usuario.email === usuario.email && event.nombre === reaccionContraria && event.type === reactionTypes.REACCIONAR);
  const desrreaccionesContrariasAlEvento = draft.filter(event => event.usuario.email === usuario.email && event.nombre === reaccionContraria && event.type === reactionTypes.DESREACCIONAR);

  return (reaccionesAlEvento.length - 1 === desrreaccionesAlEvento.length) && (reaccionesContrariasAlEvento.length === desrreaccionesContrariasAlEvento.length);
}

const historicoDeReaccionesReducer = (state = [], evento) => produce(state, (draft) => {
  switch(evento.type){
    case reactionTypes.REACCIONAR:
      draft.push(evento); // agrego el nuevo evento, siempre

      const {usuario} = evento;
      if(elNombreDelEventoEs(evento, reacciones.THUMBS_UP)
        && elUsuarioYaRealizoLaReaccionContraria(draft, usuario, reacciones.THUMBS_DOWN) &&
        !peroYaFueContrarrestada(draft, usuario, reacciones.THUMBS_UP, reacciones.THUMBS_DOWN)
      ){
        draft.push({...evento, type: reactionTypes.DESREACCIONAR, nombre: reacciones.THUMBS_DOWN});
      }

      if(elNombreDelEventoEs(evento, reacciones.THUMBS_DOWN)
        && elUsuarioYaRealizoLaReaccionContraria(draft, usuario, reacciones.THUMBS_UP) &&
        !peroYaFueContrarrestada(draft, usuario, reacciones.THUMBS_DOWN, reacciones.THUMBS_UP)
      ){
          draft.push({...evento, type: reactionTypes.DESREACCIONAR, nombre: reacciones.THUMBS_UP});
  }
      break;
    case reactionTypes.DESREACCIONAR:
      draft.push(evento);
      break;
    default:
      return draft;
  }
});

export default historicoDeReaccionesReducer;
