import oradoresReducer, { INITIAL_ORADORES_STATE, tipoDeEvento } from '../oradores';

const orador = (usuario, inicio, fin, instancia) => ({
  usuario, inicio: inicio || null, fin: fin || null, instanciaDeHabla: instancia || 0, reacciones: []
});

const elUsuario = (n) => ({
  nombre: `Alguien${` ${n}` || ''}`,
  email: `unEmail${n || ''}`,
});

describe('#oradoresReducer reducer', () => {
  let state = INITIAL_ORADORES_STATE;

  const applyEvento = (ev) => {
    state = oradoresReducer(state, ev);
    fakeFecha += 1;
  };


  const desencolar = (usuario, fecha) => ({
    type: tipoDeEvento.DESENCOLAR,
    fecha: fecha || conseguirFecha(),
    usuario,
  });

  const levantarMano = (usuario, fecha) => ({
    type: tipoDeEvento.LEVANTAR_MANO,
    fecha: fecha || conseguirFecha(),
    usuario,
  });

  const dejarDeHablar = (usuario, fecha) => ({
    type: tipoDeEvento.DEJAR_DE_HABLAR,
    fecha: fecha || conseguirFecha(),
    usuario,
  });

  const kickear = (usuario, usuarioKickeado, fecha) => ({
    type: tipoDeEvento.KICKEAR,
    fecha: fecha || conseguirFecha(),
    usuario,
    kickearA: usuarioKickeado,
  });

  const conseguirFecha = () => fakeFecha;

  let fakeFecha;

  beforeEach(() => {
    fakeFecha = 1;
    state = INITIAL_ORADORES_STATE;
  });

  it('con un evento desconocido, no hace nada', () => {
    applyEvento({ type: 'UNKNOWN' });

    expect(state).toEqual(INITIAL_ORADORES_STATE);
  });

  describe(`#${tipoDeEvento.LEVANTAR_MANO}`, () => {
    it("cuando un orador pide hablar y no hay nadie en la cola, es el orador 'talking'", () => {
      applyEvento(levantarMano(elUsuario(1)));

      expect(state).toEqual({
        cola: [],
        actual: orador(elUsuario(1), 1),
        pasados: [],
      });
    });

    it('si el orador ya esta encolado y todavia no hablo, no hace nada', () => {
      applyEvento(levantarMano(elUsuario(1)));
      applyEvento(levantarMano(elUsuario(2)));
      const oldState = state;

      applyEvento(levantarMano(elUsuario(1)));

      expect(state).toEqual(oldState);
    });

    it('si el orador ya esta encolado y termino de hablar, lo vuelve a encolar', () => {
      applyEvento(levantarMano(elUsuario(1)));
      applyEvento(dejarDeHablar(elUsuario(1)));
      applyEvento(levantarMano(elUsuario(2)));

      applyEvento(levantarMano(elUsuario(1)));

      expect(state).toEqual({
        cola: [orador(elUsuario(1),null,null, 1)],
        actual: orador(elUsuario(2), 3),
        pasados: [orador(elUsuario(1), 1, 2)],
      });
    });
  });

  describe(`#${tipoDeEvento.DESENCOLAR}`, () => {
    it('si no estaba encolado, no hace nada', () => {
      applyEvento(levantarMano(elUsuario(1)));
      applyEvento(levantarMano(elUsuario(2)));

      applyEvento(desencolar(elUsuario(3)));


      expect(state).toEqual({
        cola: [orador(elUsuario(2))],
        actual: orador(elUsuario(1), 1),
        pasados: [],
      });
    });

    it('si esta hablando, no hace nada', () => {
      applyEvento(levantarMano(elUsuario(1)));
      applyEvento(levantarMano(elUsuario(2)));

      applyEvento(desencolar(elUsuario(1)));

      expect(state).toEqual({
        cola: [orador(elUsuario(2))],
        actual: orador(elUsuario(1), 1),
        pasados: [],
      });
    });

    it('si ya hablo, no hace nada', () => {
      applyEvento(levantarMano(elUsuario(1)));
      applyEvento(dejarDeHablar(elUsuario(1)));

      applyEvento(desencolar(elUsuario(1)));

      expect(state).toEqual({
        cola: [],
        actual: null,
        pasados: [orador(elUsuario(1), 1 ,2)],
      });
    });

    it('si esta encolado y todavia no hablo, lo desencola', () => {
      applyEvento(levantarMano(elUsuario(1)));
      applyEvento(levantarMano(elUsuario(2)));

      applyEvento(desencolar(elUsuario(2)));

      expect(state).toEqual({
        cola: [],
        actual: orador(elUsuario(1), 1),
        pasados: [],
      });
    });
  });

  describe(`#${tipoDeEvento.DEJAR_DE_HABLAR}`, () => {
    it('si el orador no esta encolado, no hace nada', () => {
      applyEvento(dejarDeHablar(elUsuario(1)));

      expect(state).toEqual({
        cola: [],
        actual: null,
        pasados: [],
      });
    });

    it('si el orador fue encolado y ya termino de hablar, no hace nada', () => {
      applyEvento(levantarMano(elUsuario(1)));
      applyEvento(dejarDeHablar(elUsuario(1)));

      applyEvento(dejarDeHablar(elUsuario(1)));

      expect(state).toEqual({
        cola: [],
        actual: null,
        pasados: [orador(elUsuario(1), 1, 2)],
      });
    });

    it('si el orador esta hablando, y hay mas personas en la cola, termina su turno de hablar y pasa el turno al siguiente', () => {
      applyEvento(levantarMano(elUsuario(1)));
      applyEvento(levantarMano(elUsuario(2)));

      applyEvento(dejarDeHablar(elUsuario(2)));

      expect(state).toEqual({
        cola: [orador(elUsuario(2))],
        actual: orador(elUsuario(1), 1),
        pasados: [],
      });
    });

    it('si el orador esta hablando, y no hay mas personas en la cola, termina su turno de hablar', () => {
      applyEvento(levantarMano(elUsuario(1)));

      applyEvento(dejarDeHablar(elUsuario(1)));

      expect(state).toEqual({
        cola: [],
        actual: null,
        pasados: [orador(elUsuario(1), 1, 2)],
      });
    });

    it('si el orador deja de hablar y se vuelve a encolar, deberia poder volver a dejar de hablar', () => {
      applyEvento(levantarMano(elUsuario(1)));
      applyEvento(dejarDeHablar(elUsuario(1)));
      applyEvento(levantarMano(elUsuario(1)));

      applyEvento(dejarDeHablar(elUsuario(1)));

      expect(state).toEqual({
        cola: [],
        actual: null,
        pasados: [orador(elUsuario(1), 1, 2), orador(elUsuario(1), 3, 4,1)],
      });
    });
  });

  describe(`#${tipoDeEvento.KICKEAR}`, () => {

    it('Si hay alguien hablando y hay mas gente encolada, saca al orador y pone al que sigue', () => {
      applyEvento(levantarMano(elUsuario(1)));
      applyEvento(levantarMano(elUsuario(2)));

      applyEvento(kickear(elUsuario(10), elUsuario(1)));

      expect(state).toEqual({
        cola: [],
        actual: orador(elUsuario(2), 3),
        pasados: [orador(elUsuario(1), 1, 3)],
      });
    });

    it('Si hay alguien hablando y no hay mas gente encolada, lo saca y la cola queda vacia', () => {
      applyEvento(levantarMano(elUsuario(1)));

      applyEvento(kickear(elUsuario(10), elUsuario(1)));

      expect(state).toEqual({
        cola: [],
        actual: null,
        pasados: [orador(elUsuario(1), 1, 2)],
      });
    });

    it('Si pide sacar a alguien que no estaba hablando, no hace nada', () => {
      applyEvento(levantarMano(elUsuario(1)));
      applyEvento(levantarMano(elUsuario(2)));

      applyEvento(kickear(elUsuario(10), elUsuario(2)));

      expect(state).toEqual({
        cola: [orador(elUsuario(2))],
        actual: orador(elUsuario(1), 1),
        pasados: [],
      });
    });

    it('Si no hay alguien hablando, no hace nada', () => {
      applyEvento(kickear(elUsuario(10), elUsuario(1)));

      expect(state).toEqual({
        cola: [],
        actual: null,
        pasados: [],
      });
    });

    it('Puede kickearse a si mismo', () => {
      applyEvento(levantarMano(elUsuario(10)));

      applyEvento(kickear(elUsuario(10), elUsuario(10)));

      expect(state).toEqual({
        cola: [],
        actual: null,
        pasados: [orador(elUsuario(10), 1, 2)],
      });
    });
  });
});
