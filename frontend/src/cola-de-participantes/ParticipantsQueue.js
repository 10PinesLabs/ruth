import React from 'react';
import {
  QueueContainer,
  QueuedCardsLeftContainerStyle,
  QueuedCardsRightContainerStyle,
  CenterCard,
} from './ParticipantsQueue.styled';
import ParticipantsCard from './ParticipantsCard';

const ParticipantsQueue = ({ participants, finTema }) => {
  const queuedParticipants = participants.cola;
  const participantsThatAlreadyTalked = participants.pasados;
  const talkingParticipant = participants.actual;

  return (
    <QueueContainer>
        <QueuedCardsLeftContainerStyle>
          { queuedParticipants
            .map((participant, index) => <ParticipantsCard
              participant={participant}
              key={index}
              type={'debate'}/>)
          }
        </QueuedCardsLeftContainerStyle>
        <CenterCard>
          {talkingParticipant
          && <ParticipantsCard participant={talkingParticipant} isParticipantTalking finTema={finTema} type={'debate'}/>}
        </CenterCard>
        <QueuedCardsRightContainerStyle>
          { participantsThatAlreadyTalked.map((participant, index) => <ParticipantsCard
            participant={participant} key={index} type={'debate'}/>)}
        </QueuedCardsRightContainerStyle>
    </QueueContainer>
  );
};

export default ParticipantsQueue;
