import {produce} from 'immer';
import {reacciones} from "../mobile";

export const reactionTypes = {
  REINICIAR: 'Reiniciar reacciones',
  REACCIONAR: 'Reaccionar',
  DESREACCIONAR: 'Desreaccionar',
};

function yaReacciono(draft, {nombre, usuario}) {
  return draft.some((reaccion) => reaccion.nombre === nombre
    && reaccion.usuario.email === usuario.email);
}

export default (state = [], evento) => produce(state, (draft) => {
    const {nombre, usuario, fecha} = evento;
    switch (evento.type) {
      case reactionTypes.REINICIAR: {
        return draft = [];
      }
      case reactionTypes.REACCIONAR: {

        switch (evento.nombre) {
          case reacciones.THUMBS_UP:
            return [...draft.filter(r => (r.nombre !== reacciones.THUMBS_DOWN && usuario.email === r.usuario.email)
              || (usuario.email !== r.usuario.email)), { nombre, usuario, fecha }];
          case reacciones.THUMBS_DOWN:
            return [...draft.filter(r => (r.nombre !== reacciones.THUMBS_UP && usuario.email === r.usuario.email) ||
              (usuario.email !== r.usuario.email)), { nombre, usuario, fecha }];
          default:
            !yaReacciono(draft, evento) && draft.push({usuario, nombre});
        }
      }
        break;
      case
      reactionTypes.DESREACCIONAR
      : {
        if (yaReacciono(draft, evento)) draft = draft.filter((p) => (p.usuario.email !== usuario.email && p.nombre === nombre) || p.nombre !== nombre);
        return draft;
      }
      default: {
        return draft;
      }
    }
  }
)
;
