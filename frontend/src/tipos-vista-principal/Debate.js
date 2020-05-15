import React from 'react';
import {GraphsContainer, SubDebateContainer} from "../debate-handler/Debate.styled";
import ParticipantsQueue from "../cola-de-participantes/ParticipantsQueue";
import ChartBar from "../chart/chartBar";
import ChartLine from "../chart/chartLine";
import {useSpring} from "react-spring";
import { ChartWrapper } from "../chart/ChartWrapper";

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
      <GraphsContainer>
        <ChartLine data={debateData.dataLine} inicioTema={tema.inicio}/>
        <ChartWrapper>
          <ChartBar data={debateData.dataBar}/>
        </ChartWrapper>
      </GraphsContainer>
      <ParticipantsQueue participants={debateData.participants} finTema={tema.fin}/>
    </SubDebateContainer>
  );
};

export default Debate;
