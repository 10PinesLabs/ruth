import styled from 'styled-components';
import { colors, temario } from '../styles/theme';

export const InfoTemaContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: ${colors.downy};
  width: ${temario.width};
  height: 100vh;
`;
