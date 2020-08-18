import {reaccionesReducer, INITIAL_REACCIONES_STATE, reaccionEventoTypes } from '../reacciones';
import { reacciones } from '../../mobile/actions';

const elEmail = (n) => `unEmail${n || ''}`;

const elUsuario = (n) => ({
  nombre: `Alguien${` ${n}` || ''}`,
  email: elEmail(n),
});


describe('reaccionesReducer', () => {
  let state;
  let fakeFecha;

  beforeEach(() => {
    fakeFecha = 1;
    state = INITIAL_REACCIONES_STATE;
  });
  const applyEvento = (ev) => {
    state = reaccionesReducer(state, ev);
    fakeFecha += 1;
  };

  const conseguirFecha = () => fakeFecha;

  const reaccionar = (nombre, usuario, fecha) => ({
    type: reaccionEventoTypes.REACCIONAR,
    fecha: fecha || conseguirFecha(),
    usuario,
    nombre,
  });

  const desreaccionar = (nombre, usuario, fecha) => ({
    type: reaccionEventoTypes.DESREACCIONAR,
    fecha: fecha || conseguirFecha(),
    usuario,
    nombre,
  });

  const reiniciar = (usuario, fecha) => ({
    type: reaccionEventoTypes.REINICIAR,
    fecha: fecha || conseguirFecha(),
    usuario,
  });

  describe(`#${reaccionEventoTypes.REINICIAR}`, () => {
    it('reinicia todas las acciones', () => {
      applyEvento(reiniciar(elUsuario(1)));

      expect(state).toEqual(INITIAL_REACCIONES_STATE);
    });
  });

  describe(`#${reaccionEventoTypes.REACCIONAR}`, () => {
    it('si el usuario no envio esa reaccion, la agrega', () => {
      applyEvento(reaccionar('x', elUsuario()));

      expect(state).toEqual({
        x: [elEmail()],
      });
    });

    it('si el usuario reacciona mas de una vez, no hace nada', () => {
      applyEvento(reaccionar('x', elUsuario()));
      const oldState = state;
      applyEvento(reaccionar('x', elUsuario()));

      expect(state).toEqual(oldState);
    });

    describe(`#${reacciones.THUMBS_UP}`, () => {
      it('si hay un thumbs down previamenete, deberia sacarlo', () => {
        applyEvento(reaccionar(reacciones.THUMBS_DOWN, elUsuario()));
        applyEvento(reaccionar(reacciones.THUMBS_UP, elUsuario()));

        expect(state).toEqual({
          [reacciones.THUMBS_DOWN]: [],
          [reacciones.THUMBS_UP]: [elEmail()],
        });
      });

      it('si un usuario reacciona y habia reacciones de otros usuarios, no deberian ser borradas', () => {
        applyEvento(reaccionar(reacciones.THUMBS_UP, elUsuario(2)));

        applyEvento(reaccionar(reacciones.THUMBS_UP, elUsuario(3)));

        expect(state).toEqual({
          [reacciones.THUMBS_UP]: [elEmail(2), elEmail(3)],
        });
      });
    });

    describe(`#${reacciones.THUMBS_DOWN}`, () => {
      it('si hay un thumbs up previamenete, deberia sacarlo', () => {
        applyEvento(reaccionar(reacciones.THUMBS_UP, elUsuario()));

        applyEvento(reaccionar(reacciones.THUMBS_DOWN, elUsuario()));

        expect(state).toEqual({
          [reacciones.THUMBS_UP]: [],
          [reacciones.THUMBS_DOWN]: [elEmail()],
        });
      });
    });
  });

  describe(`#${reaccionEventoTypes.DESREACCIONAR}`, () => {
    it('si el usuario ya habia reaccionado, quita la reaccion', () => {
      applyEvento(reaccionar(reacciones.SLACK, elUsuario()));

      applyEvento(desreaccionar(reacciones.SLACK, elUsuario()));

      expect(state).toEqual({
        [reacciones.SLACK]: [],
      });
    });

    it('si el usuario no habia reaccionado, no hace nada', () => {
      applyEvento(desreaccionar(reacciones.SLACK, elUsuario()));

      expect(state).toEqual({});
    });
  });
});
