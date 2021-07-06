import styled from 'styled-components';

export const QueueContainer = styled.div`
  display: grid;
  grid-template-areas: "left center right";
  grid-template-columns: 35vw auto 35vw;
  justify-content:center;
  align-items: center;
  @media (min-width: 1800px) {
    font-size: 1.2em;
  }
`;

export const QueuedCardsLeftContainerStyle = styled.div`
  grid-area: left;
  display: flex;
  flex-direction: row-reverse;
  overflow-x: auto;
  overflow-y: hidden;
  margin-left: 2em;
  &::-webkit-scrollbar {
    display: none;
  }
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
  max-height: 12em;
  padding: 0 2rem;
  height: 150%;
`;

