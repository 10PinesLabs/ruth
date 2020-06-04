import {conclusionReducer, tipoDeEvento } from '../conclusion';

const guardarConclusion = (conclusion) => ({
    type:tipoDeEvento.GUARDAR_CONCLUSION,
    conclusion:conclusion
})
describe(`#${tipoDeEvento.GUARDAR_CONCLUSION}`, ()=>{

    let state = ''

    const applyEvento = (ev) => {
        return conclusionReducer(state, ev);
    };

    it('con un evento desconocido, no hace nada', () => {
        applyEvento({ type: 'UNKNOWN' });
        expect(state).toEqual('');
      });
    

    it('cuando el evento es de tipo guardar conlcusion, se devuelve la conclusion',()=>{
        const textoDeConclusion = "soy una bonita conclusion";
        expect(applyEvento(guardarConclusion(textoDeConclusion))).toEqual(textoDeConclusion);
    })
})