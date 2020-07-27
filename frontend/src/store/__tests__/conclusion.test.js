import { conclusionReducer, conclusionEventoTypes, INITIAL_CONCLUSION } from "../conclusion";

const eventoConclusion = (conclusion) => ({
  type: conclusionEventoTypes.GUARDAR_CONCLUSION,
  conclusion: conclusion,
});
describe(`#${conclusionEventoTypes.GUARDAR_CONCLUSION}`, () => {
  let state;

  beforeEach(() => {
    state = INITIAL_CONCLUSION;
  });

  const applyEvento = (ev) => {
    state = conclusionReducer(state, ev);
  };

  it("con un evento desconocido, no hace nada", () => {
    applyEvento({ type: "UNKNOWN" });
    expect(state).toEqual("");
  });

  it("cuando el evento es de tipo guardar conlcusion, se devuelve la conclusion", () => {
    const textoDeConclusion = "soy una bonita conclusion";
    applyEvento(eventoConclusion(textoDeConclusion));
    expect(state).toEqual(textoDeConclusion);
  });
});
