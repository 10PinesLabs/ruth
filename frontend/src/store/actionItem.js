import { produce } from 'immer';

export const tipoDeEvento = {
  AGREGAR_ACTION_ITEM: 'Agregar un action item',
  EDITAR_ACTION_ITEM: 'Editar un action item',
};

const INITIAL_ACTION_ITEMS_STATE = [];

export const actionItemReducer = (state = INITIAL_ACTION_ITEMS_STATE, evento) => produce(state, (prevActionItems) => {
  switch (evento.type) {
    case (tipoDeEvento.AGREGAR_ACTION_ITEM):
      if (prevActionItems){
        return [...prevActionItems, evento];
      } else {
        return [evento];
      }
    case (tipoDeEvento.EDITAR_ACTION_ITEM):
      if(prevActionItems[evento.actionItem.index]){
        prevActionItems[evento.actionItem.index] = evento
        return prevActionItems;
      }
  }
});
