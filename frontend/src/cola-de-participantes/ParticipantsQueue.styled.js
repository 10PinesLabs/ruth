import styled from 'styled-components';

export const QueueContainer = styled.div`
  display: grid;
  grid-template-areas: "left center right";
  grid-template-columns: 35vw auto 35vw;
  gap: 1rem;
  justify-content:center;
  align-items: center;
`;


export const QueuedCardsLeftContainerStyle = styled.div`
  grid-area: left;
  gap:1rem;
  display: flex;
  flex-direction: row-reverse;
`;

export const QueuedCardsRightContainerStyle = styled.div`
  grid-area: right;
  justify-self: start;
  display: flex;
  flex-direction: row-reverse;
  opacity: 0.5;
  gap:1rem;
`;

export const CenterCard = styled.div`
  grid-area: center;
  max-height: 12em;
  padding: 0 2rem;
  height: 95%;
`;

