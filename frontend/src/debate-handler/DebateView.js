import React from 'react';
import {
  DebateContainer, Titulo, TitleContainer, SubDebateContainer,
  GraphsContainer, ParticipantsContainer,
} from './Debate.styled';
import Countdown from '../reunion/Countdown';
import ChartLine from '../chart/chartLine';
import ChartBar from '../chart/chartBar';
import ParticipantsQueue from '../cola-de-participantes/ParticipantsQueue';

class DebateView extends React.Component {
  render() {
    return (
          <DebateContainer>
            <SubDebateContainer>
              <TitleContainer>
                <Titulo>{this.props.tema.titulo}</Titulo>
              </TitleContainer>
              <GraphsContainer>
                <ChartLine data={this.props.debateData.dataLine}/>
                <ChartBar data={this.props.debateData.dataBar}/>
              </GraphsContainer>
              <ParticipantsContainer>
                <Countdown activo={this.props.temaActivo}
                      segundos={this.props.segundosRestantes}/>
                <ParticipantsQueue participants={this.props.debateData.participants} isTalking={this.props.isTalking}/>
              </ParticipantsContainer>
            </SubDebateContainer>
          </DebateContainer>
    );
  }
}

export default DebateView;
