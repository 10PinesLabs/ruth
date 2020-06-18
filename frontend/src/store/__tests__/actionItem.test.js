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

  it('cuando el evento es de tipo agregar action item, se devuelve la descripcion', () => {
    const actionItem = {
      descripcion: 'Jugar al truco',
      owners: ['Lautaro'],
    };
    applyEvento(eventoActionItem(actionItem));
    expect(state[0].actionItem.descripcion).toEqual(actionItem.descripcion);
  });

  it('cuando el evento es de tipo agregar action item, se devuelven los owners', () => {
    const actionItem = {
      descripcion: 'Jugar al truco',
      owners: ['Lautaro', 'Mauro'],
    };
    applyEvento(eventoActionItem(actionItem));
    expect(state[0].actionItem.owners).toContain('Lautaro');
    expect(state[0].actionItem.owners).toContain('Mauro');
  });
});
