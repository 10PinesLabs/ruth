import styled, { keyframes } from 'styled-components';
import { colors, font } from '../styles/theme';

const timeIsUpAlarm = keyframes`
  0% {
    color: ${colors.black};
  }
  50% {
    color: ${colors.darkRed};
  }
  100% {
    color: ${colors.black};
  }
`;

const noAnimation = keyframes`
  0% {
    color: ${colors.black};
  }
  100% {
    color: ${colors.black};
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const CountdownContainer = styled.div`
  font-family: ${font.h1};
  font-size: ${font.sizeCountdown};
  padding: 0.7rem 0;
  text-align: center;
  width: 5em;
  opacity:${(props) => props.opacity || 1};
  animation-name: ${(props) => (props.negative ? timeIsUpAlarm : noAnimation)};
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
`;
