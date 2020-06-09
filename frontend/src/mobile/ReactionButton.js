import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export class ReactionButton extends React.Component {
  getReactionButtonStyle = () => {

  // no me pareció mal dejarle estilos default, por si se quiere usar el boton con la misma gama de colores original
  let defaultColorOrPassedColor = this.props.inactiveBackground ? this.props.inactiveBackground : 'linear-gradient(145deg, rgb(230, 230, 230), rgb(200, 200, 200)';

  let defaultOrPassedActiveColor = this.props.activeBackground ? this.props.activeBackground : 'linear-gradient(145deg, rgb(114, 181, 114), rgb(205, 255, 205))';

  return ({
    height: this.props.isBig ? '3.5em' : '2.5em',
    width: this.props.isBig ? '3.5em' : '2.5em',
    borderRadius: '50%',
    marginRight: '0.5em',
    marginLeft: '0.5em',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: this.props.isDisabled ? '0.5' : (this.props.isActive? '1' : '0.7'),
    background: this.props.isActive ? defaultOrPassedActiveColor
      : defaultColorOrPassedColor,
    boxShadow: '4px 4px 10px #828282, -4px -4px 10px #ffffff',
    transition: 'opacity 0.1s ease-in',
  });
};

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
