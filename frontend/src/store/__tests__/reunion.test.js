import { reunionReducer, INITIAL_REUNION_STATE as INITIAL_STATE , reunionEventos } from "../reunion";
import { temaReducer } from "../tema"

describe(`#reunion reducer`, () => {
  let state;

  const temaObligatorioConMayorPrioridad = {
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

  const temaObligatorioConMenorPrioridad = {
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

  const temaNoObligatorioConMenorPrioridad = {
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

  const temaNoObligatorioConMayorPrioridad = {
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

  const reunionConTemas = {
    temas: [
      temaNoObligatorioConMenorPrioridad,
      temaObligatorioConMayorPrioridad,
      temaNoObligatorioConMayorPrioridad,
      temaObligatorioConMenorPrioridad,
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

  it("con un evento del tipo empezar reunion se reordenan todos los temas recibidos donde primero vienen los temas obligatorios ordenados por prioridad de menor a mayor y luego los no obligatorios idem", () => {
    applyEvento(reunionEventos.conectarseAReunion(reunionConTemas));

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
