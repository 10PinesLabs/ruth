import { temaReducer, temaEventos } from "../tema";

describe(`#tema reducer`, () => {
  let state;
  let INITIAL_STATE = {"actionItems": [], "conclusion": "", "fin": null, "historicoDeReacciones": [], "inicio": null, "oradores": {"actual": null, "cola": [], "pasados": []}, "reacciones": {}};

  beforeEach(() => {
    state = INITIAL_STATE
  });

  const applyEvento = (ev) => {
    state = temaReducer(state, ev);
  };

  const eventoConFecha = (evento, fecha) => {
    return {...evento, fecha}
  }

  it("con un evento desconocido, no hace nada", () => {
    applyEvento({ type: "UNKNOWN" });
    expect(state).toEqual(INITIAL_STATE);
  });

  it("cuando el evento es de tipo empezar tema, se le pone la fecha del evento como inicio al tema al tema", () => {
    let idDeTema = 4;
    let fechaDeGeneracionDeEvento = new Date();
    applyEvento(eventoConFecha(temaEventos.empezarTema(idDeTema),fechaDeGeneracionDeEvento));

    expect(state.fin).toEqual(null);
    expect(state.inicio).toEqual(fechaDeGeneracionDeEvento.toISOString());

  });

  it("cuando el evento es de tipo terminar tema y no tiene fecha de inicio no hace nada", () => {
    let idDeTema = 4;
    let fechaDeGeneracionDeEvento = new Date();

    applyEvento(eventoConFecha(temaEventos.terminarTema(idDeTema), fechaDeGeneracionDeEvento));

    expect(state).toEqual(INITIAL_STATE);

  });

  it("cuando el evento es de tipo terminar tema se le pone la fecha del evento a fin", () => {
    let idDeTema = 4;
    let fechaDeInicio = new Date();
    let fechaDeFin = new  Date();

    applyEvento(eventoConFecha(temaEventos.empezarTema(idDeTema), fechaDeInicio));
    applyEvento(eventoConFecha(temaEventos.terminarTema(idDeTema), fechaDeFin));

    expect(state.inicio).toEqual(fechaDeInicio.toISOString());
    expect(state.fin).toEqual(fechaDeFin.toISOString());

  });
});
