import produce from "immer";
import { createEvent } from './util'

export const conclusionEventoType = {
  GUARDAR_CONCLUSION: "Actualizar conclusion",
};

export const conclusionEventos = {
  guardarConclusion: (conclusion) => createEvent(conclusionEventoType.GUARDAR_CONCLUSION, {conclusion})
}

export const INITIAL_CONCLUSION = ''

export const conclusionReducer = (state = INITIAL_CONCLUSION, evento) => produce(state, (estadoAnterior) => {

  switch(evento.type){
    case(conclusionEventoType.GUARDAR_CONCLUSION):
      return evento.conclusion;
    default:
      console.error("Se recibio un evento de tipo conclusion desconocido.")
      break;
  }

});
