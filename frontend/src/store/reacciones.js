import { produce } from 'immer';
import { reacciones } from '../mobile/actions';
import { createEvent } from './evento'

export const reaccionEventoTypes = {
  REINICIAR: 'Reiniciar reacciones',
  REACCIONAR: 'Reaccionar',
  DESREACCIONAR: 'Desreaccionar',
};

export const reaccionEventos = {
  reaccionar: (usuario, reaccion) => createEvent(reaccionEventoTypes.REACCIONAR, {usuario, nombre: reaccion}),
  desreaccionar: (usuario, reaccion) => createEvent(reaccionEventoTypes.DESREACCIONAR, {usuario, nombre: reaccion})
}

export const INITIAL_REACCIONES_STATE = {};

export const reaccionesReducer = (state = INITIAL_REACCIONES_STATE, evento) =>
  produce(state, (draft) => {
    const { nombre, usuario } = evento;
    switch (evento.type) {
      case reaccionEventoTypes.REINICIAR: {
        return INITIAL_REACCIONES_STATE;
      }
      case reaccionEventoTypes.REACCIONAR: {
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
      case reaccionEventoTypes.DESREACCIONAR: {
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