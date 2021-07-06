import styled from 'styled-components';
import {colors, font, temario} from '../styles/theme';

export const TemarioContainer = styled.div(({isActive}) =>`
  z-index: 100;
  background: ${colors.downy};
  border-right: 1em solid ${colors.viridian};
  box-sizing: border-box;
  left: ${isActive ? '0' : `-${temario.width}`};
  padding: 1em;
  position: fixed;
  transition: all 0.2s linear;
  width: calc(${temario.width} + 1em);
`);

export const Arrow = styled.img`
  background-color:${colors.viridian};
  border-radius: 0 4em 4em 0;
  cursor: pointer;
  font-size: ${font.sizeP};
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
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  };
`;

export const LeyendaEmpresa = styled.div`
  font-family: ${font.p};
  font-size:  ${font.sizeH2};
  letter-spacing: -3px;
  color: black;
`;

export const ExtensionLeyendaEmpresa = styled.div`
  font-family: ${font.p};
  font-size:  ${font.sizeP};
  color: black;
  margin-bottom: 2em;
`;

export const Titulo = styled.div`
  font-family: ${font.h2};
  font-size:  ${font.sizeH2};
  letter-spacing: 1px;
  color: white;
  cursor: pointer;
`;

export const ContenidoTemario = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
