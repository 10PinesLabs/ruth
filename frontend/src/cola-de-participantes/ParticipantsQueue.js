import React from 'react';
import {
  QueueContainer,
  QueuedCardsLeftContainerStyle,
  QueuedCardsRightContainerStyle,
  CenterCard,
} from './ParticipantsQueue.styled';
import ParticipantsCard from './ParticipantsCard';

const ParticipantsQueue = ({ participants = [], isTalking }) => {

  const getQueuedParticipants = () => participants.cola;

  const getParticipantsThatAlreadyTalked = () => participants.pasados;

  const getTalkingParticipant = () => participants.actual;

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
