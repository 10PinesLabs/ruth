import {produce} from 'immer';

export const tipoDeEvento = {
  AGREGAR_ACTION_ITEM: 'Agregar un action item',
  EDITAR_ACTION_ITEM: 'Editar un action item',
  BORRAR_ACTION_ITEM: 'Borrar action item'
};

export const INITIAL_ACTION_ITEMS_STATE = [];

export const actionItemReducer = (state = INITIAL_ACTION_ITEMS_STATE, evento) => produce(state, (prevActionItems) => {
  switch (evento.type) {
    case (tipoDeEvento.AGREGAR_ACTION_ITEM):
      prevActionItems.push(evento);
      break;
    case (tipoDeEvento.EDITAR_ACTION_ITEM):
      let indexDeActionItemAEditar = prevActionItems.findIndex((actionItem) => actionItem.id === evento.actionItem.id)
      if(prevActionItems[indexDeActionItemAEditar]){
        prevActionItems[indexDeActionItemAEditar] = evento
      }
      break;
    case (tipoDeEvento.BORRAR_ACTION_ITEM):
      let indexDeActionItemABorrar = prevActionItems.findIndex(actionItem =>actionItem.id === evento.actionItem.id)
      if(indexDeActionItemABorrar>=0){
        prevActionItems.splice(indexDeActionItemABorrar, 1)
      }
      break;
    default:
      console.error("Se recibio un eventode actionItem desconocido")
      break;
  }
});
