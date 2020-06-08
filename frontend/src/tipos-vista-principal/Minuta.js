import React, {useState, useEffect} from "react";
import {VistaDelMedioContainer} from "./Resumen.styled";
import {useSpring} from "react-spring";
import {connect} from "react-redux";
import {tipoDeEvento, conclusionReducer} from "../store/conclusion";
import {toast} from "react-toastify";
import {Button, SecondaryButton} from "../components/Button.styled";
import ListaPinosQueHablaron from "../minuta/ListaPinosQueHablaron";
import {Card, CardContent} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";


const Minuta = ({dispatch, tema, temaActivo}) => {
  let [lastKnowConclusion, setLastKnowConclusion] = useState(tema.conclusion);
  let [conclusion, setConclusion] = useState(tema.conclusion);
  let [isEditingConclusion, setIsEditingConclusion] = useState(false);
  const [isRecapCollapsed, setIsRecapCollapsed] = useState(true);

  const dispatchMinuta = (data) => {
    const evento = {
      autor: "MINUTEADOR",
      idTema: tema.id,
      data,
    };
    dispatch(evento);
  };


  useEffect(() => {
    if (!isEditingConclusion && tema.conclusion != lastKnowConclusion) {
      setLastKnowConclusion(tema.conclusion);
      setConclusion(tema.conclusion);
    }
  });

  function actualizarConclusion() {
    if (!tema.id) {
      toast.error("No hay tema seleccionado");
      setConclusion('')
      return;
    }
    setIsEditingConclusion(false);
    dispatchMinuta({
      tipo: tipoDeEvento.GUARDAR_CONCLUSION,
      conclusion: conclusion,
    });
  }

  function resetearConclusion() {
    setConclusion(tema.conclusion);
    setIsEditingConclusion(false);
  }

  function userChangedConclusionInput(inputValue) {
    setConclusion(inputValue);
    setIsEditingConclusion(true);
  }

  return (
    <VistaDelMedioContainer
      style={useSpring({opacity: 1, from: {opacity: 0}})}
    >
      <button onClick={() => setIsRecapCollapsed(!isRecapCollapsed)}>Desplegar</button>
      <Collapse in={isRecapCollapsed}>
        <Card>
          <CardContent>
            Aca va a ir lo de la conclusion
          </CardContent>
        </Card>
      </Collapse>

      <ListaPinosQueHablaron oradores={tema.oradores}/>

      <form>
        <textarea
          value={conclusion}
          onChange={(event) => {
            userChangedConclusionInput(event.target.value);
          }}
        ></textarea>

        {isEditingConclusion ? (
          <div>
            <SecondaryButton type="button" onClick={() => resetearConclusion()}>
              Borrar
            </SecondaryButton>
            <Button type="button" onClick={() => actualizarConclusion()}>
              Guardar
            </Button>
          </div>
        ) : null}
      </form>
    </VistaDelMedioContainer>
  );
};

export default connect()(Minuta);
