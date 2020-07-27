import { reunionReducer, reunionEventos } from "../reunion";
import { temaReducer } from "../tema"

describe(`#reunion reducer`, () => {
  let state;
  let INITIAL_STATE = {};

  let temaObligatorioConMenorPrioridad = {
    tipo: "conDescripcion",
    id: 796,
    duracion: "MEDIO",
    idDeAutor: 9,
    ultimoModificador: "Ailen Muñoz",
    idDeReunion: 793,
    autor: "Ailen Muñoz",
    prioridad: 2,
    titulo: "HOla hola",
    descripcion: ":)",
    idsDeInteresados: [],
    obligatoriedad: "OBLIGATORIO",
    idDePropuestaOriginal: null,
    fechaDePropuestaOriginal: null,
    esRePropuesta: false,
    linkDePresentacion: null,
    cantidadDeMinutosDelTema: 60,
  };

  let temaObligatorioConMayorPrioridad = {
    tipo: "conDescripcion",
    id: 400,
    duracion: "MEDIO",
    idDeAutor: 9,
    ultimoModificador: "Ailen Muñoz",
    idDeReunion: 793,
    autor: "Ailen Muñoz",
    prioridad: 7,
    titulo: "HOla hola",
    descripcion: ":)",
    idsDeInteresados: [],
    obligatoriedad: "OBLIGATORIO",
    idDePropuestaOriginal: null,
    fechaDePropuestaOriginal: null,
    esRePropuesta: false,
    linkDePresentacion: null,
    cantidadDeMinutosDelTema: 60,
  };

  let temaNoObligatorioConMayorPrioridad = {
    tipo: "conDescripcion",
    id: 799,
    duracion: "CORTO",
    idDeAutor: 9,
    ultimoModificador: "Ailen Muñoz",
    idDeReunion: 793,
    autor: "Ailen Muñoz",
    prioridad: 3,
    titulo: "lakjsdad",
    descripcion: "ljksdasd",
    idsDeInteresados: [9, 9, 9],
    obligatoriedad: "NO_OBLIGATORIO",
    idDePropuestaOriginal: null,
    fechaDePropuestaOriginal: null,
    esRePropuesta: false,
    linkDePresentacion: "https://www.lipsum.com/",
    cantidadDeMinutosDelTema: 60,
  };

  let temaNoObligatorioConMenorPrioridad = {
    tipo: "conDescripcion",
    id: 795,
    duracion: "CORTO",
    idDeAutor: 9,
    ultimoModificador: "Ailen Muñoz",
    idDeReunion: 793,
    autor: "Ailen Muñoz",
    prioridad: 1,
    titulo: "Ir a Temaiken",
    descripcion: "Como empresa queremos ir a Temaiken. Vamos?",
    idsDeInteresados: [],
    obligatoriedad: "NO_OBLIGATORIO",
    idDePropuestaOriginal: null,
    fechaDePropuestaOriginal: null,
    esRePropuesta: false,
    linkDePresentacion: null,
    cantidadDeMinutosDelTema: 60,
  };

  let reunionConTemas = {
    temas: [
      temaNoObligatorioConMayorPrioridad,
      temaObligatorioConMenorPrioridad,
      temaNoObligatorioConMenorPrioridad,
      temaObligatorioConMayorPrioridad,
    ],
  };

  beforeEach(() => {
    state = INITIAL_STATE;
  });

  const applyEvento = (ev) => {
    state = reunionReducer(state, ev);
  };

  const eventoConId = (evento, id) => {
    return { ...evento, id };
  };

  const reducirTema = (tema) => {
    return temaReducer(tema, {})
  }

  it("con un evento desconocido, no hace nada", () => {
    let idDeEvento = 7;
    applyEvento(eventoConId({ type: "UNKNOWN" }, idDeEvento));
    expect(state).toEqual({ ultimoEventoId: idDeEvento });
  });

  it("con un evento del tipo empezar reunion se reordenan todos los temas recibidos", () => {
    applyEvento(reunionEventos.comenzarReunion(reunionConTemas));

    expect(state).toMatchObject({
      reunion: {
        temas: [
          {id:temaObligatorioConMayorPrioridad.id},
          {id:temaObligatorioConMenorPrioridad.id},
          {id:temaNoObligatorioConMayorPrioridad.id},
          {id:temaNoObligatorioConMenorPrioridad.id},
        ],
      },
    });
  });
});
