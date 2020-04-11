import styled, { keyframes } from 'styled-components';

const timeIsUpAlarm = ({colors}) => keyframes`
  0% {
    color: ${colors.black50};
  }
  50% {
    color: ${colors.darkRed};
  }
  100% {
    color: ${colors.black50};
  }
`;

const noAnimation = ({colors}) => keyframes`
  0% {
    color: ${colors.black50};
  }
  100% {
    color: ${colors.black50};
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const CountdownContainer = styled.div`
  font-family: ${({theme}) => theme.font.h1};
  font-size: ${({theme}) => theme.font.sizeCountdown};
  padding: 0.7rem 0;
  text-align: center;
  width: 5em;

  animation-name: ${({theme, negative}) => (negative ? timeIsUpAlarm(theme) : noAnimation(theme))};
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
`;
