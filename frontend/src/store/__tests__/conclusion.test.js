import { conclusionReducer, tipoDeEvento } from "../conclusion";

const eventoConclusion = (conclusion) => ({
  type: tipoDeEvento.GUARDAR_CONCLUSION,
  conclusion: conclusion,
});
describe(`#${tipoDeEvento.GUARDAR_CONCLUSION}`, () => {
  let state = "";

  beforeEach(() => {
    state = "";
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
