import React from 'react';
import {GraphsAndLabelsContainer, GraphsContainer, ReactionsContainer, SubDebateContainer, ParticipantsContainer} from "../debate-handler/Debate.styled";
import ParticipantsQueue from "../cola-de-participantes/ParticipantsQueue";
import ChartBar from "../chart/chartBar";
import ChartLine from "../chart/chartLine";
import {useSpring} from "react-spring";
import { ReactionsIcons } from "../chart/ReactionsIcons";

const Debate = ({tema}) => {
  const debateData = {
    participants: tema.oradores,
    dataBar: {
      data: tema.reacciones,
    },
    dataLine: {
      data: tema.historicoDeReacciones,
    },
  };
  const props = useSpring({opacity: 1, from: {opacity: 0}});
  return (
    <SubDebateContainer style={props}>
      <GraphsAndLabelsContainer>
        <GraphsContainer>
          <ChartLine data={debateData.dataLine} inicioTema={tema.inicio}/>
          <ChartBar data={debateData.dataBar}/>
        </GraphsContainer>
        <ReactionsContainer>
          <ReactionsIcons centered/>
          <ReactionsIcons/>
        </ReactionsContainer>
      </GraphsAndLabelsContainer>
      <ParticipantsContainer>
        <ParticipantsQueue participants={debateData.participants} finTema={tema.fin}/>
      </ParticipantsContainer>
    </SubDebateContainer>
  );
};

export default Debate;
