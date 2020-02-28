import React from 'react';
import DebateSocket from '../debate-handler/DebateSocket';

class Debate extends React.Component {
    static canHandleView = (view) => view === 'Debate'

    render() {
      return (
          <DebateSocket
            segundosRestantes={this.props.segundosRestantes}
            temaActivo={this.props.temaActivo}
            tema={this.props.tema}/>
      );
    }
}

export default Debate;
