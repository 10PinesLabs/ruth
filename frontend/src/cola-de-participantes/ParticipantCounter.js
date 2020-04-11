import React from 'react';
import Clock from '../clock/Clock';
import { ClockContainer } from '../clock/Clock.styled';

class ParticipantCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { secondsElapsed: this.props.estadoOrador.seconds };
  }

  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) {
      this.setState({
        secondsElapsed: this.props.estadoOrador.seconds,
      });
    }
  }

  componentDidMount() {
    if (this.props.estadoOrador.detalle === 'hablando') {
      this.runWatch();
    }
  }

  componentWillUnmount() {
    this.stopWatch();
  }

  runWatch = () => {
    this.incrementer = setInterval(() => {
      this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
    }, 1000);
  };

  stopWatch = () => {
    if (this.incrementer) {
      clearInterval(this.incrementer);
      this.incrementer = null;
    }
  };

  render() {
    if (this.props.estadoOrador.detalle === 'encolado') {
      return (<></>);
    }
    return (
        <ClockContainer isInteractive={this.props.interactive}>
          <Clock seconds={this.state.secondsElapsed}/>
        </ClockContainer>
    );
  }
}

export default ParticipantCounter;
