import produce from "immer";

export const tipoDeEvento = {
  GUARDAR_CONCLUSION: "Actualizar conclusion",
};

export const conclusionReducer = (state = '', evento) => produce(state, (estadoAnterior) => {

  switch(evento.type){
    case(tipoDeEvento.GUARDAR_CONCLUSION):
      return evento.conclusion;
      
  }

});
