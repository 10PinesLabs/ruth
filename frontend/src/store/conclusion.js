import produce from "immer";

export const CONCLUSION_INITIAL_STATE = {
  actual: "",
  temaId: null,
};

export const tipoDeEvento = {
  GUARDAR_CONCLUSION: "Actualizar conclusion",
};


// export const conclusionReducer = (state = CONCLUSION_INITIAL_STATE, evento) =>
//   produce(state, (draft) => {
//     switch (evento.type) {
//       case tipoDeEvento.GUARDAR_CONCLUSION: {
//         console.log("se guarda conclusion",evento);
//         return evento.conclusion

//         break;
//       }

//       default: {
//         console.log("se va por default",evento);
//         break;
//       }
//     }
//   });


export const conclusionReducer = (state = {}, evento) => produce(state, (estadoAnterior) => {
      /*
        voy agregando a una lista con reacciones que tienen:
       {
          usuarioQueReacciona: Pepito,
          usuarioOrador: pepote,
          reaccion: thumbsUp
        }
        */
    // let listaReacciones = [{
    //   usuarioQueReacciona: evento.usuario,
    //   usuarioOrador: evento.usuarioOrador,
    //   reaccion: evento.reaccion
    // }]
    // if (estadoAnterior[0]){
    //   listaReacciones = [...estadoAnterior,listaReacciones]
    // }

    // switch (evento.type) {
    //         case tipoDeEvento.GUARDAR_CONCLUSION: {
    //           console.log("se guarda conclusion",evento);
    //           return {acutal:evento.conclusion}
      
    //           break;
    //         }
      
    //         default: {
    //           console.log("se va por default",evento);
    //           break;
    //         }
    //       }

    if(evento.type === tipoDeEvento.GUARDAR_CONCLUSION){
      debugger  
      return evento['conclusion']
    }
});
