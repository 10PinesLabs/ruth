import conclusionReducer, { CONCLUSION_INITIAL_STATE, tipoDeEvento } from '../conclusion';

const guardarConclusion = (conclusion) => ({
    type:tipoDeEvento.GUARDAR_CONCLUSION,
    actual:conclusion
})
describe(`#${tipoDeEvento.GUARDAR_CONCLUSION}`, ()=>{

    let state = CONCLUSION_INITIAL_STATE

    const applyEvento = (ev) => {
        state = conclusionReducer(state, ev);
    };

    it('la conclusion en su estado inicial es texto vacio', ()=>{
        expect(state.actual).toEqual('')
    })

    it('cuando alguien guarda una conclusion se actualiza',()=>{
        const textoDeConclusion = "soy una bonita conclusion";
        applyEvento(guardarConclusion(textoDeConclusion));
        expect(state.actual).toEqual(textoDeConclusion);
    })
})