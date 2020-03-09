import styled from 'styled-components';
import {font, sizeBreakpoint} from '../../styles/theme';
import {animated} from 'react-spring';

export const DescripcionTemaContainer = styled(animated.div)`
  display: flex;
  flex: 1;
  flex-direction:column;
  align-items: center;
  overflow-y: auto;
`;

export const Descripcion = styled.div`
  display: block;
  font-family: ${font.p};
  font-size:  ${font.sizeP};
  @media (min-width: ${sizeBreakpoint.bigWidth}), @media (min-height: ${sizeBreakpoint.bigHeight})  {
    font-size: 2rem;
  }
  white-space: pre-line;
  text-align: justify;
  margin: 0 3em;
`;

export const ListaTemasARepasar = styled.ul`
`;

export const ListaPinosPropuestos = styled.ul`
`;
