import styled from 'styled-components';

export const QueueContainer = styled.div`
  display: grid;
  grid-template-areas: "left center right";
  grid-template-columns: 35vw auto 35vw;
  flex:0.5;
  gap: 1rem;
  align-items:center;
  justify-content:center;
`;


export const QueuedCardsLeftContainerStyle = styled.div`
  grid-area: left;

  display: flex;
  flex-direction: row-reverse;
`;

export const QueuedCardsRightContainerStyle = styled.div`
  grid-area: right;
  justify-self: start;
  display: flex;
  flex-direction: row-reverse;
  opacity: 0.5;
`;

export const CenterCard = styled.div`
  grid-area: center;
`;

