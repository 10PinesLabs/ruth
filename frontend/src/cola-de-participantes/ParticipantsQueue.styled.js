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
  justify-content: center;
  padding-top: 1rem;
  align-items: center;
`;

export const QueuedRightCardsStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 40rem;
  justify-content: center;
  padding-top: 1rem;
  align-items: center;
  opacity: 0.5;
`;

export const QueuedCardsLeftContainerStyle = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding-right: 1rem;
  width: 100%;
`;

export const QueuedCardsRightContainerStyle = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-end;
  padding-left: 1rem;
  width: 100%;

`;
