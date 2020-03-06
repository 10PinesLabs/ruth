import reaccionesReducer, { reactionTypes } from '../reacciones';
import {reacciones} from "../../mobile";

const unUsuario = {
  email: 'unEmail@email',
  nombre: 'Un Email',
};
const reaccion = (reaccion, usuario) => ({ nombre: reaccion, usuario });

describe('reaccionesReducer', () => {
  let state;
  let evento;

  describe(`#${reactionTypes.REINICIAR}`, () => {
    beforeEach(() => {
      evento = {
        type: reactionTypes.REINICIAR,
      };
      state = [reaccion('unaReaccion', unUsuario), reaccion('otraReaccion', unUsuario)];
    });

    it('reinicia todas las acciones', () => {
      expect(reaccionesReducer(state, evento)).toEqual([]);
    });
  });

  describe(`#${reactionTypes.REACCIONAR}`, () => {
    beforeEach(() => {
      evento = {
        type: reactionTypes.REACCIONAR,
        nombre: 'unaReaccion',
        usuario: unUsuario,
      };
      state = [];
    });

    it('si el usuario no envio esa reaccion, la agrega', () => {
      expect(reaccionesReducer(state, evento)).toEqual([reaccion('unaReaccion', unUsuario)]);
    });

    it('si el usuario reacciona mas de una vez, no hace nada', () => {
      state = reaccionesReducer(state, evento);
      expect(reaccionesReducer(state, evento)).toEqual([reaccion('unaReaccion', unUsuario)]);
    });

    describe(`#${reacciones.THUMBS_UP}`, () => {
      beforeEach(() => {
        evento = {
          type: reactionTypes.REACCIONAR,
          nombre: reacciones.THUMBS_UP,
          usuario: unUsuario,
        };
        state = reaccionesReducer([], {...evento, nombre: reacciones.THUMBS_DOWN});
      });

      it('si hay un thumbs down previamenete, deberia sacarlo', () => {
        expect(reaccionesReducer(state, evento)).toEqual([reaccion(reacciones.THUMBS_UP, unUsuario)]);
      });
    });

    describe(`#${reacciones.THUMBS_DOWN}`, () => {
      beforeEach(() => {
        evento = {
          type: reactionTypes.REACCIONAR,
          nombre: reacciones.THUMBS_DOWN,
          usuario: unUsuario,
        };
        state = reaccionesReducer([], {...evento, nombre: reacciones.THUMBS_UP});
      });

      it('si hay un thumbs up previamenete, deberia sacarlo', () => {
        expect(reaccionesReducer(state, evento)).toEqual([reaccion(reacciones.THUMBS_DOWN, unUsuario)]);
      });
    });
  });

  describe(`#${reactionTypes.DESREACCIONAR}`, () => {
    beforeEach(() => {
      evento = {
        type: reactionTypes.DESREACCIONAR,
        usuario: unUsuario,
        nombre: 'unaReaccion',
      };
      state = [];
    });

    it('si el usuario ya habia reaccionado, quita la reaccion', () => {
      state = [reaccion('unaReaccion', unUsuario), reaccion('otraReaccion', unUsuario)];
      expect(reaccionesReducer(state, evento)).toEqual([reaccion('otraReaccion', unUsuario)]);
    });

    it('si el usuario no habia reaccionado, no hace nada', () => {
      state = [reaccion('unaReaccion', { nombre: 'alguien', email: 'otroEmail' })];
      expect(reaccionesReducer(state, evento)).toEqual([reaccion('unaReaccion', { nombre: 'alguien', email: 'otroEmail' })]);
    });
  });
});
