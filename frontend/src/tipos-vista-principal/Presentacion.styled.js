import styled from 'styled-components';
import {colors, temario, translucid} from '../styles/theme';


export const SidebarIzquierdo = styled.div`
  position: relative;
  z-index: 1;
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
    width: 70%;
    height: 70%;
    left: 10em;
    top: 7em;
    bottom: 7em;
    right: 7em;
    position: absolute;
    z-index: 2;
    flex-direction: column;
    align-items: center;
    background: ${colors.background};
`;
