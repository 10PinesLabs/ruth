import * as React from 'react';
import Clock from './Clock';
import { StyledClockContainer } from './Clock.styled';

class ClockContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { secondsElapsed: this.props.secondsElapsed };
  }

  componentDidMount() {
    if (this.props.shouldBeRunning) {
      this.runWatch();
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) {
      this.setState({
        secondsElapsed: this.props.secondsElapsed,
      });
    }
    if (this.shouldStopWatchAfterUpdate(prevProps)) this.stopWatch();

    if (this.shouldStartWatchAfterUpdate(prevProps)) this.runWatch();
  }

  shouldStartWatchAfterUpdate(prevProps) {
    return this.props.shouldBeRunning && !prevProps.shouldBeRunning;
  }

  shouldStopWatchAfterUpdate(prevProps) {
    return !this.props.shouldBeRunning && prevProps.shouldBeRunning;
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
    return (
      <StyledClockContainer isInteractive={this.props.isInteractive}>
        <Clock seconds={this.state.secondsElapsed}/>
      </StyledClockContainer>
    );
  }
}

export default ClockContainer;
