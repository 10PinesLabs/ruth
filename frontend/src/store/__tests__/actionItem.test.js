import { actionItemReducer, tipoDeEvento } from '../actionItem';

const eventoAgregarActionItem = (actionItem) => ({
  type: tipoDeEvento.AGREGAR_ACTION_ITEM,
  actionItem,
});

const eventoEditarActionItem = (actionItem) => ({
  type: tipoDeEvento.EDITAR_ACTION_ITEM,
  actionItem,
});

describe(`# action items!`, () => {
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

  describe("cuando el evento es de tipo editar action item", () => {

    const actionItemAgregado = {
      descripcion: 'Jugar a la play',
      owners: ['Lautaro'],
    };

    beforeEach(() => {
      applyEvento(eventoAgregarActionItem(actionItemAgregado));
    });
    
    it(' y ya existia el elemento que se quiere editar, ' +
      'su descripción y owners son editados', () => {
      
      const actionItemEditadoConIndexExistente = {
        descripcion: 'Bailarse unos temazos',
        owners: ['Lautaro','Mauro'],
        index: 0
      };
      applyEvento(eventoEditarActionItem(actionItemEditadoConIndexExistente));

      expect(state[0].actionItem.descripcion).toEqual(actionItemEditadoConIndexExistente.descripcion);
      expect(state[0].actionItem.owners).toContain('Lautaro');
      expect(state[0].actionItem.owners).toContain('Mauro');
    });

    it('y el index de edicion no pertenece a ningun elemento existente, ' +
      'los action items quedan en el estado anterior', () => {
      
      const actionItemEditadoConIndexInexistente = {
        descripcion: 'Bailarse unos temazos',
        owners: ['Lautaro','Mauro'],
        index: 1
      };
      applyEvento(eventoEditarActionItem(actionItemEditadoConIndexInexistente));

      expect(state[0].actionItem.descripcion).toEqual(actionItemAgregado.descripcion);
      expect(state[0].actionItem.owners).toContain('Lautaro');
      expect(state[0].actionItem.owners).not.toContain('Mauro');
    });
  })
});
