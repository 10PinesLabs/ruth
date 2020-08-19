import styled from 'styled-components';
import { font } from '../styles/theme';

export const StyledClockContainer = styled.div(({ isInteractive }) => `
  color: ${isInteractive ? 'silver' : 'black'};
  font-family: ${font.h1};
  width: 60px;
  text-align: center;
  margin-right: 2px;
  font-weight: bold;
`);
