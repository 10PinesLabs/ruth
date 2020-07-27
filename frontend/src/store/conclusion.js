import produce from "immer";
import { createEvent } from './evento'

export const conclusionEventoTypes = {
  GUARDAR_CONCLUSION: "Actualizar conclusion",
};

export const conclusionEventos = {
  guardarConclusion: (conclusion) => createEvent(conclusionEventoTypes.GUARDAR_CONCLUSION, {conclusion})
}

export const INITIAL_CONCLUSION = ''

export const conclusionReducer = (state = INITIAL_CONCLUSION, evento) => produce(state, (estadoAnterior) => {

  switch(evento.type){
    case(conclusionEventoTypes.GUARDAR_CONCLUSION):
      return evento.conclusion;
    default:
      console.error("Se recibio un evento de tipo conclusion desconocido.")
      break;
  }

});
