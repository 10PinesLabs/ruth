import styled from 'styled-components';
import {
  colors, font, sidebar, sizeBreakpoint,
} from '../styles/theme';

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: sticky;
  height: 100%;
  margin-right: calc(100% - 100vw);
  width: ${sidebar.width};
  background: ${colors.black30};
  border-left: 0.1rem solid ${colors.black30};
`;

export const SeleccionContainer = styled.div(({ isActive }) => `
  display: flex;
  flex-direction: row;
  height:100%;
  align-items: center;
  justify-content: center;
  color: ${isActive ? colors.primary : colors.black50};
  background: ${isActive ? colors.white : colors.background};
  border-bottom: 0.1rem solid ${colors.black30};
  border-left: 0.3rem solid ${ isActive ? colors.primary : 'transparent' };
  box-sizing: border-box;
  &:hover {
    background: ${isActive ? colors.white : colors.black20};
    cursor: pointer;
  }
`);

export const ElementoContainer = styled.div(({ habilitar }) => `
  pointer-events:${habilitar ? 'all' : 'none'};
  opacity: ${habilitar ? '1' : '0.4'};
  flex:1;
`);

export const TitulosSidebar = styled.div`
  font-family: ${font.p};
  font-size:  ${font.sizeP};
  text-align: center;
`;

