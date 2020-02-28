import React from 'react';

class Clock extends React.Component {
  getMinutes = () => {
    return Math.floor(Math.abs(this.props.seconds) / 60);
  }

  getSeconds = () => {
    return (`0${Math.abs(this.props.seconds) % 60}`).slice(-2);
  }

  render() {
    return (
        <span>
          {this.getMinutes()}:{this.getSeconds()}
        </span>
    );
  }
}

export default Clock;
