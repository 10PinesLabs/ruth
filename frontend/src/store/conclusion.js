import produce from "immer"


export const CONCLUSION_INITIAL_STATE = {
    actual:''
}

export const tipoDeEvento = {
    GUARDAR_CONCLUSION: 'Escribi una conclusion al tema y quiero guardarla'
}

export default (state = CONCLUSION_INITIAL_STATE, evento) => produce(state, (draft)=>{
        switch(evento.type){
            case tipoDeEvento.GUARDAR_CONCLUSION:{
                draft.actual = evento.actual
                break;
            }

        }
})