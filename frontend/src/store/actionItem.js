import { produce } from 'immer';

export const tipoDeEvento = {
  AGREGAR_ACTION_ITEM: 'Agregar un action item',
};

const INITIAL_ACTION_ITEMS_STATE = [];

export const actionItemReducer = (state = INITIAL_ACTION_ITEMS_STATE, evento) => produce(state, (draft) => {
  switch (evento.type) {
    case (tipoDeEvento.AGREGAR_ACTION_ITEM):
      if (draft.actionItems){
        return [...draft.actionItems, evento];
      } else {
        return [evento];
      }

  }
});
