import oradoresReducer, {tipoDeEvento} from '../oradores';

const orador = (nombre, email, inicio, fin) => ({
  nombre, inicio: inicio || null, fin: fin || null, email,
});

describe('#oradoresReducer reducer', () => {
  let evento;
  let state = [];
  it('con un evento desconocido, no hace nada', () => {
    evento = {type: 'UNKNOWN'};
    expect(oradoresReducer(state, evento)).toEqual([]);
  });

  describe(`#${tipoDeEvento.HABLAR}`, () => {
    beforeEach(() => {
      evento = {
        type: tipoDeEvento.HABLAR,
        fecha: 1,
        nombre: 'Alguien',
        email: 'unEmail',
      };
      state=[];
    });

    it("cuando un orador pide hablar y no hay nadie en la cola, es el orador 'talking'", () => {
      expect(oradoresReducer(state, evento)).toEqual([orador('Alguien', 'unEmail', 1 )]);
    });

    it('si el orador ya esta encolado y todavia no hablo, no hace nada', () => {
      state = oradoresReducer(state, evento);
      state = oradoresReducer(state, {
        ...evento,
        fecha: 2,
        nombre: 'OtroAlguien',
        email: 'otroEmail',
      });
      evento = {...evento, fecha: 3};
      expect(oradoresReducer(state, evento)).toEqual([orador('Alguien', 'unEmail', 1),
        orador('OtroAlguien', 'otroEmail')]);

    });

    it('si el orador ya esta encolado y termino de hablar, lo vuelve a encolar', () => {
      state = [orador('Alguien', 'unEmail', 1, 2), orador('OtroAlguien', 'otroEmail', 3)];
      evento = {...evento, fecha: 3} ;

      expect(oradoresReducer(state, evento)).toEqual([orador('Alguien', 'unEmail',1, 2),
        orador('OtroAlguien', 'otroEmail', 3),
        orador('Alguien', 'unEmail')
      ]);

    });
  });

  describe(`#${tipoDeEvento.DESENCOLAR}`, () => {
    beforeEach(() => {
      state = [];
      evento = {
        type: tipoDeEvento.DESENCOLAR,
        fecha: 1,
        nombre: 'Alguien',
        email: 'unEmail',
      };
    });

    it('si no estaba encolado, no hace nada', () => {
      state = [orador('otroAlguien', 'email')];
      expect(oradoresReducer(state, evento)).toEqual([orador('otroAlguien', 'email')])
    });

    it('si esta hablando, no hace nada', () => {
      state = [orador('Alguien', 'email', 1)];
      expect(oradoresReducer(state, evento)).toEqual([orador('Alguien', 'email', 1)])

    });

    it('si ya hablo, no hace nada', () => {
      state = [orador('Alguien', 'email', 1, 2)];
      expect(oradoresReducer(state, evento)).toEqual([orador('Alguien', 'email', 1,2)])

    });

    it('si esta encolado y todavia no hablo, lo desencola', () => {
      state = [orador('Alguien', 'email')];
      expect(oradoresReducer(state, evento)).toEqual([]);
    });
  });

  describe(`#${tipoDeEvento.DEJAR_DE_HABLAR}`, () => {
    beforeEach(() => {
      evento = {
        type: tipoDeEvento.DEJAR_DE_HABLAR,
        fecha: 2,
        nombre: 'Alguien',
        email: 'email',
      };
      state = [];
    });

    it('si el orador no esta encolado, no hace nada', () => {
      expect(oradoresReducer(state, evento)).toEqual([]);
    });

    it('si el orador esta encolado pero todavia no hablo, no hace nada', () => {
      state = [
        orador('otroAlguien', 'otroEmail', 1),
        orador('Alguien', 'email')
      ];
      expect(oradoresReducer(state, evento)).toEqual([orador('otroAlguien', 'otroEmail', 1),orador('Alguien', 'email')]);
    });

    it('si el orador esta encolado y ya termino de hablar, no hace nada', () => {
      state = [orador('Alguien', 'email',1,2)];
      expect(oradoresReducer(state, evento)).toEqual([orador('Alguien', 'email', 1, 2)]);

    });

    it('si el orador esta hablando, y hay mas personas en la cola, termina su turno de hablar y pasa el turno al siguiente', () => {
      state = [orador('Alguien', 'email',1), orador('ElSiguiente', 'otroemail')];
      expect(oradoresReducer(state, evento)).toEqual([orador('Alguien', 'email', 1, 2), orador('ElSiguiente', 'otroemail', 2)]);
    });

    it('si el orador esta hablando, y no hay mas personas en la cola, termina su turno de hablar', () => {
      state = [orador('Alguien', 'email',1)];
      expect(oradoresReducer(state, evento)).toEqual([orador('Alguien', 'email', 1, 2)]);
    });

  });
});
