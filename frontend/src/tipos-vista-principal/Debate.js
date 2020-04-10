import React from 'react';
import {GraphsContainer, ParticipantsContainer, SubDebateContainer} from "../debate-handler/Debate.styled";
import ParticipantsQueue from "../cola-de-participantes/ParticipantsQueue";
import ChartBar from "../chart/chartBar";
import ChartLine from "../chart/chartLine";
import {useSpring} from "react-spring";
import {connect} from "react-redux";

const Debate = ({tema, reacciones}) => {

  const isTalking = (participant) => participant.inicio !== null && participant.fin === null;

  //TODO: Borrar debateData, agrega complejidad a la hora de calcular los graficos y no tiene mucho sentido que este
  const debateData = {
    participants: tema.oradores,
    dataBar: {
      data: tema.reacciones,
    },
    dataLine: {
      data: reacciones
    },
  };
  const props = useSpring({opacity: 1, from: {opacity: 0}});
  return (
    <SubDebateContainer style={props}>
      <GraphsContainer>
        <ChartLine data={debateData.dataLine} inicioTema={tema.inicio} tiempoTema={tema.cantidadDeMinutosDelTema}/>
        <ChartBar data={debateData.dataBar}/>
      </GraphsContainer>
      <ParticipantsContainer>
        <ParticipantsQueue participants={debateData.participants} isTalking={isTalking}/>
      </ParticipantsContainer>
    </SubDebateContainer>
  );
};
const mapStateToProps = state => {
  const temaActual = state.temas.find((tema) => tema.fin === null && tema.inicio !== null) || state.temas[0];
  return {reacciones: temaActual.historicoDeReacciones}
};
export default connect(mapStateToProps)(Debate);
