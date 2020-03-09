import React from 'react';
import { Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class ReactionButton extends React.Component {
  getReactionButtonStyle = () => ({
    height: this.props.isBig ? '3.5em' : '2.5em',
    height: this.props.isBig ? '3.5em' : '2.5em',
    borderRadius: '50%',
    marginRight: '0.5em',
    marginLeft: '0.5em',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: this.props.isDisabled ? '0.2' : '1',
    border: this.props.isActive ? '1px solid silver' : '',
    background: this.props.isActive ? 'linear-gradient(145deg, rgb(114, 181, 114), rgb(205, 255, 205))'
      : 'linear-gradient(145deg, rgb(230, 230, 230), rgb(200, 200, 200)',
    boxShadow: this.props.isActive ? '2px 2px 2px #558c55, -10px -10px 10px #cbffc'
      : '4px 4px 10px #828282, -4px -4px 10px #ffffff',
  });

  getStatusColor = () => {
    if (this.props.isActive) {
      return 'black';
    }
    return this.props.isDisabled ? 'grey' : 'silver';
  };

  getIconSize = () => (this.props.isBig ? 'lg' : 'lg');

  render() {
    return (
      <div style={this.getReactionButtonStyle()}>
        <Button onClick={this.props.onClick}>
          <FontAwesomeIcon icon={this.props.icon} size={this.getIconSize()} color={this.getStatusColor()}/>
        </Button>
      </div>
    );
  }
}
