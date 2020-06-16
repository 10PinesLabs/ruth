import { actionItemReducer, tipoDeEvento } from '../actionItem';

const eventoActionItem = (actionItem) => ({
  type: tipoDeEvento.AGREGAR_ACTION_ITEM,
  actionItem,
});
describe(`#${tipoDeEvento.AGREGAR_ACTION_ITEM}`, () => {
  let state;

  beforeEach(() => {
    state = [];
  });

  const applyEvento = (ev) => {
    state = actionItemReducer(state, ev);
  };

  it('con un evento desconocido, no hace nada', () => {
    applyEvento({ type: 'UNKNOWN' });
    expect(state).toEqual([]);
  });

  it('cuando el evento es de tipo agregar action item, se devuelve la conclusion', () => {
    const actionItem = {
      descripcion: 'Jugar al truco',
      owner: 'Lautaro',
    };
    applyEvento(eventoActionItem(actionItem));
    expect(state[0].actionItem.descripcion).toEqual(actionItem.descripcion);
  });
});
