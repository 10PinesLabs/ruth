import { produce } from 'immer';

export const historicoDeReaccionesReducer = (state = [], newReacciones, action) => produce(state, (draft) => {
  const keys = Object.keys(newReacciones);
  const newSnapshot = {};

  keys.forEach((key) => {
    newSnapshot[key] = newReacciones[key].length;
  });
  if (action.fecha) {
    draft.push({ reacciones: newSnapshot, fecha: action.fecha });
  }
});
