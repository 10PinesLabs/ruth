import styled from 'styled-components';
import { colors, temario, translucid } from '../styles/theme';


export const SidebarIzquierdo = styled.div`
  width: ${temario.width};
  background: linear-gradient(${translucid.green}, ${translucid.green}),
              url('./fondo-pino.png');
`;

export const PresentacionContainter = styled.div`  
    display: flex;
    flex: 1;
`;

export const SlidesContainer = styled.div` 
    display: flex; 
    flex-direction: column;
    flex: 1;
    align-items: center;
    background: ${colors.background};
`;
