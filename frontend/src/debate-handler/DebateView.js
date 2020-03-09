import React from 'react';
import {DebateContainer, GraphsContainer, ParticipantsContainer, SubDebateContainer,} from './Debate.styled';
import ChartLine from '../chart/chartLine';
import ChartBar from '../chart/chartBar';
import ParticipantsQueue from '../cola-de-participantes/ParticipantsQueue';

class DebateView extends React.Component {
  render() {
    return (
      <SubDebateContainer>
        <GraphsContainer>
          <ChartLine data={this.props.debateData.dataLine}/>
          <ChartBar data={this.props.debateData.dataBar}/>
        </GraphsContainer>
        <ParticipantsContainer>
          <ParticipantsQueue participants={this.props.debateData.participants} isTalking={this.props.isTalking}/>
        </ParticipantsContainer>
      </SubDebateContainer>
    );
  }
}

export default DebateView;
