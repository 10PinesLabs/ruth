import React, { useState, useEffect } from "react";
import {VistaDelMedioContainer,} from './Resumen.styled';
import {useSpring} from "react-spring";
import ListaPinosQueHablaron from "../minuta/ListaPinosQueHablaron";
import { connect } from "react-redux";
import {Button, SecondaryButton} from "../components/Button.styled";
import {toast} from "react-toastify";
import {tipoDeEvento} from "../store/conclusion";

const Minuta = ({ dispatch, tema, temaActivo }) => {

  let [lastKnowConclusion, setLastKnowConclusion] = useState(tema.conclusion)
  let [conclusion, setConclusion] = useState(tema.conclusion);
  let [isEditingConclusion, setIsEditingConclusion] = useState(false)

  const dispatchMinuta = (data) => {
    console.log(tema);
    const evento = {
      autor: "MINUTEADOR",
      fecha: Date.now(),
      idTema: tema.id,
      data,
    };
    dispatch(evento);
  };

  useEffect(()=>{

    if(!isEditingConclusion && tema.conclusion !== lastKnowConclusion){
      setLastKnowConclusion(tema.conclusion)
      setConclusion(tema.conclusion)
    }
  })

  return (
    <VistaDelMedioContainer style={useSpring({opacity: 1, from: {opacity: 0}})}>
      <ListaPinosQueHablaron oradores={tema.oradores}/>
      <div style={{width: "90%", marginTop:"10px"}}>
        <form>
        <textarea
          style={{width: "70%", height: "70px"}}
          placeholder={"Conclusión"}
          value={conclusion}
          onChange={(event) => {
            userChangedConclusionInput(event.target.value)
          }}
        />

          { isEditingConclusion ?
            <div>
              <SecondaryButton type="button" onClick={() => resetearConclusion()}>
                Borrar
              </SecondaryButton>
              <Button type="button" onClick={() => actualizarConclusion()}>
                Guardar
              </Button>
            </div>
            : null }
        </form>
      </div>

    </VistaDelMedioContainer>
  );



  function actualizarConclusion() {
    if(!tema.id){
      toast.error("No hay tema seleccionado")
      conclusion = "";
      return
    }
    setIsEditingConclusion(false)
    dispatchMinuta({
      tipo: tipoDeEvento.GUARDAR_CONCLUSION,
      conclusion: conclusion,
    });


  }

  function resetearConclusion(){
    console.log("resetear")
    setConclusion(tema.conclusion)
    setIsEditingConclusion(false)
  }

  function userChangedConclusionInput(inputValue){
    setConclusion(inputValue)
    setIsEditingConclusion(true)
  }
};

export default connect()(Minuta);
