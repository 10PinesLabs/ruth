import React from 'react';
import ClockContainer from "../clock/ClockContainer";

class ParticipantCounter extends React.Component {

  render() {
    if (this.props.estadoOrador.detalle === 'encolado') {
      return (<></>);
    }
    return (
        <ClockContainer
          isInteractive={this.props.interactive}
          secondsElapsed={this.props.estadoOrador.seconds}
          shouldBeRunning={this.props.estadoOrador.detalle === 'hablando'}/>
    );
  }
}

export default ParticipantCounter;
