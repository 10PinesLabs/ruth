import React, {useEffect, useState} from 'react';
import ParticipantCounter from './ParticipantCounter';
import {
  CardContainer, CardInfoContainer, CardName, Cerrar, UserAvatar,
} from './ParticipantsCard.styled';
import getGravatarUrlFor from '../api/gravatar';
import {SkeletonBlock, SkeletonLine} from "../skeleton/Skeleton.styled";

const ParticipantsCard = ({participant, isParticipantTalking, interactive, kickear }) => {
  const estadoOrador = () => {
    if (estaEncolado()) {
      return { detalle: 'encolado' };
    } if (hablo()) {
      return { detalle: 'hablo', seconds: Math.ceil((participant.fin - participant.inicio) / 1000) };
    }
    return { detalle: 'hablando', seconds: Math.ceil((Date.now() - participant.inicio) / 1000) };
  };

  const hablo = () => {
    return participant.fin !== null;
  };

  const estaEncolado = () => {
    return participant.inicio === null;
  };

    const [showSkeleton, setShowSekelton] = useState(true);
    useEffect(() => {setTimeout(() => setShowSekelton(false), 1000)}, []);

    return showSkeleton ? <SkeletonComponent interactive isParticipantTalking /> : (participant ? (
      <CardContainer isInteractive={interactive} isTalking={isParticipantTalking}>
        {interactive && <Cerrar onClick={kickear} />}
        <UserAvatar isTalking={isParticipantTalking} avatar={getGravatarUrlFor(participant.usuario.email)} />
        <CardInfoContainer>
          <CardName isInteractive={interactive}> {participant.usuario.nombre} </CardName>
          <ParticipantCounter isInteractive={interactive} estadoOrador={estadoOrador()} />
        </CardInfoContainer>
      </CardContainer>
    ) : <div> Nadie esta hablando</div>);
};

export default ParticipantsCard;

const SkeletonComponent = ({interactive, isParticipantTalking}) =>
  <CardContainer isInteractive={interactive} isTalking={isParticipantTalking}>
    <UserAvatar><SkeletonBlock/></UserAvatar>
    <CardInfoContainer style={ {display: 'flex', alignItems: 'space-between'} }>
      <SkeletonLine/>
      <SkeletonLine/>
    </CardInfoContainer>
</CardContainer>;
