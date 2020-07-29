import styled from 'styled-components';
import { font } from '../styles/theme';

export const StyledClockContainer = styled.div(({ isInteractive }) => `
  color: ${isInteractive ? 'silver' : 'black'};
  font-family: ${font.h1};
  font-size: 1em  ;
  width: 60px;
  text-align: rigth;
  margin-right: 2px;
  font-weight: bold;
`);
