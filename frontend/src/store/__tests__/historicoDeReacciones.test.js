import {reactionTypes} from "../reacciones";
import historicoDeReacciones from '../historicoDeReacciones';
import {reacciones} from "../../mobile";

const unUsuario = {
  email: 'unEmail@email',
  nombre: 'Un Email',
};
const otroUsuario = {
  email: 'otroEmaill@email',
  nombre: 'Otro Email',
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

    describe(`Cuando hay reacciones de reacciones opuestas`, () => {
      beforeEach(() => {
        state = [];
      });

      it(`Si hay un ${reacciones.THUMBS_UP} y luego un ${reacciones.THUMBS_DOWN} del mismo usuario, deberia crear una desreaccion de ${reacciones.THUMBS_UP} `, () => {
        const evento1 = {type: reactionTypes.REACCIONAR, nombre: reacciones.THUMBS_UP, fecha: '1', usuario: unUsuario};
        const evento2 = {type: reactionTypes.REACCIONAR, nombre: reacciones.THUMBS_DOWN, fecha: '2', usuario: unUsuario};
        const eventoAgregado = {type: reactionTypes.DESREACCIONAR, nombre: reacciones.THUMBS_UP, fecha: '2', usuario: unUsuario};

        state = historicoDeReacciones(state, evento1);
        state = historicoDeReacciones(state, evento2);

        expect(state).toEqual([evento1, evento2, eventoAgregado])
      });

      it(`Si hay un ${reacciones.THUMBS_DOWN} y luego un ${reacciones.THUMBS_UP} del mismo usuario, deberia crear una desreaccion de ${reacciones.THUMBS_DOWN} `, () => {
        const evento1 = {type: reactionTypes.REACCIONAR, nombre: reacciones.THUMBS_DOWN, fecha: '1', usuario: unUsuario};
        const evento2 = {type: reactionTypes.REACCIONAR, nombre: reacciones.THUMBS_UP, fecha: '2', usuario: unUsuario};
        const eventoAgregado = {type: reactionTypes.DESREACCIONAR, nombre: reacciones.THUMBS_DOWN, fecha: '2', usuario: unUsuario};

        state = historicoDeReacciones(state, evento1);
        state = historicoDeReacciones(state, evento2);

        expect(state).toEqual([evento1, evento2, eventoAgregado])
      });

      it(`Si hay un ${reacciones.THUMBS_UP} y luego un ${reacciones.THUMBS_DOWN} de distintos usuarios, no deberia generarse ninguna desreaccion`, () => {
        const evento1 = {type: reactionTypes.REACCIONAR, nombre: reacciones.THUMBS_UP, fecha: '1', usuario: unUsuario};
        const evento2 = {type: reactionTypes.REACCIONAR, nombre: reacciones.THUMBS_DOWN, fecha: '2', usuario: otroUsuario};

        state = historicoDeReacciones(state, evento1);
        state = historicoDeReacciones(state, evento2);

        expect(state).toEqual([evento1, evento2])
      });

      it(`Si hay un ${reacciones.THUMBS_DOWN} y luego un ${reacciones.THUMBS_UP} de distintos usuarios, no deberia generarse ninguna desreaccion`, () => {
        const evento1 = {type: reactionTypes.REACCIONAR, nombre: reacciones.THUMBS_DOWN, fecha: '1', usuario: unUsuario};
        const evento2 = {type: reactionTypes.REACCIONAR, nombre: reacciones.THUMBS_UP, fecha: '2', usuario: otroUsuario};

        state = historicoDeReacciones(state, evento1);
        state = historicoDeReacciones(state, evento2);

        expect(state).toEqual([evento1, evento2])
      });

      it(`Si hay un ${reacciones.THUMBS_DOWN} que ya fue contrarrestado, y luego desreacciono de manera tradicional, no deberia generarse ningun evento nuevo`, () => {
        const evento1 = {type: reactionTypes.REACCIONAR, nombre: reacciones.THUMBS_DOWN, fecha: '1', usuario: unUsuario};
        const evento2 = {type: reactionTypes.REACCIONAR, nombre: reacciones.THUMBS_UP, fecha: '2', usuario: unUsuario};
        const eventoAgregado = {type: reactionTypes.DESREACCIONAR, nombre: reacciones.THUMBS_DOWN, fecha: '2', usuario: unUsuario};
        const evento3 = {type: reactionTypes.DESREACCIONAR, nombre: reacciones.THUMBS_UP, fecha: '3', usuario: unUsuario};
        const evento4 = {type: reactionTypes.REACCIONAR, nombre: reacciones.THUMBS_DOWN, fecha: '4', usuario: unUsuario};

        state = historicoDeReacciones(state, evento1);
        state = historicoDeReacciones(state, evento2);
        state = historicoDeReacciones(state, evento3);
        state = historicoDeReacciones(state, evento4);

        expect(state).toEqual([evento1, evento2, eventoAgregado, evento3, evento4])
      });

      it(`Si hay un ${reacciones.THUMBS_UP} que ya fue contrarrestado, no deberia volver a generarse su desrreaccion`, () => {
        const evento1 = {type: reactionTypes.REACCIONAR, nombre: reacciones.THUMBS_UP, fecha: '1', usuario: unUsuario};
        const evento2 = {type: reactionTypes.REACCIONAR, nombre: reacciones.THUMBS_DOWN, fecha: '2', usuario: unUsuario};
        const eventoAgregado = {type: reactionTypes.DESREACCIONAR, nombre: reacciones.THUMBS_UP, fecha: '2', usuario: unUsuario};
        const evento3 = {type: reactionTypes.REACCIONAR, nombre: reacciones.THUMBS_UP, fecha: '3', usuario: unUsuario};
        const eventoAgregado2 = {type: reactionTypes.DESREACCIONAR, nombre: reacciones.THUMBS_DOWN, fecha: '3', usuario: unUsuario};

        state = historicoDeReacciones(state, evento1);
        state = historicoDeReacciones(state, evento2);
        state = historicoDeReacciones(state, evento3);

        expect(state).toEqual([evento1, evento2, eventoAgregado, evento3, eventoAgregado2])
      });
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
