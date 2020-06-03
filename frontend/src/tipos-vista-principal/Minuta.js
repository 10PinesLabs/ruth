import React, {useState} from 'react';
import {VistaDelMedioContainer,} from './Resumen.styled';
import {useSpring} from "react-spring";
import {connect} from "react-redux"
import {tipoDeEvento} from '../store/conclusion'

const Minuta = ({dispatch, tema, temaActivo}) => {

    const [conclusion, setConclusion] = useState('')
    
    const dispatchMinuta = (data) => {
      const evento = {
        autor: 'MINUTEADOR',
        fecha: Date.now(),
        data,
      };
      console.log(evento)
      dispatch(evento);
    };

    function actualizarConclusion(){
        console.log("La conclusion es:",dispatch)
        dispatchMinuta({tipo:tipoDeEvento.GUARDAR_CONCLUSION,conclusion: conclusion})
    }
    return (
        <VistaDelMedioContainer style={useSpring({opacity: 1, from: {opacity: 0}})}>
          Proximamente!
            <form>
            <textarea value={conclusion} onChange={(event)=>setConclusion(event.target.value)} ></textarea>
            <button type='button' onClick={()=>actualizarConclusion()}>Guardar!</button>
            </form>
        </VistaDelMedioContainer>
    );
};

export default connect()(Minuta);

