import { temaReducer, INITIAL_TEMA_STATE as INITIAL_STATE, temaEventos } from "../tema";

describe(`#tema reducer`, () => {
  let state;

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

    applyEvento(eventoConFecha(temaEventos.empezarTema(4), fechaDeInicio));
    applyEvento(eventoConFecha(temaEventos.terminarTema(4), fechaDeFin));

    expect(state.inicio).toEqual(fechaDeInicio.toISOString());
    expect(state.fin).toEqual(fechaDeFin.toISOString());

  });

  it("cuando el evento es de tipo reabrir tema se le quita el fin y se le agrega un tiempo inactivo igual a la cantidad de tiempo transcurrido entre el cierre del tema y la nueva apertura", ()=> {
    let idDeTema = 4;
    let fechaDeInicio = new Date(2020,10,2,10,40);
    let fechaDeFin = new Date(2020,10,2,10,50);
    let fechaDeReapertura = new Date(2020,10,2,11);
    let tiempoInactivo = fechaDeReapertura-fechaDeFin

    applyEvento(eventoConFecha(temaEventos.empezarTema(idDeTema), fechaDeInicio));
    applyEvento(eventoConFecha(temaEventos.terminarTema(idDeTema), fechaDeFin));
    applyEvento(eventoConFecha(temaEventos.reabrirTema(idDeTema), fechaDeReapertura))

    expect(state.inicio).toEqual(fechaDeInicio.toISOString());
    expect(state.fin).toEqual(null);
    expect(state.tiempoInactivo).toEqual(tiempoInactivo)
  })

  it("cuando se reabre multiples veces el tema el tiempo inactivo es igual a la suma de todos los tiempos inactivos", ()=> {
    let idDeTema = 4;
    let fechaDeInicio = new Date(2020,10,2,10,40);
    let fechaDeFin = new Date(2020,10,2,10,50);
    let fechaDeReapertura = new Date(2020,10,2,11);
    let fechaDeSegundoFin = new Date(2020,10,2,11,10);
    let fechaDeSegundaReapertura = new Date(2020,10,2,11,20);

    let primerTiempoInactivo = fechaDeReapertura-fechaDeFin
    let segundoTiempoInactivo = fechaDeSegundaReapertura - fechaDeSegundoFin
    let tiempoInactivoTotal = primerTiempoInactivo + segundoTiempoInactivo

    applyEvento(eventoConFecha(temaEventos.empezarTema(idDeTema), fechaDeInicio));
    applyEvento(eventoConFecha(temaEventos.terminarTema(idDeTema), fechaDeFin));
    applyEvento(eventoConFecha(temaEventos.reabrirTema(idDeTema), fechaDeReapertura))
    applyEvento(eventoConFecha(temaEventos.terminarTema(idDeTema), fechaDeSegundoFin))
    applyEvento(eventoConFecha(temaEventos.reabrirTema(idDeTema), fechaDeSegundaReapertura))


    expect(state.inicio).toEqual(fechaDeInicio.toISOString());
    expect(state.fin).toEqual(null);
    expect(state.tiempoInactivo).toEqual(tiempoInactivoTotal)
  })

  it("al intentar reabrir un tema que aun no se inicio no se hace nada", ()=> {
    let idDeTema = 4;
    let fechaDeReapertura = new Date();
  
    applyEvento(eventoConFecha(temaEventos.reabrirTema(idDeTema), fechaDeReapertura))
  
    expect(state.inicio).toEqual(null);
    expect(state.fin).toEqual(null);
    expect(state.tiempoInactivo).toEqual(undefined)
  })

  it("al intentar reabrir un tema que aun sigue activo no se hace nada", ()=> {
    let idDeTema = 4;
    let fechaDeInicio = new Date(2020,10,2,10,40);
    let fechaDeReapertura = new Date();
  
    applyEvento(eventoConFecha(temaEventos.empezarTema(idDeTema), fechaDeInicio));
    applyEvento(eventoConFecha(temaEventos.reabrirTema(idDeTema), fechaDeReapertura))
  
    expect(state.inicio).toEqual(fechaDeInicio.toISOString());
    expect(state.fin).toEqual(null);
    expect(state.tiempoInactivo).toEqual(undefined)
  })
});
