import {produce} from "immer";

export const reactionTypes = {
  REINICIAR: 'Reiniciar reacciones',
  REACCIONAR: 'Reaccionar',
  DESREACCIONAR: 'Desreaccionar'
};

function yaReacciono(draft, {nombre, usuario}) {
  return draft.some(reaccion =>
    reaccion.nombre === nombre &&
    reaccion.usuario.email === usuario.email);
}

export default (state = [], evento) => produce(state, (draft) => {
  const {nombre, usuario} = evento;

  switch (evento.type) {
    case reactionTypes.REINICIAR:
      return [];
    case reactionTypes.REACCIONAR:
      if(!yaReacciono(draft, evento))
        return draft.push({usuario, nombre});
      return draft;
    case reactionTypes.DESREACCIONAR:
      if(yaReacciono(draft, evento))
        return draft.filter(p => p.usuario.email !== usuario.email && p.nombre === nombre);
      return draft;
    default:
      return draft;
  }
});
