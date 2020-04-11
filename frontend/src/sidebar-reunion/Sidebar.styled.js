import styled from 'styled-components';

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: ${({theme}) => theme.sidebar.width};
  background: ${({theme}) => theme.colors.black30};
  border-left: 0.1rem solid ${({theme}) => theme.colors.black30};
`;

export const SeleccionImagen = styled.div`
  padding-top: 10%;
  padding-bottom: 5%;
  height: 5rem;
  text-align: center;
`;

export const SeleccionContainer = styled.div(({ isActive, theme }) => `
  display: flex;
  flex-direction: column;
  color: ${theme.colors.black50};
  background: ${theme.colors.background};
  border-bottom: 0.1rem solid ${theme.colors.black30};
  
  ${isActive && `
    color: ${theme.colors.primary};
    background: ${theme.colors.white};
    border-bottom: 0.3rem solid ${theme.colors.primary};
  `};
  
  &:hover {
    background: ${isActive ? theme.colors.white : theme.colors.black20};
    cursor: pointer;
  }
`);

export const ElementoContainer = styled.div(({ habilitar }) => `
  pointer-events:${habilitar ? 'all' : 'none'};
  opacity: ${habilitar ? '1' : '0.4'};
`);

export const TitulosSidebar = styled.div`
  font-family: ${({theme}) => theme.font.p};
  font-size:  ${({theme}) => theme.font.sizeP};
  @media (min-width: ${({theme}) => theme.sizeBreakpoint.bigWidth}), @media (min-height: ${({theme}) => theme.sizeBreakpoint.bigHeight})  {
    font-size: 1.75rem;
  }
  text-align: center;
  padding-bottom: 7%;
`;
