import { produce } from 'immer';
import { reacciones } from '../mobile';

export const reactionTypes = {
  REINICIAR: 'Reiniciar reacciones',
  REACCIONAR: 'Reaccionar',
  DESREACCIONAR: 'Desreaccionar',
};

function conseguiContrapartes(nombre) {
  switch (nombre) {
    case reacciones.THUMBS_DOWN:
      return [reacciones.THUMBS_UP];
    case reacciones.THUMBS_UP:
      return [reacciones.THUMBS_DOWN];
    default:
      return [];
  }
}

const addIfNotExists = (emails, newEmail) => {
  const index = emails.indexOf(newEmail);
  if (index === -1) {
    emails.push(newEmail);
  }
};

const remove = (emails, newEmail) => {
  const index = emails.indexOf(newEmail);
  if (index !== -1) {
    emails.splice(index, 1);
  }
};

export default (state = {}, evento) => produce(state, (draft) => {
  const { nombre, usuario } = evento;
  switch (evento.type) {
    case reactionTypes.REINICIAR: {
      return {};
    }
    case reactionTypes.REACCIONAR: {
      if (draft[nombre]) {
        addIfNotExists(draft[nombre], usuario.email);
      } else {
        draft[nombre] = [usuario.email];
      }

      conseguiContrapartes(nombre).forEach((contraparte) => {
        if (draft[contraparte]) {
          remove(draft[contraparte], usuario.email);
        }
      });
      break;
    }
    case reactionTypes.DESREACCIONAR: {
      if (draft[nombre]) {
        remove(draft[nombre], usuario.email);
      }
      break;
    }
    default: {
      break;
    }
  }
});
