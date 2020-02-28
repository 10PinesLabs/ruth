import React from 'react';
import DebateHandler from './DebateHandler';

class DebateSocket extends React.Component {
  render() {
    return (
        <DebateHandler
          segundosRestantes={this.props.segundosRestantes}
          temaActivo={this.props.temaActivo}
          tema={this.props.tema}/>
    );
  }
}

export default DebateSocket;
