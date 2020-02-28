import React from 'react';
import DebateView from './DebateView';
import { colors } from '../styles/theme';

class DebateHandler extends React.Component {
  dataBar = () => ({
    data: this.props.tema.reacciones,
    color: colors.primary,
  });

  isTalking = (participant) => participant.inicio !== null && participant.fin === null;

  debateData = () => ({
    participants: this.props.tema.oradores,
    dataBar: this.dataBar(),
    dataLine: { data: [] },
  });

  render() {
    return (
      <DebateView
        debateData={this.debateData()}
        segundosRestantes={this.props.segundosRestantes}
        temaActivo={this.props.temaActivo}
        tema={this.props.tema}
        isTalking={this.isTalking}/>
    );
  }
}

export default DebateHandler;
