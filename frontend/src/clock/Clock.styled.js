import styled from 'styled-components';

export const ClockContainer = styled.div(({ isInteractive }) => `
  color: ${isInteractive ? 'silver' : 'black'};
  font-family: ${({theme}) => theme.font.h1};
  font-size: 2rem;
  margin-top: 0.5rem;
`);
