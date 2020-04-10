import {produce} from "immer";
import {reactionTypes} from "./reacciones";

const historicoDeReaccionesReducer = (state = [], evento) => produce(state, (draft) => {
  if(evento.type === reactionTypes.REACCIONAR) draft.push(evento);
  return draft;
});

export default historicoDeReaccionesReducer;
