import React from 'react';
import {colors} from "../styles/theme";
import {GraphsContainer, ParticipantsContainer, SubDebateContainer} from "../debate-handler/Debate.styled";
import ParticipantsQueue from "../cola-de-participantes/ParticipantsQueue";
import ChartBar from "../chart/chartBar";
import ChartLine from "../chart/chartLine";
import {useSpring} from "react-spring";

const Debate = ({tema}) => {
  const dataBar = () => ({
    data: tema.reacciones,
    color: colors.downy,
  });

  const isTalking = (participant) => participant.inicio !== null && participant.fin === null;

  const debateData = {
    participants: tema.oradores,
    dataBar: dataBar(),
    dataLine: {data: []},
  };

  const props = useSpring({opacity: 1, from: {opacity: 0}});
  return (
    <SubDebateContainer style={props}>
      <GraphsContainer>
        <ChartLine data={debateData.dataLine}/>
        <ChartBar data={debateData.dataBar}/>
      </GraphsContainer>
      <ParticipantsContainer>
        <ParticipantsQueue participants={debateData.participants} isTalking={isTalking}/>
      </ParticipantsContainer>
    </SubDebateContainer>
  );
};

export default Debate;
