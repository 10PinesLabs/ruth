import React from 'react';

export const CantidadDeOradores = ({wannaTalk, remainingParticipantsUpToUser, queuedParticipants}) => {
  return (     
    <>        
    {wannaTalk ? (
    <>
      <b>+{remainingParticipantsUpToUser-1}</b>
      <br />
      Delante <br/>tuyo
    </>
  ) : (
    <>
      <b>+{queuedParticipants?.length}</b>
      <br />
      Encolados
    </>
  )}
  </>)
}