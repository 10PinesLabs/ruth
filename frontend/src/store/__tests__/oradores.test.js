import oradoresReducer, { tipoDeEvento } from '../oradores';

const orador = (usuario, inicio, fin) => ({
  usuario, inicio: inicio || null, fin: fin || null,
});

const otroUsuario = { nombre: 'OtroAlguien', email: 'otroEmail' };

const unUsuario = {
  nombre: 'Alguien',
  email: 'unEmail',
};

describe('#oradoresReducer reducer', () => {
  let evento;
  let state = [];
  it('con un evento desconocido, no hace nada', () => {
    evento = { type: 'UNKNOWN' };
    expect(oradoresReducer(state, evento)).toEqual([]);
  });

  describe(`#${tipoDeEvento.HABLAR}`, () => {
    beforeEach(() => {
      evento = {
        type: tipoDeEvento.HABLAR,
        fecha: 1,
        usuario: unUsuario,
      };
      state = [];
    });

    it("cuando un orador pide hablar y no hay nadie en la cola, es el orador 'talking'", () => {
      expect(oradoresReducer(state, evento)).toEqual([orador(unUsuario, 1)]);
    });

    it('si el orador ya esta encolado y todavia no hablo, no hace nada', () => {
      state = oradoresReducer(state, evento);
      state = oradoresReducer(state, {
        ...evento,
        fecha: 2,
        usuario: otroUsuario,
      });
      evento = { ...evento, fecha: 3 };
      expect(oradoresReducer(state, evento)).toEqual([orador(unUsuario, 1),
        orador(otroUsuario)]);
    });

    it('si el orador ya esta encolado y termino de hablar, lo vuelve a encolar', () => {
      state = [orador(unUsuario, 1, 2), orador(otroUsuario, 3)];
      evento = { ...evento, fecha: 3 };

      expect(oradoresReducer(state, evento)).toEqual([orador(unUsuario, 1, 2),
        orador(otroUsuario, 3),
        orador(unUsuario),
      ]);
    });
  });

  describe(`#${tipoDeEvento.DESENCOLAR}`, () => {
    beforeEach(() => {
      state = [];
      evento = {
        type: tipoDeEvento.DESENCOLAR,
        fecha: 1,
        usuario: unUsuario,
      };
    });

    it('si no estaba encolado, no hace nada', () => {
      state = [orador(otroUsuario)];
      expect(oradoresReducer(state, evento)).toEqual([orador(otroUsuario)]);
    });

    it('si esta hablando, no hace nada', () => {
      state = [orador(unUsuario, 1)];
      expect(oradoresReducer(state, evento)).toEqual([orador(unUsuario, 1)]);
    });

    it('si ya hablo, no hace nada', () => {
      state = [orador(unUsuario, 1, 2)];
      expect(oradoresReducer(state, evento)).toEqual([orador(unUsuario, 1, 2)]);
    });

    it('si esta encolado y todavia no hablo, lo desencola', () => {
      state = [orador(unUsuario)];
      expect(oradoresReducer(state, evento)).toEqual([]);
    });
  });

  describe(`#${tipoDeEvento.DEJAR_DE_HABLAR}`, () => {
    beforeEach(() => {
      evento = {
        type: tipoDeEvento.DEJAR_DE_HABLAR,
        fecha: 3,
        usuario: unUsuario,
      };
      state = [];
    });

    it('si el orador no esta encolado, no hace nada', () => {
      expect(oradoresReducer(state, evento)).toEqual([]);
    });

    it('si el orador esta encolado y ya termino de hablar, no hace nada', () => {
      state = [orador(unUsuario, 1, 2)];
      expect(oradoresReducer(state, evento)).toEqual([orador(unUsuario, 1, 2)]);
    });

    it('si el orador esta hablando, y hay mas personas en la cola, termina su turno de hablar y pasa el turno al siguiente', () => {
      state = [orador(unUsuario, 1), orador(otroUsuario)];
      expect(oradoresReducer(state, evento)).toEqual([orador(unUsuario, 1, 3), orador(otroUsuario, 3)]);
    });

    it('si el orador esta hablando, y no hay mas personas en la cola, termina su turno de hablar', () => {
      state = [orador(unUsuario, 1)];
      expect(oradoresReducer(state, evento)).toEqual([orador(unUsuario, 1, 3)]);
    });

    it('si el orador deja de hablar y se vuelve a encolar, deberia poder volver a dejar de hablar', () => {
      state = [orador(unUsuario, 1, 2), orador(unUsuario, 2)];
      expect(oradoresReducer(state, evento)).toEqual([orador(unUsuario, 1, 2), orador(unUsuario, 2, 3)]);
    });
  });

  describe(`#${tipoDeEvento.KICKEAR}`, () => {
    beforeEach(() => {
      evento = {
        type: tipoDeEvento.KICKEAR,
        fecha: 2,
        usuario: unUsuario,
      };
      state = [];
    });

    it('Si hay alguien hablando y hay mas gente encolada, lo saca y pone al que sigue', () => {
      state = [orador(unUsuario, 1), orador(otroUsuario)];
      expect(oradoresReducer(state, evento)).toEqual([orador(unUsuario, 1, 2), orador(otroUsuario, 2)]);
    });

    it('Si hay alguien hablando y no hay mas gente encolada, lo saca y la cola queda vacia', () => {
      state = [orador(otroUsuario, 1)];
      expect(oradoresReducer(state, evento)).toEqual([orador(otroUsuario, 1,2)]);
    });

    it('Si no hay alguien hablando, no hace nada', () => {
      expect(oradoresReducer(state, evento)).toEqual([]);
    });
  });
});
