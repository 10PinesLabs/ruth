import React from 'react';
import ParticipantCounter from './ParticipantCounter';
import {
  CardContainer, CardInfoContainer, CardName, UserAvatar,
} from './ParticipantsCard.styled';
import getGravatarUrlFor from '../api/gravatar';

class ParticipantsCard extends React.Component {
  estadoOrador() {
    if (this.estaEncolado()) {
      return { detalle: 'encolado' };
    } if (this.hablo()) {
      return { detalle: 'hablo', seconds: Math.ceil((this.props.participant.fin - this.props.participant.inicio) / 1000) };
    }
    // TODO: Algunas veces cuando hay reacciones el número avanza o retrocede.
    return { detalle: 'hablando', seconds: Math.ceil((Date.now() - this.props.participant.inicio) / 1000) };
  }

  hablo() {
    return this.props.participant.fin !== null;
  }

  estaEncolado() {
    return this.props.participant.inicio === null;
  }

  getCardHeight() {
    if (this.props.isParticipantTalking) return '15em';
    return '13em';
  }

  getCardWidth() {
    if (this.props.isParticipantTalking) return '13em';
    return '11em';
  }

  render() {
    return this.props.participant ? (
      <CardContainer
        isInteractive={this.props.interactive}
        isTalking={this.props.isParticipantTalking}
        height={this.getCardHeight()}
        width={this.getCardWidth()}
      >
        <UserAvatar isTalking={this.props.isParticipantTalking} avatar={getGravatarUrlFor(this.props.participant.usuario.email)} />
        <CardInfoContainer>
          <CardName isInteractive={this.props.interactive}> {this.props.participant.usuario.nombre} </CardName>
          <ParticipantCounter isInteractive={this.props.interactive} estadoOrador={this.estadoOrador()} />
        </CardInfoContainer>
      </CardContainer>
    ) : <div> Nadie esta hablando</div>;
  }
}

export default ParticipantsCard;
