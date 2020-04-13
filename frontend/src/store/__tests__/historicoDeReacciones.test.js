import {reactionTypes} from "../reacciones";
import historicoDeReacciones from '../historicoDeReacciones';

const unUsuario = {
  email: 'unEmail@email',
  nombre: 'Un Email',
};

describe('historicoDeReaccionesReducer', () => {
  let state;
  let evento;

  describe(`${reactionTypes.REACCIONAR}`, () => {
    beforeEach(() => {
      evento = {
        type: reactionTypes.REACCIONAR,
        nombre: 'unaReaccion',
        usuario: unUsuario,
        fecha: 'primerFecha'
      };
      state = [];
    });

    it('Cuando no hay ninguna reaccion, se guarda la reaccion y queda primera', () => {
      expect(historicoDeReacciones(state, evento)).toEqual([evento])
    });

    it('Cuando hay mas de una reaccion, se guarda al final', () => {
      const evento2 = {...evento, fecha: 'segundaFecha'};
      const evento3 = {...evento, fecha: 'tercerFecha'};

      state = historicoDeReacciones(state, evento);
      state = historicoDeReacciones(state, evento2);

      expect(historicoDeReacciones(state, evento3)).toEqual([evento, evento2, evento3])
    });

  });

  describe(`${reactionTypes.DESREACCIONAR}`, () => {
    beforeEach(() => {
      evento = {
        type: reactionTypes.DESREACCIONAR,
        nombre: 'unaReaccion',
        usuario: unUsuario,
        fecha: 'primerFecha'
      };
      state = [];
    });

    it('Cuando no hay ninguna reaccion, se guarda la reaccion y queda primera', () => {
      expect(historicoDeReacciones(state, evento)).toEqual([evento])
    });

    it('Cuando hay mas de una reaccion, se guarda al final', () => {
      const evento2 = {...evento, fecha: 'segundaFecha'};
      const evento3 = {...evento, fecha: 'tercerFecha'};

      state = historicoDeReacciones(state, evento);
      state = historicoDeReacciones(state, evento2);

      expect(historicoDeReacciones(state, evento3)).toEqual([evento, evento2, evento3])
    });

  });
  describe(`Cualquier otro evento`, () => {

    beforeEach(() => {
      evento = {
        type: 'EVENTO',
        nombre: 'unaReaccion',
        usuario: unUsuario,
      };
      state = [];
    });

    it('No hace nada', () => {
      expect(historicoDeReacciones(state, evento)).toEqual([]);
    })
  });
});
