import produce from "immer";

export const tipoDeEvento = {
  GUARDAR_CONCLUSION: "Actualizar conclusion",
};

export const conclusionReducer = (state = '', evento) => produce(state, (estadoAnterior) => {

    if(evento.type === tipoDeEvento.GUARDAR_CONCLUSION){  
      return evento.conclusion
    }
});
