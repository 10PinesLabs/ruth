import {actionItemReducer, INITIAL_ACTION_ITEMS_STATE, tipoDeEvento} from '../actionItem';

const eventoAgregarActionItem = (actionItem) => ({
  type: tipoDeEvento.AGREGAR_ACTION_ITEM,
  id: 1,
  actionItem,
});

const eventoEditarActionItem = (actionItem) => ({
  type: tipoDeEvento.EDITAR_ACTION_ITEM,
  actionItem,
});

describe(`# action items!`, () => {
  let state;

  beforeEach(() => {
    state = INITIAL_ACTION_ITEMS_STATE;
  });

  const applyEvento = (ev) => {
    state = actionItemReducer(state, ev);
  };

  it('con un evento desconocido, no hace nada', () => {
    applyEvento({ type: 'UNKNOWN' });
    expect(state).toEqual([]);
  });
  
  it('cuando el evento es de tipo agregar action item, se puede obtener la descripcion', () => {
    const actionItem = {
      descripcion: 'Jugar al truco',
      owners: ['Lautaro'],
    };
    applyEvento(eventoAgregarActionItem(actionItem));
    expect(state[0].actionItem.descripcion).toEqual(actionItem.descripcion);
  });

  it('cuando el evento es de tipo agregar action item, se pueden obtener los owners', () => {
    const actionItem = {
      descripcion: 'Jugar al truco',
      owners: ['Lautaro', 'Mauro'],
    };
    applyEvento(eventoAgregarActionItem(actionItem));
    expect(state[0].actionItem.owners).toContain('Lautaro');
    expect(state[0].actionItem.owners).toContain('Mauro');
  });

  describe("cuando ya tengo un action item para el tema,", () => {

    const actionItemAgregado = {
      descripcion: 'Jugar a la play',
      owners: ['Lautaro'],
    };

    beforeEach(() => {
      applyEvento(eventoAgregarActionItem(actionItemAgregado));
    });
    
    it(' llega un evento de edicion y ya existia el elemento que se quiere editar, ' +
      'su descripción y owners son editados', () => {
      
      const actionItemEditadoConIndexExistente = {
        descripcion: 'Bailarse unos temazos',
        owners: ['Lautaro','Mauro'],
        id: 1
      };
      
      applyEvento(eventoEditarActionItem(actionItemEditadoConIndexExistente));

      expect(state[0].actionItem.descripcion).toEqual(actionItemEditadoConIndexExistente.descripcion);
      expect(state[0].actionItem.owners).toContain('Lautaro');
      expect(state[0].actionItem.owners).toContain('Mauro');
    });

    it(' llega un evento de edicion y el index de edicion no pertenece a ningun elemento existente, ' +
      'los action items quedan en el estado anterior', () => {
      
      const actionItemEditadoConIndexInexistente = {
        descripcion: 'Bailarse unos temazos',
        owners: ['Lautaro','Mauro'],
        id: 2
      };
      applyEvento(eventoEditarActionItem(actionItemEditadoConIndexInexistente));

      expect(state[0].actionItem.descripcion).toEqual(actionItemAgregado.descripcion);
      expect(state[0].actionItem.owners).toContain('Lautaro');
      expect(state[0].actionItem.owners).not.toContain('Mauro');
    });
  })
});
