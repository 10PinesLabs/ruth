import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { darken, lighten } from '@material-ui/core/styles';
import { colors } from '../styles/theme';

export class ReactionButton extends React.Component {
  getReactionButtonStyle = () => {

  return ({
    height: this.props.isBig ? '3em' : '2.5em',
    minWidth: this.props.isBig ? '3em' : '2.5em',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: this.props.isDisabled ? '0.5' : (this.props.isActive? '1' : '0.7'),
    background: this.getBackgroundColor(),
    boxShadow: '4px 4px 10px #828282, -4px -4px 10px #ffffff',
    transition: 'opacity 0.1s ease-in',
  });
};

  getBackgroundColor() {
    let backgroundColor;
    if(this.props.isActive){
      backgroundColor = this.props.activeBackground ? this.props.activeBackground : colors.defaultActiveBackground;
      return `linear-gradient(145deg, ${darken(backgroundColor, 0.25)}, ${lighten(backgroundColor, 0.5)})`;
    } else {
      backgroundColor = colors.defaultInactiveBackground;
      return `linear-gradient(145deg, ${lighten(backgroundColor, 0.75)}, ${darken(backgroundColor, 0.25)})`;
    }
  }

  getStatusColor = () => {
    if (this.props.isActive) {
      return 'black';
    }
    return this.props.isDisabled ? 'silver' : 'gray';
  };

  render() {
    return (
      <div onClick={this.props.onClick} style={{...this.getReactionButtonStyle(), ':hover': {background: 'black'}}}>
        <FontAwesomeIcon icon={this.props.icon} size='lg' color={this.getStatusColor()}/>
      </div>
    );
  }
}
