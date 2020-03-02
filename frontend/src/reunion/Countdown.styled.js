import styled, { keyframes } from 'styled-components';
import {colors, font, sidebar} from '../styles/theme';

const timeIsUpAlarm = keyframes`
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

const noAnimation = keyframes`
  0% {
    color: ${colors.black50};
  }
  100% {
    color: ${colors.black50};
  }
`;

export const CountdownContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  font-family: ${font.h1};
  font-size: ${font.sizeCountdown};
  text-align: center;
  align-items: center;  
  width: calc(100% - ${sidebar.width});
  justify-content: center;
  
  animation-name: ${(props) => (props.negative ? timeIsUpAlarm : noAnimation)};
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
`;
