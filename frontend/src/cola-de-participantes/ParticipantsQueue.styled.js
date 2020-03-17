import styled from 'styled-components';

export const QueueContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const QueuedLeftCardsStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 40rem;
  align-items: center;
`;

export const QueuedRightCardsStyle = styled(QueuedLeftCardsStyle)`
  opacity: 0.5;
`;

export const QueuedCardsLeftContainerStyle = styled.div`
  display: flex;
  width: 100%;
`;

export const QueuedCardsRightContainerStyle = styled.div`
  display: grid;
  grid-gap: 1rem;
  padding: 0rem 0rem 0rem 0rem;
  grid-auto-flow: column;
  align-items: center;
  width: 100%;
`;
