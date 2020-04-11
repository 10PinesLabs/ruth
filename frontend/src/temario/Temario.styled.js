import styled from 'styled-components';

export const TemarioContainer = styled.div(({isActive, theme}) =>`
  z-index: 100;
  background: ${theme.colors.downy};
  border-right: 1em solid ${theme.colors.viridian};
  box-sizing: border-box;
  left: ${isActive ? '0' : `-${theme.temario.width}`};
  padding: 1em;
  position: fixed;
  transition: all 0.2s linear;
  width: calc(${theme.temario.width} + 1em);
`);

export const Arrow = styled.img`
  background-color:${({theme}) => theme.colors.viridian};
  border-radius: 0 4em 4em 0;
  cursor: pointer;
  font-size: 1.5rem;
  height: 1.5em;
  line-height: 2em;
  overflow: visible;
  padding: 0.5em 0.8em 0.5em;
  position: absolute;
  top: 0.5em;
  transform: translateX(100%);
  right: 0;
  width: 1.2em;
`;

export const Temas = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  };
`;

export const LeyendaEmpresa = styled.div`
  font-family: ${({theme}) => theme.font.p};
  font-size:  ${({theme}) => theme.font.sizeH1};
  @media (min-width: ${({theme}) => theme.sizeBreakpoint.bigWidth}), @media (min-height: ${({theme}) => theme.sizeBreakpoint.bigHeight})  {
    font-size: 4rem;
  }
  letter-spacing: -3px;
  color: ${({theme}) => theme.colors.text};
`;

export const ExtensionLeyendaEmpresa = styled.div`
  font-family: ${({theme}) => theme.font.p};
  font-size:  ${({theme}) => theme.font.sizeP};
  color: ${({theme}) => theme.colors.text};
  margin-bottom: 2em;
`;

export const Titulo = styled.div`
  font-family: ${({theme}) => theme.font.h1};
  font-size:  ${({theme}) => theme.font.sizeH2};
  letter-spacing: 1px;
  color: ${({theme}) => theme.colors.text};
`;

export const ContenidoTemario = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
