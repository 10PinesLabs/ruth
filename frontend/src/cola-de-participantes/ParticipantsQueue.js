import React from 'react';
import {
  QueueContainer,
  QueuedCardsLeftContainerStyle,
  QueuedCardsRightContainerStyle,
  QueuedLeftCardsStyle,
  QueuedRightCardsStyle,
} from './ParticipantsQueue.styled';
import ParticipantsCard from './ParticipantsCard';

const ParticipantsQueue = ({ participants = [], isTalking }) => {

  const getQueuedParticipants = () => participants.filter((participant) => participant.inicio === null && !isTalking(participant));

  const getParticipantsThatAlreadyTalked = () => participants.filter((participant) => participant.inicio !== null && !isTalking(participant));

  const getTalkingParticipant = () => participants.find((participant) => isTalking(participant));

  return (
    <QueueContainer>
      <QueuedLeftCardsStyle>
        <QueuedCardsLeftContainerStyle>
          { getQueuedParticipants()
            .map((participant, index) => <ParticipantsCard
              participant={participant}
              key={index}/>)
          }
        </QueuedCardsLeftContainerStyle>
      </QueuedLeftCardsStyle>
      {getTalkingParticipant() && <ParticipantsCard participant={getTalkingParticipant()} isParticipantTalking/>}
      <QueuedRightCardsStyle>
        <QueuedCardsRightContainerStyle>
          { getParticipantsThatAlreadyTalked().map((participant, index) => <ParticipantsCard

            participant={participant} key={index}/>)}
        </QueuedCardsRightContainerStyle>
      </QueuedRightCardsStyle>
    </QueueContainer>
  );
};

export default ParticipantsQueue;
