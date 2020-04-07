import React from 'react';
import {
  QueueContainer,
  QueuedCardsLeftContainerStyle,
  QueuedCardsRightContainerStyle,
  CenterCard,
} from './ParticipantsQueue.styled';
import ParticipantsCard from './ParticipantsCard';

const ParticipantsQueue = ({ participants = [], isTalking }) => {

  const getQueuedParticipants = () => participants.filter((participant) => participant.inicio === null && !isTalking(participant));

  const getParticipantsThatAlreadyTalked = () => participants.filter((participant) => participant.inicio !== null && !isTalking(participant));

  const getTalkingParticipant = () => participants.find((participant) => isTalking(participant));

  return (
    <QueueContainer>
        <QueuedCardsLeftContainerStyle>
          { getQueuedParticipants()
            .map((participant, index) => <ParticipantsCard
              participant={participant}
              key={index}/>)
          }
        </QueuedCardsLeftContainerStyle>
        <CenterCard>
          {getTalkingParticipant() && <ParticipantsCard participant={getTalkingParticipant()} isParticipantTalking/>}
        </CenterCard>
        <QueuedCardsRightContainerStyle>
          { getParticipantsThatAlreadyTalked().map((participant, index) => <ParticipantsCard

            participant={participant} key={index}/>)}
        </QueuedCardsRightContainerStyle>
    </QueueContainer>
  );
};

export default ParticipantsQueue;
