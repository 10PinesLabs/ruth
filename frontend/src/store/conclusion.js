import produce from "immer";

export const tipoDeEvento = {
  GUARDAR_CONCLUSION: "Actualizar conclusion",
  GUARDAR_MINUTA:"Actualizar resumen de lo que dijo un pine"
};

export const INITIAL_CONCLUSION = ''

export const conclusionReducer = (state = INITIAL_CONCLUSION, evento) => produce(state, (estadoAnterior) => {

  switch(evento.type){
    case(tipoDeEvento.GUARDAR_CONCLUSION):
      return evento.conclusion;
      
  }

});
